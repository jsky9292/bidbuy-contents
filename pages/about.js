// pages/about.js
// 토스/뱅크샐러드 스타일 소개 페이지

import Layout from '../components/Layout';
import Link from 'next/link';

export default function About() {
  return (
    <Layout title="소개" description="보담 - 손해사정사가 직접 운영하는 보험 정보 블로그입니다.">
      <div className="max-w-2xl mx-auto px-4 py-12 md:py-16">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">보</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">보담</h1>
          <p className="text-gray-500">보험을 담다, 당신의 권리를 담다</p>
        </div>

        {/* 소개 */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">왜 보담인가요?</h2>
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>
                보험금 청구, 어렵고 복잡하게 느껴지시나요?<br />
                보험사에서 제시하는 금액이 적정한지 모르겠나요?<br />
                거절당한 보험금, 정말 받을 수 없는 걸까요?
              </p>
              <p>
                <strong className="text-gray-900">보담</strong>은 현직 손해사정사가 직접 운영하는 보험 정보 블로그입니다.
                15년 이상의 실무 경험을 바탕으로, 보험사가 알려주지 않는 정보를 제공합니다.
              </p>
              <p>
                인터넷의 많은 보험 정보 중 상당수는 부정확하거나, 실제 청구에 도움이 되지 않습니다.
                보담은 <strong className="text-gray-900">고객 입장</strong>에서,
                <strong className="text-gray-900"> 실전에서 통하는</strong> 정보만 전달합니다.
              </p>
            </div>
          </div>

          {/* 차별점 */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">보담의 차별점</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-medium text-gray-900 mb-1 text-sm">전문 자격</h3>
                <p className="text-xs text-gray-500">
                  손해사정사 자격 보유 전문가가 직접 작성
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-medium text-gray-900 mb-1 text-sm">실무 경험</h3>
                <p className="text-xs text-gray-500">
                  수천 건의 보험금 청구 사례 처리 경험
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-medium text-gray-900 mb-1 text-sm">고객 편</h3>
                <p className="text-xs text-gray-500">
                  보험사가 아닌 고객 입장에서 정보 제공
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-medium text-gray-900 mb-1 text-sm">실제 사례</h3>
                <p className="text-xs text-gray-500">
                  이론이 아닌 실제 청구 성공 사례 공개
                </p>
              </div>
            </div>
          </div>

          {/* 서비스 */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">제공 서비스</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 border border-gray-100 rounded-xl">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">보험 정보 콘텐츠</h3>
                  <p className="text-xs text-gray-500">각종 보험 청구 노하우와 정보</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border border-gray-100 rounded-xl">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">보험금 자가진단</h3>
                  <p className="text-xs text-gray-500">간단한 퀴즈로 내 보험금 상황 진단</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border border-gray-100 rounded-xl">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">무료 상담</h3>
                  <p className="text-xs text-gray-500">손해사정사의 무료 보험금 검토</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gray-900 rounded-2xl p-6 text-center text-white">
            <h2 className="font-semibold mb-2">보험금 고민, 혼자 해결하지 마세요</h2>
            <p className="text-sm text-gray-400 mb-5">
              무료 상담으로 정확한 보험금 검토를 받아보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact">
                <button className="w-full sm:w-auto px-6 py-2.5 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm">
                  무료 상담 신청
                </button>
              </Link>
              <Link href="/quiz">
                <button className="w-full sm:w-auto px-6 py-2.5 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors text-sm">
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
