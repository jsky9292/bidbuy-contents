// pages/api/generate-thumbnail.js
// 썸네일 이미지 생성 - 여러 소스 폴백 지원

const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');
const { getConfigValue } = require('../../lib/config');

// Supabase 클라이언트
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

/**
 * 키워드 추출
 */
function extractKeywords(text) {
  const keywordMap = {
    '여행': 'japan-travel',
    '맛집': 'japanese-food',
    '일본': 'japan',
    '오사카': 'osaka',
    '교토': 'kyoto',
    '도쿄': 'tokyo',
    '환율': 'currency',
    '엔화': 'yen-money',
    '쇼핑': 'shopping',
    '구매대행': 'package-delivery',
    '문화': 'japan-culture',
    '뉴스': 'news',
    '카페': 'cafe',
    '패션': 'fashion',
    '기술': 'technology'
  };

  for (const [korean, english] of Object.entries(keywordMap)) {
    if (text.includes(korean)) {
      return english;
    }
  }

  return 'japan';
}

/**
 * 이미지 URL에서 다운로드하여 Supabase에 업로드
 */
async function uploadImageToSupabase(imageUrl) {
  try {
    console.log('[INFO] 이미지 다운로드 시작:', imageUrl);

    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      timeout: 30000,
      maxRedirects: 5,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const imageBuffer = Buffer.from(response.data);
    const fileName = `thumb-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;

    console.log('[INFO] Supabase 업로드 시작:', fileName, 'Size:', imageBuffer.length);

    const { data, error } = await supabase.storage
      .from('thumbnails')
      .upload(fileName, imageBuffer, {
        contentType: 'image/jpeg',
        upsert: true
      });

    if (error) {
      console.error('[ERROR] Supabase 업로드 실패:', error);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from('thumbnails')
      .getPublicUrl(fileName);

    console.log('[INFO] Supabase 업로드 성공:', urlData.publicUrl);
    return urlData.publicUrl;
  } catch (err) {
    console.error('[ERROR] 이미지 업로드 실패:', err.message);
    return null;
  }
}

/**
 * Lorem Picsum에서 이미지 가져오기
 */
async function getImageFromPicsum(seed) {
  const uniqueSeed = `${seed}-${Date.now()}`;

  // Picsum은 리다이렉트하므로 실제 이미지 URL 가져오기
  try {
    const response = await axios.get(`https://picsum.photos/seed/${uniqueSeed}/1280/720`, {
      maxRedirects: 0,
      validateStatus: (status) => status === 302 || status === 200,
      responseType: 'arraybuffer',
      timeout: 15000
    });

    // 직접 이미지 데이터를 받은 경우
    if (response.status === 200 && response.data) {
      const imageBuffer = Buffer.from(response.data);
      const fileName = `thumb-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;

      const { data, error } = await supabase.storage
        .from('thumbnails')
        .upload(fileName, imageBuffer, {
          contentType: 'image/jpeg',
          upsert: true
        });

      if (!error) {
        const { data: urlData } = supabase.storage
          .from('thumbnails')
          .getPublicUrl(fileName);
        console.log('[INFO] Picsum 이미지 업로드 성공:', urlData.publicUrl);
        return urlData.publicUrl;
      }
    }
  } catch (err) {
    console.log('[WARN] Picsum 첫 시도 실패:', err.message);
  }

  // 폴백: 직접 URL 반환 (캐시 방지용 타임스탬프 추가)
  return `https://picsum.photos/seed/${uniqueSeed}/1280/720`;
}

/**
 * Unsplash에서 이미지 검색
 */
async function getImageFromUnsplash(keywords) {
  const UNSPLASH_ACCESS_KEY = getConfigValue('unsplash_access_key');

  if (!UNSPLASH_ACCESS_KEY) {
    console.log('[INFO] Unsplash API 키 없음, 건너뜀');
    return null;
  }

  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: keywords.replace(/-/g, ' '),
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
      console.log('[INFO] Unsplash 이미지 찾음:', imageUrl);

      // Supabase에 업로드
      const uploadedUrl = await uploadImageToSupabase(imageUrl);
      return uploadedUrl || imageUrl;
    }
  } catch (err) {
    console.error('[WARN] Unsplash API 실패:', err.message);
  }

  return null;
}

/**
 * Gemini로 이미지 생성 시도 (실험적)
 */
async function generateWithGemini(prompt) {
  const GEMINI_API_KEY = getConfigValue('gemini_api_key');

  if (!GEMINI_API_KEY) {
    console.log('[INFO] Gemini API 키 없음, 건너뜀');
    return null;
  }

  try {
    // Gemini 2.0 Flash Experimental - 이미지 생성 지원
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `Generate a high-quality photorealistic image: ${prompt}. The image should be suitable for a blog thumbnail, professional looking, 16:9 aspect ratio.`
          }]
        }],
        generationConfig: {
          responseModalities: ['IMAGE', 'TEXT']
        }
      },
      {
        timeout: 60000,
        headers: { 'Content-Type': 'application/json' }
      }
    );

    // 이미지 응답 확인
    const parts = response.data?.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData?.mimeType?.startsWith('image/')) {
        const base64Image = part.inlineData.data;
        console.log('[INFO] Gemini 이미지 생성 성공!');

        // Supabase에 업로드
        const imageBuffer = Buffer.from(base64Image, 'base64');
        const fileName = `thumb-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;

        const { data, error } = await supabase.storage
          .from('thumbnails')
          .upload(fileName, imageBuffer, {
            contentType: part.inlineData.mimeType || 'image/jpeg',
            upsert: true
          });

        if (!error) {
          const { data: urlData } = supabase.storage
            .from('thumbnails')
            .getPublicUrl(fileName);
          return urlData.publicUrl;
        }
      }
    }

    console.log('[WARN] Gemini 응답에 이미지 없음');
  } catch (err) {
    console.error('[WARN] Gemini 실패:', err.response?.data?.error?.message || err.message);
  }

  return null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { postTitle, thumbnailPrompt } = req.body;

  if (!postTitle) {
    return res.status(400).json({ success: false, error: '포스트 제목이 필요합니다' });
  }

  console.log(`[INFO] 썸네일 생성 시작 - 제목: ${postTitle}, 프롬프트: ${thumbnailPrompt || '없음'}`);

  const searchText = thumbnailPrompt || postTitle;
  const keywords = extractKeywords(searchText);
  console.log('[INFO] 추출된 키워드:', keywords);

  let imageUrl = null;
  let method = 'unknown';

  // 1차: Gemini AI 이미지 생성 시도
  if (thumbnailPrompt) {
    console.log('[INFO] 1차 시도: Gemini AI');
    imageUrl = await generateWithGemini(thumbnailPrompt);
    if (imageUrl) {
      method = 'gemini';
    }
  }

  // 2차: Unsplash API
  if (!imageUrl) {
    console.log('[INFO] 2차 시도: Unsplash API');
    imageUrl = await getImageFromUnsplash(keywords);
    if (imageUrl) {
      method = 'unsplash';
    }
  }

  // 3차: Lorem Picsum (항상 작동)
  if (!imageUrl) {
    console.log('[INFO] 3차 시도: Lorem Picsum');
    imageUrl = await getImageFromPicsum(keywords);
    method = 'picsum';
  }

  console.log(`[INFO] 최종 이미지 URL (${method}):`, imageUrl);

  return res.status(200).json({
    success: true,
    imageUrl,
    message: method === 'gemini' ? 'AI 썸네일이 생성되었습니다!' : '썸네일이 생성되었습니다!',
    method
  });
}
