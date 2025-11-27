// pages/api/auth/logout.js
// 로그아웃 API (JWT 기반 - 클라이언트에서 토큰 삭제만 필요)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // JWT는 stateless이므로 서버에서 토큰 삭제 불필요
  // 클라이언트에서 localStorage의 토큰을 삭제하면 됨
  return res.status(200).json({
    success: true,
    message: '로그아웃 되었습니다.'
  });
}
