// scripts/fix-maps-iframe.js
// 기존 게시물의 깨진 Google Maps iframe을 링크 버튼으로 교체

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://cxpwlbwhacelukvpllxa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4cHdsYndoYWNlbHVrdnBsbHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NzU5NTksImV4cCI6MjA4MDI1MTk1OX0.gtok46jJqAoQ3JU1Snc4m00bsmkNEuhsw3xnq6Y4yTo';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixMapsIframes() {
  console.log('='.repeat(50));
  console.log('Google Maps iframe 수정 시작...');
  console.log('='.repeat(50));

  // 모든 게시물 가져오기
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, content')
    .not('content', 'is', null);

  if (error) {
    console.error('게시물 조회 실패:', error.message);
    return;
  }

  console.log(`총 ${posts.length}개 게시물 확인 중...`);

  let fixedCount = 0;

  for (const post of posts) {
    if (!post.content) continue;

    // iframe이 포함된 게시물만 처리
    if (!post.content.includes('<iframe') && !post.content.includes('maps/embed')) {
      continue;
    }

    let newContent = post.content;

    // Google Maps iframe을 링크 버튼으로 교체
    // 패턴: <div style="margin-top..."><iframe src="https://www.google.com/maps/embed/v1/place?key=...&q=..."...</iframe></div>
    const iframeRegex = /<div[^>]*style="[^"]*margin-top[^"]*"[^>]*>\s*<iframe[^>]*src="https:\/\/www\.google\.com\/maps\/embed\/v1\/place\?key=[^"]*&q=([^"&]+)"[^>]*>[^<]*<\/iframe>\s*<\/div>/gi;

    newContent = newContent.replace(iframeRegex, (match, query) => {
      const decodedQuery = decodeURIComponent(query.replace(/\+/g, ' '));
      return `<a href="https://www.google.com/maps/search/${encodeURIComponent(decodedQuery)}" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-top: 16px; padding: 10px 20px; background: #00897b; color: white; text-decoration: none; border-radius: 8px; font-size: 14px;">🗺️ 지도에서 보기</a>`;
    });

    // 단순 iframe만 있는 경우도 처리
    const simpleIframeRegex = /<iframe[^>]*src="https:\/\/www\.google\.com\/maps\/embed\/v1\/place\?key=[^"]*&q=([^"&]+)"[^>]*>[^<]*<\/iframe>/gi;

    newContent = newContent.replace(simpleIframeRegex, (match, query) => {
      const decodedQuery = decodeURIComponent(query.replace(/\+/g, ' '));
      return `<a href="https://www.google.com/maps/search/${encodeURIComponent(decodedQuery)}" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-top: 16px; padding: 10px 20px; background: #00897b; color: white; text-decoration: none; border-radius: 8px; font-size: 14px;">🗺️ 지도에서 보기</a>`;
    });

    // 변경이 있으면 업데이트
    if (newContent !== post.content) {
      const { error: updateError } = await supabase
        .from('posts')
        .update({ content: newContent })
        .eq('id', post.id);

      if (updateError) {
        console.log(`[ERROR] ${post.title}: ${updateError.message}`);
      } else {
        console.log(`[FIXED] ${post.title}`);
        fixedCount++;
      }
    }
  }

  console.log('='.repeat(50));
  console.log(`완료! ${fixedCount}개 게시물 수정됨`);
  console.log('='.repeat(50));
}

fixMapsIframes().catch(console.error);
