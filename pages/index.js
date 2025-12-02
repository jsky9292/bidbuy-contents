// pages/index.js
// 비드바이 - 일본 정보 콘텐츠 블로그

import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import Link from 'next/link';
import { getPublishedPosts } from '../lib/db';
import { getAllCategories } from '../lib/categories';

export default function Home({ posts }) {
  const categories = getAllCategories();

  return (
    <Layout>
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-br from-[#e0f2f1] to-white py-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            일본의 모든 것, <span className="text-[#4db6ac]">Bidbuy</span>
          </h1>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            일본 여행, 쇼핑, 문화, 환율 정보까지!<br className="hidden sm:block" />
            유용한 일본 정보를 한곳에서 만나보세요.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/category/travel" className="px-5 py-2.5 bg-[#4db6ac] text-white rounded-full text-sm font-medium hover:bg-[#26a69a] transition-colors">
              ✈️ 일본여행
            </Link>
            <Link href="/category/exchange" className="px-5 py-2.5 bg-white text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:border-[#4db6ac] hover:text-[#4db6ac] transition-colors">
              💴 환율정보
            </Link>
            <Link href="/category/proxy" className="px-5 py-2.5 bg-white text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:border-[#4db6ac] hover:text-[#4db6ac] transition-colors">
              🛒 구매대행
            </Link>
          </div>
        </div>
      </section>

      {/* 카테고리 섹션 */}
      <section className="py-10 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-6">카테고리별 정보</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/category/${cat.slug}`}>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-[#4db6ac] transition-all cursor-pointer group">
                  <div className="relative h-28 overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>
                  <div className="p-3 text-center">
                    <div className="font-medium text-gray-900 group-hover:text-[#4db6ac] transition-colors">{cat.name}</div>
                    <div className="text-xs text-gray-500 mt-1 line-clamp-1">{cat.description}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 인기 토픽 */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-6">인기 토픽</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: '오사카 3박4일 여행 코스', desc: '도톤보리, 유니버셜, 교토까지', image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&q=80', href: '/category/travel' },
              { title: '엔화 환전 타이밍', desc: '환율 저점에 환전하는 방법', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&q=80', href: '/category/exchange' },
              { title: '야후옥션 입찰 가이드', desc: '처음 시작하는 일본 경매', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80', href: '/category/proxy' },
            ].map((topic) => (
              <Link key={topic.title} href={topic.href}>
                <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md hover:border-[#4db6ac] transition-all cursor-pointer group">
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={topic.image}
                      alt={topic.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="font-medium text-gray-900 mb-1 group-hover:text-[#4db6ac] transition-colors">{topic.title}</div>
                    <div className="text-sm text-gray-500">{topic.desc}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 최신 포스트 */}
      <section className="py-8 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">최신 정보</h2>
            <Link href="/category/all" className="text-sm text-[#4db6ac] hover:text-[#00897b] font-medium">
              전체 보기 →
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200">
              <div className="text-4xl mb-3">📦</div>
              <p className="text-gray-500">아직 포스트가 없습니다</p>
              <p className="text-gray-400 text-sm mt-1">곧 유용한 정보로 찾아뵙겠습니다</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 광고 배너 */}
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="bg-gray-100 rounded-xl p-4 text-center text-gray-400 text-sm">
          <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot="XXXXXXXXXX"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
        </div>
      </div>

      {/* CTA - 비드바이 링크 */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gradient-to-r from-[#4db6ac] to-[#00897b] rounded-2xl p-8 text-center text-white">
            <h2 className="text-xl font-bold mb-2">
              일본 직구, 어렵지 않아요!
            </h2>
            <p className="text-green-100 mb-6 text-sm">
              야후옥션, 메루카리, 라쿠텐까지 - 비드바이가 대신 구매해 드립니다
            </p>
            <a
              href="https://bidbuy.co.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-white text-[#00897b] rounded-lg font-medium hover:bg-green-50 transition-colors"
            >
              비드바이 바로가기 →
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const posts = await getPublishedPosts(6, 0);
    return {
      props: { posts },
      revalidate: 60,
    };
  } catch (error) {
    console.error('포스트 조회 실패:', error);
    return {
      props: { posts: [] },
      revalidate: 60,
    };
  }
}
