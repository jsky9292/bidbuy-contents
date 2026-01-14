-- Supabase 소셜 기능 테이블 설정
-- Supabase 대시보드 > SQL Editor에서 실행하세요

-- 1. posts 테이블에 like_count 컬럼 추가 (이미 있으면 무시됨)
ALTER TABLE posts ADD COLUMN IF NOT EXISTS like_count INTEGER DEFAULT 0;

-- 2. comments 테이블 생성
CREATE TABLE IF NOT EXISTS comments (
  id BIGSERIAL PRIMARY KEY,
  post_id BIGINT REFERENCES posts(id) ON DELETE CASCADE,
  author VARCHAR(100) DEFAULT '익명',
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. comments 테이블 인덱스 생성 (성능 향상)
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at);

-- 4. RLS (Row Level Security) 설정 - 읽기는 모두 허용, 쓰기도 허용
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 댓글 읽기 가능
CREATE POLICY "Anyone can read comments" ON comments
  FOR SELECT USING (true);

-- 모든 사용자가 댓글 작성 가능
CREATE POLICY "Anyone can insert comments" ON comments
  FOR INSERT WITH CHECK (true);

-- posts 테이블 like_count 업데이트 정책 (이미 RLS가 있으면 추가)
-- 참고: posts 테이블에 이미 RLS 정책이 있다면 이 부분은 생략 가능
