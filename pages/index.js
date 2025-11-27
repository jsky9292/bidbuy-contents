// pages/index.js
// 보담 - 토스/뱅크샐러드 스타일 메인 홈페이지

import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import Link from 'next/link';
import { getPublishedPosts } from '../lib/db';

export default function Home({ posts }) {
  return (
    <Layout>
      {/* 히어로 섹션 - 미니멀 */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              보험사가 알려주지 않는<br />
              보험금 청구의 모든 것
            </h1>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              손해사정사가 직접 알려드립니다.<br className="hidden sm:block" />
              거절당한 보험금, 제대로 받는 방법.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact">
                <button className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors">
                  무료 상담 신청
                </button>
              </Link>
              <Link href="/quiz">
                <button className="w-full sm:w-auto px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                  보험금 자가진단
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 신뢰 지표 - 심플 카드 */}
      <section className="py-8 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-500 mt-1">상담 사례</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">92%</div>
              <div className="text-sm text-gray-500 mt-1">청구 성공률</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">15년</div>
              <div className="text-sm text-gray-500 mt-1">업계 경력</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">24h</div>
              <div className="text-sm text-gray-500 mt-1">빠른 응답</div>
            </div>
          </div>
        </div>
      </section>

      {/* 카테고리 카드 */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-6">어떤 보험이 궁금하세요?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { name: '자동차보험', desc: '사고 합의금, 과실 비율', href: '/category/auto' },
              { name: '실손보험', desc: '의료비 청구, 거절 대응', href: '/category/health' },
              { name: '생명/건강보험', desc: '진단비, 수술비, 후유장해', href: '/category/life' },
              { name: '재물/화재보험', desc: '화재, 도난, 배상책임', href: '/category/property' },
            ].map((cat) => (
              <Link key={cat.name} href={cat.href}>
                <div className="bg-white rounded-2xl p-5 hover:shadow-md transition-all cursor-pointer border border-gray-100 h-full">
                  <div className="font-semibold text-gray-900 mb-1">{cat.name}</div>
                  <div className="text-sm text-gray-500">{cat.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 인기 콘텐츠 */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">최신 보험 정보</h2>
            <Link href="/category/all" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              전체 보기
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <p className="text-gray-500">아직 포스트가 없습니다.</p>
              <p className="text-gray-400 text-sm mt-1">곧 유용한 보험 정보로 찾아뵙겠습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 광고 배너 (애드센스) */}
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="bg-gray-50 rounded-xl p-4 text-center text-gray-400 text-sm border border-gray-100">
          <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot="XXXXXXXXXX"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
        </div>
      </div>

      {/* 자주 묻는 질문 */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-6">자주 묻는 질문</h2>
          <div className="space-y-3">
            {[
              { q: '손해사정사 상담 비용이 있나요?', a: '초기 상담과 보험금 검토는 무료입니다. 실제 손해사정 업무 진행 시에만 성공 보수가 발생합니다.' },
              { q: '보험사에서 거절한 보험금도 받을 수 있나요?', a: '거절 사유에 따라 다르지만, 상당수의 거절 건이 재검토를 통해 보험금을 받을 수 있습니다.' },
              { q: '상담은 어떻게 진행되나요?', a: '상담 신청 후 24시간 내 전화로 연락드립니다. 서류 검토 후 청구 가능 여부와 예상 금액을 안내해드립니다.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="font-medium text-gray-900 mb-2">{item.q}</div>
                <div className="text-sm text-gray-500 leading-relaxed">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            보험금 청구, 혼자 고민하지 마세요
          </h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            거절당한 보험금, 적정 금액인지 모르겠는 보상금<br />
            손해사정사가 무료로 검토해드립니다.
          </p>
          <Link href="/contact">
            <button className="px-8 py-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors">
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
