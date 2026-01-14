// components/Navbar.js
// 비드바이 스타일 네비게이션

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: '일본여행', href: '/category/travel' },
    { name: '환율정보', href: '/category/exchange' },
    { name: '구매대행', href: '/category/proxy' },
    { name: '일본쇼핑', href: '/category/shopping' },
    { name: '일본문화', href: '/category/culture' },
  ];

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold italic text-[#4db6ac]">Bidbuy</span>
            <span className="text-xs text-gray-400 hidden sm:block">콘텐츠</span>
          </Link>

          {/* 본사이트 링크 */}
          <a
            href="https://www.bidbuy.co.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1 text-xs text-gray-500 hover:text-[#00897b] ml-2 px-2 py-1 border border-gray-200 rounded-full"
          >
            <span>구매대행 바로가기</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          {/* 검색바 (데스크톱) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="검색어를 입력해 주세요."
                className="w-full px-4 py-2 border-2 border-[#4db6ac] rounded-full text-sm focus:outline-none focus:border-[#00897b]"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4db6ac]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* 우측 아이콘들 */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/contact" className="text-gray-600 hover:text-[#4db6ac]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
            <Link href="/calculator" className="text-gray-600 hover:text-[#4db6ac]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </Link>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="md:hidden p-2 -mr-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="메뉴"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* 카테고리 메뉴 (데스크톱) */}
        <div className="hidden md:flex items-center gap-1 py-2 border-t border-gray-100">
          <button className="p-2 text-gray-600 hover:text-[#4db6ac]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#4db6ac] transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          {/* 모바일 검색바 */}
          <div className="px-4 py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="검색어를 입력해 주세요."
                className="w-full px-4 py-2 border-2 border-[#4db6ac] rounded-full text-sm focus:outline-none"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4db6ac]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="px-4 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2.5 text-gray-700 hover:bg-[#e0f2f1] hover:text-[#4db6ac] rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 border-t mt-2 space-y-2">
              <a
                href="https://www.bidbuy.co.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2.5 bg-[#00897b] text-white text-center rounded-lg font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                비드바이 구매대행 바로가기 →
              </a>
              <a
                href="tel:1544-5224"
                className="block px-3 py-2.5 bg-gray-100 text-gray-700 text-center rounded-lg font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                📞 1544-5224
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
