// scripts/delete-sample-posts.js
// seed-posts.js로 생성한 샘플 게시물 삭제

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://cxpwlbwhacelukvpllxa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4cHdsYndoYWNlbHVrdnBsbHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NzU5NTksImV4cCI6MjA4MDI1MTk1OX0.gtok46jJqAoQ3JU1Snc4m00bsmkNEuhsw3xnq6Y4yTo';

const supabase = createClient(supabaseUrl, supabaseKey);

// 삭제할 샘플 게시물 slug 목록
const sampleSlugs = [
  'osaka-3night-4day-travel-guide',
  'tokyo-top-5-ramen-restaurants',
  'best-time-yen-exchange',
  '2024-yen-exchange-rate-forecast',
  'yahoo-auction-bidding-guide-beginners',
  'mercari-japan-shopping-guide',
  'japan-tax-free-shopping-guide-2024',
  'japan-drugstore-must-buy-items',
  'japan-anime-pilgrimage-guide',
  'japan-onsen-etiquette-ryokan-guide',
  'japan-travel-trends-2024',
  'visit-japan-web-registration-guide',
  'japan-convenience-store-must-try-food',
  'japan-transportation-guide-ic-card-jr-pass'
];

async function deleteSamplePosts() {
  console.log('='.repeat(50));
  console.log('샘플 게시물 삭제 시작...');
  console.log('='.repeat(50));

  let deleteCount = 0;

  for (const slug of sampleSlugs) {
    const { data, error } = await supabase
      .from('posts')
      .delete()
      .eq('slug', slug)
      .select();

    if (error) {
      console.log(`[ERROR] ${slug}: ${error.message}`);
    } else if (data && data.length > 0) {
      console.log(`[DELETED] ${data[0].title}`);
      deleteCount++;
    } else {
      console.log(`[SKIP] ${slug} - 이미 없음`);
    }
  }

  console.log('='.repeat(50));
  console.log(`완료! ${deleteCount}개 게시물 삭제됨`);
  console.log('='.repeat(50));
}

deleteSamplePosts().catch(console.error);
