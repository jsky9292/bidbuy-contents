// pages/api/social-action.js
// 좋아요/댓글 API - Supabase 사용

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ success: false, error: 'slug가 필요합니다' });
  }

  // GET: 소셜 데이터 조회
  if (req.method === 'GET') {
    try {
      // 포스트의 like_count 조회
      const { data: post, error: postError } = await supabase
        .from('posts')
        .select('id, like_count')
        .eq('slug', slug)
        .single();

      if (postError || !post) {
        return res.status(200).json({ success: true, data: { likes: 0, comments: [] } });
      }

      // 해당 포스트의 댓글 조회
      const { data: comments, error: commentsError } = await supabase
        .from('comments')
        .select('id, author, content, created_at')
        .eq('post_id', post.id)
        .order('created_at', { ascending: true });

      return res.status(200).json({
        success: true,
        data: {
          likes: post.like_count || 0,
          comments: comments || []
        }
      });
    } catch (error) {
      console.error('[ERROR] 소셜 데이터 조회 실패:', error);
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  // POST: 좋아요 또는 댓글 추가
  if (req.method === 'POST') {
    const { action, comment, author } = req.body;

    try {
      // 포스트 조회
      const { data: post, error: postError } = await supabase
        .from('posts')
        .select('id, like_count')
        .eq('slug', slug)
        .single();

      if (postError || !post) {
        return res.status(404).json({ success: false, error: '포스트를 찾을 수 없습니다' });
      }

      if (action === 'like') {
        // 좋아요 수 증가
        const newLikeCount = (post.like_count || 0) + 1;
        const { error: updateError } = await supabase
          .from('posts')
          .update({ like_count: newLikeCount })
          .eq('id', post.id);

        if (updateError) {
          throw updateError;
        }

        return res.status(200).json({ success: true, likes: newLikeCount });
      }

      if (action === 'comment' && comment) {
        // 댓글 추가
        const newComment = {
          post_id: post.id,
          author: author || '익명',
          content: comment,
          created_at: new Date().toISOString()
        };

        const { data: insertedComment, error: insertError } = await supabase
          .from('comments')
          .insert(newComment)
          .select()
          .single();

        if (insertError) {
          throw insertError;
        }

        return res.status(200).json({ success: true, comment: insertedComment });
      }

      return res.status(400).json({ success: false, error: '잘못된 요청입니다' });
    } catch (error) {
      console.error('[ERROR] 소셜 액션 실패:', error);
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  return res.status(405).json({ success: false, error: 'Method Not Allowed' });
}
