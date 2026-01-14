// pages/about.js
// 비드바이 콘텐츠 소개 페이지

import Layout from '../components/Layout';
import Link from 'next/link';

export default function About() {
  return (
    <Layout title="소개" description="비드바이 콘텐츠 - 일본 구매대행 전문 비드바이에서 운영하는 정보 채널입니다.">
      <div className="max-w-2xl mx-auto px-4 py-12 md:py-16">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-[#00897b] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl italic">B</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">비드바이 콘텐츠</h1>
          <p className="text-gray-500">일본 구매대행 & 해외직구 정보 채널</p>
        </div>

        {/* 소개 */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">비드바이 콘텐츠란?</h2>
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>
                일본 상품 구매, 어렵고 복잡하게 느껴지시나요?<br />
                야후옥션, 메루카리에서 원하는 상품을 찾았는데 어떻게 구매해야 할지 모르겠나요?<br />
                해외직구 배송비와 관세, 제대로 알고 계신가요?
              </p>
              <p>
                <strong className="text-gray-900">비드바이 콘텐츠</strong>는
                일본 구매대행 전문 기업 <strong className="text-[#00897b]">비드바이(bidbuy.co.kr)</strong>에서
                운영하는 공식 정보 채널입니다.
              </p>
              <p>
                10년 이상의 구매대행 경험을 바탕으로, 일본 여행 정보, 환율 동향,
                해외직구 가이드, 일본 문화 소식 등 유용한 정보를 제공합니다.
              </p>
            </div>
          </div>

          {/* 비드바이 서비스 */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">비드바이 서비스</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#e0f2f1] rounded-xl">
                <h3 className="font-medium text-gray-900 mb-1 text-sm">🇯🇵 일본 야후옥션</h3>
                <p className="text-xs text-gray-500">
                  일본 최대 경매 사이트 대행
                </p>
              </div>
              <div className="p-4 bg-[#e0f2f1] rounded-xl">
                <h3 className="font-medium text-gray-900 mb-1 text-sm">📱 메루카리 대행</h3>
                <p className="text-xs text-gray-500">
                  일본 중고거래 앱 구매 대행
                </p>
              </div>
              <div className="p-4 bg-[#e0f2f1] rounded-xl">
                <h3 className="font-medium text-gray-900 mb-1 text-sm">🇺🇸 미국/영국 이베이</h3>
                <p className="text-xs text-gray-500">
                  글로벌 이베이 구매 대행
                </p>
              </div>
              <div className="p-4 bg-[#e0f2f1] rounded-xl">
                <h3 className="font-medium text-gray-900 mb-1 text-sm">📦 안전 배송</h3>
                <p className="text-xs text-gray-500">
                  검수 후 한국까지 안전 배송
                </p>
              </div>
            </div>
          </div>

          {/* 콘텐츠 카테고리 */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">제공 콘텐츠</h2>
            <div className="space-y-3">
              <Link href="/category/travel" className="flex items-start gap-3 p-3 border border-gray-100 rounded-xl hover:border-[#4db6ac] transition-colors">
                <div className="w-8 h-8 bg-[#e0f2f1] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">✈️</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">일본 여행 정보</h3>
                  <p className="text-xs text-gray-500">오사카, 도쿄, 교토 등 일본 여행 가이드</p>
                </div>
              </Link>
              <Link href="/category/exchange" className="flex items-start gap-3 p-3 border border-gray-100 rounded-xl hover:border-[#4db6ac] transition-colors">
                <div className="w-8 h-8 bg-[#e0f2f1] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">💴</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">환율 정보</h3>
                  <p className="text-xs text-gray-500">엔화/달러 환율 동향과 환전 꿀팁</p>
                </div>
              </Link>
              <Link href="/category/proxy" className="flex items-start gap-3 p-3 border border-gray-100 rounded-xl hover:border-[#4db6ac] transition-colors">
                <div className="w-8 h-8 bg-[#e0f2f1] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">🛒</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">구매대행 가이드</h3>
                  <p className="text-xs text-gray-500">야후옥션, 메루카리 이용 가이드</p>
                </div>
              </Link>
              <Link href="/category/shopping" className="flex items-start gap-3 p-3 border border-gray-100 rounded-xl hover:border-[#4db6ac] transition-colors">
                <div className="w-8 h-8 bg-[#e0f2f1] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">🛍️</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">일본 쇼핑</h3>
                  <p className="text-xs text-gray-500">일본 인기 상품과 쇼핑 정보</p>
                </div>
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#00897b] to-[#4db6ac] rounded-2xl p-6 text-center text-white">
            <h2 className="font-semibold mb-2">일본/미국 상품, 비드바이가 대신 구매해드립니다</h2>
            <p className="text-sm text-white/80 mb-5">
              야후옥션, 메루카리, 이베이 상품을 한국까지 안전하게 배송!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://www.bidbuy.co.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 bg-white text-[#00897b] rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm"
              >
                비드바이 바로가기 →
              </a>
              <a
                href="tel:1544-5224"
                className="w-full sm:w-auto px-6 py-2.5 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-colors text-sm"
              >
                📞 1544-5224
              </a>
            </div>
          </div>

          {/* 회사 정보 */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h2 className="font-semibold text-gray-900 mb-4">비드바이 회사 정보</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong className="text-gray-900">상호:</strong> 비드바이 (Bidbuy)</p>
              <p><strong className="text-gray-900">대표 서비스:</strong> 일본/미국 구매대행</p>
              <p><strong className="text-gray-900">고객센터:</strong> 1544-5224</p>
              <p><strong className="text-gray-900">이메일:</strong> korea@bidbuy.co.kr</p>
              <p><strong className="text-gray-900">홈페이지:</strong> <a href="https://www.bidbuy.co.kr" target="_blank" rel="noopener noreferrer" className="text-[#00897b] hover:underline">www.bidbuy.co.kr</a></p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
