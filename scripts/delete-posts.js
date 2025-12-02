// scripts/delete-posts.js
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://cxpwlbwhacelukvpllxa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4cHdsYndoYWNlbHVrdnBsbHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NzU5NTksImV4cCI6MjA4MDI1MTk1OX0.gtok46jJqAoQ3JU1Snc4m00bsmkNEuhsw3xnq6Y4yTo';

const supabase = createClient(supabaseUrl, supabaseKey);

async function deletePosts() {
  console.log('테스트 포스트 삭제 중...');

  const { error } = await supabase
    .from('posts')
    .delete()
    .in('id', [
      'osaka-3night-4day-travel',
      'yen-exchange-timing-guide',
      'yahoo-auction-beginner-guide'
    ]);

  if (error) {
    console.error('삭제 실패:', error.message);
  } else {
    console.log('삭제 완료!');
  }
}

deletePosts();
