// pages/api/generate-thumbnail.js
// AI 썸네일 이미지 생성 - Gemini Imagen 또는 Unsplash API

const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');
const { getConfigValue } = require('../../lib/config');

// Supabase 클라이언트
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

/**
 * Supabase Storage에 이미지 업로드 (URL에서 다운로드 후 업로드)
 */
async function uploadImageFromUrl(imageUrl) {
  try {
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      timeout: 30000
    });

    const imageBuffer = Buffer.from(response.data);
    const fileName = `thumb-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;

    const { data, error } = await supabase.storage
      .from('thumbnails')
      .upload(fileName, imageBuffer, {
        contentType: 'image/jpeg',
        upsert: true
      });

    if (error) {
      console.error('[ERROR] Storage 업로드 실패:', error);
      return imageUrl; // 업로드 실패시 원본 URL 반환
    }

    const { data: urlData } = supabase.storage
      .from('thumbnails')
      .getPublicUrl(fileName);

    console.log('[INFO] Storage 업로드 성공:', urlData.publicUrl);
    return urlData.publicUrl;
  } catch (err) {
    console.error('[WARN] 이미지 업로드 실패, 원본 URL 사용:', err.message);
    return imageUrl;
  }
}

/**
 * Gemini로 AI 이미지 생성 (Imagen 3.0)
 */
async function generateImageWithGemini(postTitle, thumbnailPrompt) {
  const GEMINI_API_KEY = getConfigValue('gemini_api_key');

  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API 키가 설정되지 않았습니다.');
  }

  try {
    console.log('[INFO] Gemini Imagen 이미지 생성 시작');

    const imagePrompt = thumbnailPrompt
      ? `${thumbnailPrompt}, high quality photography, 16:9 aspect ratio`
      : `Professional blog thumbnail about: ${postTitle}. High quality photography, modern style, 16:9 aspect ratio`;

    console.log('[INFO] 이미지 생성 프롬프트:', imagePrompt);

    // Imagen 3.0 모델 사용
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${GEMINI_API_KEY}`,
      {
        instances: [{ prompt: imagePrompt }],
        parameters: {
          sampleCount: 1,
          aspectRatio: '16:9',
          safetyFilterLevel: 'block_few'
        }
      },
      {
        timeout: 60000,
        headers: { 'Content-Type': 'application/json' }
      }
    );

    if (response.data?.predictions?.[0]?.bytesBase64Encoded) {
      const base64Image = response.data.predictions[0].bytesBase64Encoded;
      console.log('[INFO] Imagen 이미지 생성 성공!');

      // base64를 Supabase에 업로드
      const imageBuffer = Buffer.from(base64Image, 'base64');
      const fileName = `thumb-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;

      const { data, error } = await supabase.storage
        .from('thumbnails')
        .upload(fileName, imageBuffer, {
          contentType: 'image/jpeg',
          upsert: true
        });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('thumbnails')
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    }

    throw new Error('Imagen 응답에 이미지 없음');
  } catch (error) {
    console.error('[ERROR] Gemini Imagen 실패:', error.response?.data?.error?.message || error.message);
    throw error;
  }
}

/**
 * 키워드 추출
 */
function extractKeywords(text) {
  const keywordMap = {
    '여행': 'japan travel',
    '맛집': 'japanese food restaurant',
    '일본': 'japan',
    '오사카': 'osaka japan',
    '교토': 'kyoto temple',
    '도쿄': 'tokyo city',
    '환율': 'currency money',
    '엔화': 'japanese yen',
    '쇼핑': 'shopping store',
    '구매대행': 'shopping package',
    '문화': 'japanese culture',
    '뉴스': 'japan news',
    '카페': 'japanese cafe',
    '패션': 'japanese fashion',
    '기술': 'technology'
  };

  for (const [korean, english] of Object.entries(keywordMap)) {
    if (text.includes(korean)) {
      return english;
    }
  }

  return 'japan travel';
}

/**
 * Unsplash 이미지 검색 (API 사용)
 */
async function generateImageWithUnsplash(postTitle, thumbnailPrompt) {
  const UNSPLASH_ACCESS_KEY = getConfigValue('unsplash_access_key');

  const searchText = thumbnailPrompt || postTitle;
  const keywords = extractKeywords(searchText);

  console.log('[INFO] Unsplash 검색 키워드:', keywords);

  // Unsplash API 키가 있으면 API 사용
  if (UNSPLASH_ACCESS_KEY) {
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: keywords,
          orientation: 'landscape',
          per_page: 1
        },
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
        },
        timeout: 10000
      });

      if (response.data?.results?.[0]?.urls?.regular) {
        const imageUrl = response.data.results[0].urls.regular;
        console.log('[INFO] Unsplash API 이미지 찾음:', imageUrl);
        return await uploadImageFromUrl(imageUrl);
      }
    } catch (err) {
      console.error('[WARN] Unsplash API 실패:', err.message);
    }
  }

  // Unsplash API 없으면 Lorem Picsum 사용
  return generateImageWithPicsum(keywords);
}

/**
 * Lorem Picsum 이미지 (최종 폴백)
 */
async function generateImageWithPicsum(keywords) {
  const seed = keywords.replace(/\s+/g, '-').substring(0, 20);
  const uniqueId = Date.now();
  const imageUrl = `https://picsum.photos/seed/${seed}-${uniqueId}/1280/720`;

  console.log('[INFO] Picsum 이미지 URL:', imageUrl);

  // Supabase에 업로드하여 영구 저장
  return await uploadImageFromUrl(imageUrl);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed',
    });
  }

  const { postTitle, thumbnailPrompt } = req.body;

  if (!postTitle) {
    return res.status(400).json({
      success: false,
      error: '포스트 제목이 필요합니다',
    });
  }

  console.log(`[INFO] 썸네일 생성 시작 - 제목: ${postTitle}`);

  try {
    let imageUrl;

    // 1차 시도: Gemini Imagen
    try {
      imageUrl = await generateImageWithGemini(postTitle, thumbnailPrompt);
      console.log('[INFO] Gemini Imagen 썸네일 생성 완료');

      return res.status(200).json({
        success: true,
        imageUrl,
        message: 'AI 썸네일이 생성되었습니다!',
        method: 'gemini'
      });
    } catch (geminiError) {
      console.log('[WARN] Gemini 실패, Unsplash로 전환:', geminiError.message);
    }

    // 2차 시도: Unsplash API 또는 Picsum
    imageUrl = await generateImageWithUnsplash(postTitle, thumbnailPrompt);
    console.log('[INFO] 대체 썸네일 생성 완료');

    return res.status(200).json({
      success: true,
      imageUrl,
      message: '썸네일이 생성되었습니다!',
      method: 'unsplash'
    });

  } catch (error) {
    console.error('[ERROR] 썸네일 생성 완전 실패:', error.message);

    // 최종 폴백: 기본 이미지
    const uniqueId = Date.now();
    const fallbackUrl = `https://picsum.photos/seed/bidbuy-${uniqueId}/1280/720`;

    return res.status(200).json({
      success: true,
      imageUrl: fallbackUrl,
      message: '기본 썸네일이 생성되었습니다',
      method: 'placeholder'
    });
  }
}
