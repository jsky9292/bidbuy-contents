// pages/api/sitemap.js
// 동적 사이트맵 생성

import { supabase } from '../../lib/db';

export default async function handler(req, res) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bidbuy-contents.com';

  // 게시물 목록 가져오기
  const { data: posts } = await supabase
    .from('posts')
    .select('slug, updated_at, created_at')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  // 카테고리 목록
  const categories = ['travel', 'exchange', 'proxy', 'shopping', 'culture', 'news', 'tips'];

  // XML 생성
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

  // 카테고리 페이지
  for (const category of categories) {
    xml += `
  <url>
    <loc>${baseUrl}/category/${category}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
  }

  // 게시물 페이지
  if (posts && posts.length > 0) {
    for (const post of posts) {
      const lastmod = post.updated_at || post.created_at;
      xml += `
  <url>
    <loc>${baseUrl}/posts/${post.slug}</loc>
    <lastmod>${new Date(lastmod).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }
  }

  xml += `
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.status(200).send(xml);
}
