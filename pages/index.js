// pages/index.js
// 보담 - 메인 홈페이지

import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import Link from 'next/link';
import { getPublishedPosts } from '../lib/db';
import { categories } from '../lib/categories';

export default function Home({ posts }) {
  return (
    <Layout>
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              보험사가 알려주지 않는<br />
              <span className="text-emerald-200">진짜 보험 이야기</span>
            </h1>
            <p className="text-lg md:text-xl text-emerald-100 mb-8">
              손해사정사가 직접 알려주는 보험금 청구의 모든 것.<br />
              거절당한 보험금, 제대로 받는 방법을 알려드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-lg">
                  무료 상담 신청
                </button>
              </Link>
              <Link href="/category/cases">
                <button className="px-8 py-4 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-400 transition-colors border-2 border-emerald-400">
                  성공 사례 보기
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 신뢰 지표 */}
      <section className="bg-white py-8 border-b">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-600">500+</div>
              <div className="text-gray-600 text-sm">상담 사례</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600">92%</div>
              <div className="text-gray-600 text-sm">청구 성공률</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600">15년</div>
              <div className="text-gray-600 text-sm">업계 경력</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600">24시간</div>
              <div className="text-gray-600 text-sm">상담 응대</div>
            </div>
          </div>
        </div>
      </section>

      {/* 광고 배너 자리 (애드센스) */}
      <div className="container-custom py-4">
        <div className="ad-banner bg-gray-100 rounded-lg p-4 text-center text-gray-400 text-sm">
          {/* 구글 애드센스 코드 삽입 위치 */}
          <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot="XXXXXXXXXX"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
          <span className="block mt-2">[광고 영역]</span>
        </div>
      </div>

      {/* 카테고리 퀵링크 */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-center mb-8">어떤 보험 정보가 필요하세요?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.filter(c => c.id !== 'all').slice(0, 8).map((cat) => (
              <Link key={cat.id} href={`/category/${cat.slug}`}>
                <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer border hover:border-emerald-300">
                  <div className="text-3xl mb-2">{cat.icon}</div>
                  <div className="font-semibold text-gray-800">{cat.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{cat.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 최신 포스트 */}
      <section className="py-12">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">최신 보험 정보</h2>
            <Link href="/category/all" className="text-emerald-600 hover:text-emerald-700 font-medium">
              전체 보기 →
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-500 text-lg">아직 포스트가 없습니다.</p>
              <p className="text-gray-400">곧 유용한 보험 정보로 찾아뵙겠습니다!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 중간 광고 배너 */}
      <div className="container-custom py-4">
        <div className="ad-banner bg-gray-100 rounded-lg p-4 text-center text-gray-400 text-sm">
          <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot="XXXXXXXXXX"
            data-ad-format="horizontal"
            data-full-width-responsive="true"></ins>
          <span className="block mt-2">[광고 영역]</span>
        </div>
      </div>

      {/* CTA 섹션 */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">보험금 청구, 혼자 고민하지 마세요</h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            거절당한 보험금, 적정 금액인지 모르겠는 보상금<br />
            손해사정사가 무료로 검토해드립니다.
          </p>
          <Link href="/contact">
            <button className="px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-lg">
              무료 상담 신청하기
            </button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const posts = await getPublishedPosts(9, 0);
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
