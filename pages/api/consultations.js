// pages/api/consultations.js
// 문의 조회/관리 API

import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const JWT_SECRET = process.env.JWT_SECRET || process.env.ADMIN_PASSWORD || 'super-secret-jwt-key';

// 토큰 검증
function verifyToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  try {
    const token = authHeader.split(' ')[1];
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  // 인증 확인
  const user = verifyToken(req);
  if (!user) {
    return res.status(401).json({ error: '인증이 필요합니다.' });
  }

  // GET: 문의 목록 조회
  if (req.method === 'GET') {
    try {
      const { status, limit = 50 } = req.query;

      let query = supabase
        .from('consultations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(parseInt(limit));

      if (status && status !== 'all') {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) throw error;

      return res.status(200).json({
        success: true,
        data: data || []
      });
    } catch (error) {
      console.error('문의 조회 오류:', error);
      return res.status(500).json({ error: '조회 중 오류가 발생했습니다.' });
    }
  }

  // PATCH: 문의 상태 업데이트
  if (req.method === 'PATCH') {
    try {
      const { id, status, note } = req.body;

      if (!id || !status) {
        return res.status(400).json({ error: 'ID와 상태를 입력해주세요.' });
      }

      const updates = {
        status,
        updated_at: new Date().toISOString()
      };

      if (note !== undefined) {
        updates.admin_note = note;
      }

      const { error } = await supabase
        .from('consultations')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      return res.status(200).json({
        success: true,
        message: '상태가 업데이트되었습니다.'
      });
    } catch (error) {
      console.error('문의 업데이트 오류:', error);
      return res.status(500).json({ error: '업데이트 중 오류가 발생했습니다.' });
    }
  }

  // DELETE: 문의 삭제
  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'ID를 입력해주세요.' });
      }

      const { error } = await supabase
        .from('consultations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return res.status(200).json({
        success: true,
        message: '삭제되었습니다.'
      });
    } catch (error) {
      console.error('문의 삭제 오류:', error);
      return res.status(500).json({ error: '삭제 중 오류가 발생했습니다.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
