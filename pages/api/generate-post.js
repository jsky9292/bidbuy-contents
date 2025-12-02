// pages/api/generate-post.js
// 블로그 글 자동 생성 API (bloggogogo 스타일)

const axios = require('axios');
const { YoutubeTranscript } = require('youtube-transcript');
const { getConfigValue } = require('../../lib/config');
const { getVideoInfo, analyzeViralFactors } = require('../../lib/youtube');
const { createPost } = require('../../lib/db');

/**
 * YouTube 자막 추출 및 요약
 */
async function getTranscript(videoId) {
  try {
    console.log(`[INFO] 자막 추출 시작: ${videoId}`);
    const transcript = await YoutubeTranscript.fetchTranscript(videoId, { lang: 'ko' });

    if (!transcript || transcript.length === 0) {
      console.log('[WARN] 한국어 자막 없음, 영어 시도');
      const enTranscript = await YoutubeTranscript.fetchTranscript(videoId, { lang: 'en' });
      if (enTranscript && enTranscript.length > 0) {
        const fullText = enTranscript.map(item => item.text).join(' ');
        console.log(`[INFO] 영어 자막 추출 완료 (${fullText.length}자)`);
        return fullText;
      }
      return null;
    }

    const fullText = transcript.map(item => item.text).join(' ');
    console.log(`[INFO] 자막 추출 완료 (${fullText.length}자)`);
    return fullText;
  } catch (error) {
    console.error('[WARN] 자막 추출 실패:', error.message);
    return null;
  }
}

/**
 * Gemini API로 블로그 글 생성 (bloggogogo 구글 스타일)
 */
