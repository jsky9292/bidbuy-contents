// pages/api/robots.js
// robots.txt 동적 생성

export default function handler(req, res) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bidbuy-contents.com';

  const robots = `# robots.txt for ${baseUrl}
User-agent: *
Allow: /

# 관리자 페이지 크롤링 금지
Disallow: /admin/
Disallow: /api/

# 사이트맵 위치
Sitemap: ${baseUrl}/sitemap.xml
`;

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
  res.status(200).send(robots);
}
