// pages/about.js
// 보담 - 소개 페이지

import Layout from '../components/Layout';
import Link from 'next/link';

export default function About() {
  return (
    <Layout title="소개" description="보담 - 손해사정사가 직접 운영하는 보험 정보 블로그입니다.">
      <div className="container-custom py-12">
        {/* 히어로 */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-4xl">보</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">보담</h1>
          <p className="text-xl text-gray-600">
            보험을 담다, 당신의 권리를 담다
          </p>
        </div>

        {/* 소개 */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
            <h2 className="text-2xl font-bold mb-6">왜 보담인가요?</h2>

            <div className="space-y-6 text-gray-600">
              <p>
                보험금 청구, 어렵고 복잡하게 느껴지시나요?<br />
                보험사에서 제시하는 금액이 적정한지 모르겠나요?<br />
                거절당한 보험금, 정말 받을 수 없는 걸까요?
              </p>

              <p>
                <strong className="text-gray-800">보담</strong>은 현직 손해사정사가 직접 운영하는 보험 정보 블로그입니다.
                15년 이상의 손해사정 실무 경험을 바탕으로, 보험사가 알려주지 않는 진짜 정보를 제공합니다.
              </p>

              <p>
                인터넷에 넘쳐나는 보험 정보 중 상당수는 부정확하거나, 보험사 편향적이거나,
                실제 청구에 도움이 되지 않는 내용입니다.
                보담은 <strong className="text-emerald-600">고객 입장</strong>에서,
                <strong className="text-emerald-600">실전에서 통하는</strong> 정보만 전달합니다.
              </p>
            </div>
          </div>

          {/* 차별점 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
            <h2 className="text-2xl font-bold mb-6">보담의 차별점</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-emerald-50 rounded-xl">
                <div className="text-3xl mb-3">🎓</div>
                <h3 className="font-bold mb-2">전문 자격</h3>
                <p className="text-sm text-gray-600">
                  손해사정사 자격을 보유한 전문가가 직접 작성합니다.
                  법적 문제 없이 정확한 정보를 제공합니다.
                </p>
              </div>

              <div className="p-6 bg-emerald-50 rounded-xl">
                <div className="text-3xl mb-3">💼</div>
                <h3 className="font-bold mb-2">실무 경험</h3>
                <p className="text-sm text-gray-600">
                  수천 건의 보험금 청구 사례를 직접 처리한 경험을 바탕으로 합니다.
                </p>
              </div>

              <div className="p-6 bg-emerald-50 rounded-xl">
                <div className="text-3xl mb-3">👥</div>
                <h3 className="font-bold mb-2">고객 편</h3>
                <p className="text-sm text-gray-600">
                  보험사가 아닌, 보험금을 청구하는 고객의 입장에서 정보를 제공합니다.
                </p>
              </div>

              <div className="p-6 bg-emerald-50 rounded-xl">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-bold mb-2">실제 사례</h3>
                <p className="text-sm text-gray-600">
                  이론이 아닌 실제 청구 성공 사례와 금액을 공개합니다.
                </p>
              </div>
            </div>
          </div>

          {/* 서비스 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
            <h2 className="text-2xl font-bold mb-6">제공 서비스</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 border rounded-xl">
                <div className="text-2xl">📝</div>
                <div>
                  <h3 className="font-bold">보험 정보 콘텐츠</h3>
                  <p className="text-sm text-gray-600">
                    자동차보험, 실손보험, 생명보험, 화재보험 등 각종 보험 청구 노하우
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border rounded-xl">
                <div className="text-2xl">📊</div>
                <div>
                  <h3 className="font-bold">보험금 자가진단</h3>
                  <p className="text-sm text-gray-600">
                    간단한 퀴즈로 내 보험금 상황 진단받기
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border rounded-xl">
                <div className="text-2xl">📞</div>
                <div>
                  <h3 className="font-bold">무료 상담</h3>
                  <p className="text-sm text-gray-600">
                    손해사정사의 무료 보험금 검토 및 상담 서비스
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">보험금 고민, 혼자 해결하지 마세요</h2>
            <p className="mb-6 text-emerald-100">
              무료 상담으로 정확한 보험금 검토를 받아보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="px-8 py-3 bg-white text-emerald-600 rounded-xl font-bold hover:bg-emerald-50 transition-colors">
                  무료 상담 신청
                </button>
              </Link>
              <Link href="/quiz">
                <button className="px-8 py-3 bg-emerald-400 text-white rounded-xl font-bold hover:bg-emerald-300 transition-colors">
                  보험금 자가진단
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