async function generateBlogContent(videoInfo, viralAnalysis, transcript) {
  const GEMINI_API_KEY = getConfigValue('gemini_api_key');

  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API 키가 설정되지 않았습니다. 관리자 설정 페이지에서 API 키를 입력해주세요.');
  }

  // 자막 텍스트 요약 (너무 길면 앞부분만)
  const transcriptSummary = transcript
    ? transcript.length > 3000
      ? transcript.substring(0, 3000) + '...'
      : transcript
    : '자막 없음';

  // 바이럴 분석 요약
  const viralSummary = viralAnalysis.insights.length > 0
    ? `바이럴 점수: ${viralAnalysis.viral_score}점 (${viralAnalysis.rating}) - ${viralAnalysis.summary}`
    : '';

  // 비드바이 teal 테마 (통일된 브랜드 색상)
  const theme = { name: '비드바이-틸', primary: '#00897b', secondary: '#e0f2f1', accent: '#b2dfdb' };

  // 일본 콘텐츠 블로그 프롬프트 (장소 정보 포함)
  const prompt = `YouTube 영상 스크립트 기반 일본 정보 블로그 작성

📹 영상 정보
제목: ${videoInfo.title}
${viralSummary}

🎬 영상 스크립트 (핵심 정보 추출 필수!)
${transcriptSummary}

🎨 테마: ${theme.name} (색상: ${theme.primary})

✅ 필수 요구사항
- 3,000-3,500자 (한글, 공백 포함)
- ~이에요, ~해요 체 (친근하고 읽기 쉽게)
- **스크립트에서 실제 장소명, 가게명, 메뉴명, 가격 등 구체적 정보 반드시 추출하여 포함**
- 유튜버/채널명 절대 언급 금지! 마치 내가 직접 경험한 것처럼 1인칭으로 작성
- 문단 사이 충분한 여백 (각 p 태그에 margin-bottom: 20px 적용)

📍 장소 정보 규칙 (매우 중요!)
- 스크립트에서 언급된 **실제 가게명, 장소명을 정확히** 추출
- 각 장소마다 아래 정보 박스 포함:
  <div style="background: #f8f9fa; border-radius: 12px; padding: 20px; margin: 25px 0;">
    <h4 style="margin: 0 0 10px; color: ${theme.primary};">📍 [장소명]</h4>
    <p style="margin: 5px 0; font-size: 14px;">📌 주소: [실제 주소 또는 "일본 [지역명] 소재"]</p>
    <p style="margin: 5px 0; font-size: 14px;">🕐 영업시간: [알 수 있으면 기재, 없으면 "현지 확인 필요"]</p>
    <p style="margin: 5px 0; font-size: 14px;">💰 가격대: [메뉴 가격 정보]</p>
    <p style="margin: 5px 0; font-size: 14px;">⭐ 추천 메뉴: [대표 메뉴]</p>
  </div>

📋 HTML 구조 (문단 간격 넓게!)
<div style="font-family: 'Noto Sans KR', sans-serif; line-height: 1.9; max-width: 800px; margin: 0 auto; font-size: 17px; color: #333;">
  <div style="background: linear-gradient(135deg, ${theme.secondary}, #fff); padding: 20px; border-radius: 12px; margin-bottom: 30px;"><strong>🤔 [호기심 유발 질문]</strong><br><span style="color: #666;">[질문에 대한 간단한 답변 미리보기]</span></div>

  <p style="margin-bottom: 20px; line-height: 1.9;">[도입 - 왜 이 장소/음식에 관심을 갖게 됐는지]</p>

  {{IMAGE_1}}

  <h2 style="font-size: 24px; color: ${theme.primary}; margin: 40px 0 20px; border-bottom: 3px solid ${theme.primary}; padding-bottom: 10px;"><strong>[섹션1 제목]</strong></h2>
  <p style="margin-bottom: 20px; line-height: 1.9;">[본문 - 구체적인 경험 설명]</p>

  [장소 정보 박스]

  {{IMAGE_2}}

  <h2 style="font-size: 24px; color: ${theme.primary}; margin: 40px 0 20px; border-bottom: 3px solid ${theme.primary}; padding-bottom: 10px;"><strong>[섹션2 제목]</strong></h2>
  <p style="margin-bottom: 20px; line-height: 1.9;">[본문]</p>

  <div style="background-color: ${theme.accent}; border-left: 4px solid ${theme.primary}; padding: 20px; margin: 30px 0; border-radius: 0 12px 12px 0;"><strong>💡 꿀팁!</strong><br>[실용적인 팁 - 가는 방법, 주문 방법, 주의사항 등]</div>

  <table style="width: 100%; border-collapse: collapse; margin: 30px 0; border-radius: 8px; overflow: hidden;">
    <thead><tr style="background-color: ${theme.primary}; color: white;"><th style="padding: 15px; border: 1px solid #dee2e6;">[항목]</th><th style="padding: 15px; border: 1px solid #dee2e6;">[내용]</th></tr></thead>
    <tbody><tr><td style="padding: 15px; border: 1px solid #dee2e6;">[데이터]</td><td style="padding: 15px; border: 1px solid #dee2e6;">[데이터]</td></tr></tbody>
  </table>

  {{IMAGE_3}}

  <h2 style="font-size: 24px; color: ${theme.primary}; margin: 40px 0 20px; border-bottom: 3px solid ${theme.primary}; padding-bottom: 10px;"><strong>❓ 자주 묻는 질문</strong></h2>
  <h3 style="font-size: 18px; margin: 25px 0 10px; color: #444;">Q. [질문1]?</h3>
  <p style="margin-bottom: 20px; line-height: 1.9;">A. [답변1]</p>
  <h3 style="font-size: 18px; margin: 25px 0 10px; color: #444;">Q. [질문2]?</h3>
  <p style="margin-bottom: 20px; line-height: 1.9;">A. [답변2]</p>

  <div style="background: linear-gradient(135deg, ${theme.accent}, #fff); padding: 25px; border-radius: 12px; margin-top: 40px;">
    <strong>📝 마무리</strong>
    <p style="margin: 10px 0 0; line-height: 1.9;">[전체 요약 및 추천 멘트]</p>
  </div>
</div>

🖼️ 이미지 프롬프트 규칙
- 스크립트에서 언급된 **실제 음식, 장소, 상황**을 구체적으로 묘사
- 예: "라멘" → "steaming tonkotsu ramen with chashu pork slices, soft boiled egg, green onions, in a Japanese restaurant, close-up shot, appetizing food photography"
- 예: "오사카 도톤보리" → "Dotonbori street in Osaka at night, neon signs, Glico running man, canal reflection, vibrant atmosphere"

📤 JSON 출력
{
  "title": "SEO 최적화 제목 60자 이내 (장소명/음식명 포함)",
  "meta_description": "메타 설명 130-150자 (핵심 정보 요약)",
  "content": "위 HTML 구조 (장소 정보 박스 필수 포함)",
  "keywords": ["키워드1", "키워드2", "키워드3", "키워드4", "키워드5", "키워드6", "키워드7", "키워드8"],
  "hashtags": ["해시태그1", "해시태그2", "해시태그3", "해시태그4", "해시태그5", "해시태그6", "해시태그7", "해시태그8", "해시태그9", "해시태그10"],
  "places": [
    {"name": "장소명1", "address": "주소 또는 지역", "type": "restaurant/cafe/attraction/shop"},
    {"name": "장소명2", "address": "주소 또는 지역", "type": "restaurant/cafe/attraction/shop"}
  ],
  "thumbnail_prompt": "메인 주제를 대표하는 구체적 장면, photorealistic, 16:9, vibrant colors, appetizing/beautiful",
  "image_prompts": [
    "첫번째 장소/음식의 구체적 묘사 영어 프롬프트",
    "두번째 장소/음식의 구체적 묘사 영어 프롬프트",
    "세번째 장소/분위기의 구체적 묘사 영어 프롬프트"
  ]
}

📌 해시태그 규칙:
- 10개 생성: 장소명 + 음식명 + 지역명 + 관련 인기 검색어
- 예: ["오사카맛집", "도톤보리라멘", "일본여행", "오사카여행", "일본라멘", "오사카야식", "일본먹방", "해외맛집", "오사카추천", "일본음식"]

JSON만 출력. 다른 텍스트 금지.`;

  try {
    // 여러 모델 시도 (503 오버로드 에러 방지)
    const models = ['gemini-2.5-flash-lite', 'gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.5-pro'];
    let response;
    let lastError;

    for (const model of models) {
      try {
        console.log(`[INFO] ${model} 모델로 시도 중...`);
        response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
          {
            contents: [{
              parts: [{
                text: prompt
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 16384,
            }
          },
          { timeout: 60000 }
        );
        console.log(`[INFO] ${model} 모델 사용 성공!`);
        break;
      } catch (err) {
        console.log(`[WARN] ${model} 모델 실패:`, err.response?.data?.error?.message || err.message);
        lastError = err;
        if (model === models[models.length - 1]) {
          throw lastError;
        }
        // 다음 모델 시도 전 1초 대기
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Gemini API 응답 확인
    if (!response.data.candidates || !response.data.candidates[0]) {
      console.error('[ERROR] Gemini API 응답 구조 이상:', JSON.stringify(response.data, null, 2));
      throw new Error('Gemini API에서 응답을 받지 못했습니다.');
    }

    const candidate = response.data.candidates[0];

    // content.parts 구조 확인
    if (!candidate.content || !candidate.content.parts || !candidate.content.parts[0]) {
      console.error('[ERROR] Gemini API content.parts 구조 이상:', JSON.stringify(candidate, null, 2));
      throw new Error('Gemini API 응답 형식이 올바르지 않습니다.');
    }

    const generatedText = candidate.content.parts[0].text;

    // JSON 파싱 개선 (HTML 이스케이프 처리 포함)
    let cleanedText = generatedText.trim();

    // 코드블록 제거 (```json, ``` 등)
    cleanedText = cleanedText.replace(/```json\s*/g, '').replace(/```\s*/g, '');

    // JSON 객체만 추출 (앞뒤 불필요한 텍스트 제거)
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanedText = jsonMatch[0];
    }

    // 잘못된 제어 문자 제거 (JSON 파싱 에러 방지)
    cleanedText = cleanedText.replace(/[\x00-\x1F\x7F]/g, '');

    // 디버깅을 위한 로그 (첫 500자만)
    console.log('[DEBUG] 파싱할 텍스트:', cleanedText.substring(0, 500));

    try {
      const result = JSON.parse(cleanedText);

      // 필수 필드 검증
      if (!result.title || !result.content) {
        throw new Error('필수 필드(title, content)가 누락되었습니다.');
      }

      // HTML 콘텐츠에서 불필요한 이스케이프 제거
      let htmlContent = result.content;

      // 이중 이스케이프 수정 (\\\" → \")
      htmlContent = htmlContent.replace(/\\\\"/g, '"');
      htmlContent = htmlContent.replace(/\\"/g, '"');
      htmlContent = htmlContent.replace(/\\n/g, '\n');

      // 기본값 설정
      return {
        title: result.title,
        content: htmlContent,
        meta_description: result.meta_description || result.title.substring(0, 150),
        keywords: result.keywords || []
      };
    } catch (parseError) {
      console.error('[ERROR] JSON 파싱 실패:', parseError.message);
      console.error('[DEBUG] 문제가 있는 JSON (처음 1500자):', cleanedText.substring(0, 1500));

      // 파싱 실패 시 재시도 로직
      try {
        // content 필드의 HTML을 임시로 base64 인코딩하여 재시도
        const contentMatch = cleanedText.match(/"content":\s*"([^"]*)"/);
        if (!contentMatch) {
          throw new Error('content 필드를 찾을 수 없습니다.');
        }

        // 간단한 대체: content가 너무 길어서 잘린 경우 기본 구조 사용
        console.log('[WARN] JSON 파싱 실패, 기본 구조로 재시도');
        throw new Error('AI가 생성한 JSON 형식이 올바르지 않습니다. 다시 시도해주세요.');
      } catch (retryError) {
        console.error('[ERROR] 재시도도 실패:', retryError.message);
        throw new Error('AI가 생성한 JSON 형식이 올바르지 않습니다. 다시 시도해주세요.');
      }
    }
  } catch (error) {
    console.error('[ERROR] Gemini API 호출 실패:', error.message);
    if (error.response) {
      console.error('응답 데이터:', error.response.data);
    }
    throw new Error('블로그 글 생성 중 오류가 발생했습니다');
  }
}

/**
 * Slug 생성 (한글 제목을 URL-safe 문자열로 변환)
 */
function generateSlug(title) {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `post-${timestamp}-${random}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed',
    });
  }

  const { videoId, thumbnailPrompt, imagePrompts: userImagePrompts, imageCount = 3 } = req.body;

  if (!videoId) {
    return res.status(400).json({
      success: false,
      error: '영상 ID가 필요합니다',
    });
  }

  console.log('[INFO] 블로그 글 생성 시작:', videoId);

  try {
    // 1. YouTube 영상 정보 가져오기
    console.log('[INFO] 영상 정보 조회 중...');
    const videoInfo = await getVideoInfo(videoId);

    // 2. YouTube 자막 추출
    let transcript = null;
    try {
      console.log('[INFO] 영상 자막 추출 시도 중...');
      transcript = await getTranscript(videoId);
      if (transcript) {
        console.log(`[INFO] 자막 추출 성공 (${transcript.length}자)`);
      } else {
        console.log('[WARN] 자막 없음 - 영상 설명과 제목으로 작성');
      }
    } catch (transcriptError) {
      console.log('[WARN] 자막 추출 실패:', transcriptError.message);
    }

    // 3. 영상 바이럴 요인 분석
    console.log('[INFO] 영상 바이럴 요인 분석 중...');
    const viralAnalysis = analyzeViralFactors(videoInfo);
    console.log(`[INFO] 바이럴 분석 완료 - 점수: ${viralAnalysis.viral_score}점 (${viralAnalysis.rating})`);

    // 4. Gemini API로 블로그 글 생성 (자막 + 바이럴 분석 포함)
    console.log('[INFO] AI 블로그 글 생성 중...');
    const blogContent = await generateBlogContent(videoInfo, viralAnalysis, transcript);

    // 4. 이미지 생성 (썸네일 + 본문 이미지)
    console.log('[INFO] 이미지 생성 중...');
    const baseUrl = req.headers.origin || 'http://localhost:3000';

    // 썸네일 생성
    let thumbnailUrl = null;
    try {
      const thumbnailResponse = await axios.post(
        `${baseUrl}/api/generate-thumbnail`,
        {
          postTitle: blogContent.title,
          thumbnailPrompt: blogContent.thumbnail_prompt || thumbnailPrompt || null
        }
      );
      if (thumbnailResponse.data.success) {
        thumbnailUrl = thumbnailResponse.data.imageUrl;
        console.log('[INFO] 썸네일 생성 완료');
      }
    } catch (thumbnailError) {
      console.error('[WARN] 썸네일 생성 실패:', thumbnailError.message);
      thumbnailUrl = `https://picsum.photos/seed/${Date.now()}/1280/720`;
    }

    // 본문 이미지 생성 (사용자 설정 개수만큼)
    let finalContent = blogContent.content;
    // 사용자 입력 프롬프트 우선, 없으면 AI 생성 프롬프트 사용
    const aiImagePrompts = blogContent.image_prompts || [];
    const finalImageCount = Math.min(imageCount, 5);

    console.log(`[INFO] 본문 이미지 ${finalImageCount}장 생성 예정`);

    for (let i = 0; i < finalImageCount; i++) {
      const placeholder = `{{IMAGE_${i + 1}}}`;
      // 사용자 프롬프트가 있으면 우선 사용, 없으면 AI 프롬프트
      const imgPrompt = (userImagePrompts && userImagePrompts[i]) || aiImagePrompts[i] || `${blogContent.title} 관련 이미지 ${i + 1}`;

      try {
        console.log(`[INFO] 본문 이미지 ${i + 1} 생성 중... 프롬프트: ${imgPrompt}`);
        const imgResponse = await axios.post(
          `${baseUrl}/api/generate-thumbnail`,
          {
            postTitle: blogContent.title,
            thumbnailPrompt: imgPrompt
          }
        );
        if (imgResponse.data.success && imgResponse.data.imageUrl) {
          const imgTag = `<div style="margin: 20px 0; text-align: center;"><img src="${imgResponse.data.imageUrl}" alt="본문 이미지 ${i + 1}" style="max-width: 100%; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" /></div>`;
          // 플레이스홀더가 있으면 교체, 없으면 본문 중간에 삽입
          if (finalContent.includes(placeholder)) {
            finalContent = finalContent.replace(placeholder, imgTag);
          } else {
            // 본문을 대략 n등분하여 이미지 삽입
            const contentParts = finalContent.split('</p>');
            const insertIdx = Math.floor((contentParts.length / (finalImageCount + 1)) * (i + 1));
            if (insertIdx < contentParts.length) {
              contentParts[insertIdx] = contentParts[insertIdx] + '</p>' + imgTag;
              finalContent = contentParts.join('</p>');
            }
          }
          console.log(`[INFO] 본문 이미지 ${i + 1} 생성 완료`);
        }
      } catch (imgError) {
        console.error(`[WARN] 본문 이미지 ${i + 1} 생성 실패:`, imgError.message);
        if (finalContent.includes(placeholder)) {
          finalContent = finalContent.replace(placeholder, '');
        }
      }
    }

    // 남은 플레이스홀더 제거
    finalContent = finalContent.replace(/\{\{IMAGE_\d+\}\}/g, '');

    // 5. 데이터베이스에 저장
    console.log('[INFO] 데이터베이스에 저장 중...');
    const slug = generateSlug(blogContent.title);

    // 해시태그 처리
    const hashtags = Array.isArray(blogContent.hashtags)
      ? blogContent.hashtags.join(', ')
      : String(blogContent.hashtags || '');

    const post = await createPost({
      video_id: videoId,
      title: blogContent.title,
      slug: slug,
      content: finalContent,
      meta_description: blogContent.meta_description,
      keywords: Array.isArray(blogContent.keywords)
        ? blogContent.keywords.join(', ')
        : String(blogContent.keywords || ''),
      hashtags: hashtags,
      thumbnail_url: thumbnailUrl,
      status: 'draft',
    });

    if (!post) {
      throw new Error('데이터베이스 저장에 실패했습니다.');
    }

    console.log('[INFO] 블로그 글 생성 완료:', post.id);

    return res.status(200).json({
      success: true,
      message: '블로그 글이 생성되었습니다!',
      post: {
        id: post.id,
        title: post.title,
        slug: post.slug,
      },
    });
  } catch (error) {
    console.error('[ERROR] 블로그 글 생성 실패:', error.message);
    return res.status(500).json({
      success: false,
      error: error.message || '블로그 글 생성 중 오류가 발생했습니다',
    });
  }
}
