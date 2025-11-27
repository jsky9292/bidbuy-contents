// pages/api/auth/verify.js
// JWT 토큰 검증 API (Vercel 서버리스 호환)

import jwt from 'jsonwebtoken';

// JWT 시크릿 키 (환경변수 또는 기본값)
const JWT_SECRET = process.env.JWT_SECRET || process.env.ADMIN_PASSWORD || 'super-secret-jwt-key-change-in-production';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: '인증 토큰이 필요합니다.'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    // JWT 토큰 검증 (서명 확인 + 만료 확인)
    const decoded = jwt.verify(token, JWT_SECRET);

    return res.status(200).json({
      success: true,
      user: { username: decoded.username }
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: '토큰이 만료되었습니다. 다시 로그인해주세요.'
      });
    }

    return res.status(401).json({
      success: false,
      error: '유효하지 않은 토큰입니다.'
    });
  }
}
