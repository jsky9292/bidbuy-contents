// components/Navbar.js
// 보담 - 메인 네비게이션 바

import Link from 'next/link';
import { useState } from 'react';
import { categories } from '../lib/categories';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b-2 border-emerald-500">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <Link href="/">
            <div className="flex items-center cursor-pointer gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">보</span>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-800">보담</span>
                <span className="text-xs text-gray-500 block -mt-1">손해사정사의 보험 이야기</span>
              </div>
            </div>
          </Link>

          {/* 데스크톱 메뉴 */}
          <div className="hidden md:flex items-center space-x-1">
            {categories.slice(0, 6).map((category) => (
              <Link
                key={category.id}
                href={category.id === 'all' ? '/' : `/category/${category.slug}`}
              >
                <span className="px-3 py-2 rounded-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors cursor-pointer font-medium text-sm">
                  {category.icon} {category.name}
                </span>
              </Link>
            ))}
            {/* 더보기 드롭다운 */}
            <div className="relative group">
              <span className="px-3 py-2 rounded-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors cursor-pointer font-medium text-sm">
                더보기 ▾
              </span>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {categories.slice(6).map((category) => (
                  <Link key={category.id} href={`/category/${category.slug}`}>
                    <div className="px-4 py-3 hover:bg-emerald-50 text-gray-700 hover:text-emerald-600 cursor-pointer text-sm first:rounded-t-lg last:rounded-b-lg">
                      {category.icon} {category.name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* 상담 버튼 (데스크톱) */}
          <Link href="/contact" className="hidden md:block">
            <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium text-sm">
              무료상담
            </button>
          </Link>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container-custom py-4 space-y-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.id === 'all' ? '/' : `/category/${category.slug}`}
              >
                <div
                  className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.icon} {category.name}
                </div>
              </Link>
            ))}
            <Link href="/contact">
              <div
                className="block px-4 py-3 rounded-lg bg-emerald-500 text-white text-center font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                무료상담 신청
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
