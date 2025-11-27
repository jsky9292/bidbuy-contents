// components/Layout.js
// 보담 - 공통 레이아웃 컴포넌트

import Head from 'next/head';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Link from 'next/link';

export default function Layout({
  children,
  title,
  description,
  keywords,
  ogImage,
  article = false,
  publishedTime,
  modifiedTime,
  author = '보담'
}) {
  const siteTitle = '보담';
  const siteName = '보담 - 손해사정사의 보험 이야기';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourblog.com';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteName;

  const siteDescription = description || '손해사정사가 직접 알려주는 보험금 청구의 모든 것. 보험사가 알려주지 않는 실전 노하우, 성공 사례, 거절 대응법까지.';
  const siteKeywords = keywords || '보험금 청구, 손해사정사, 자동차보험, 실손보험, 보험금, 보험 분쟁, 금감원 민원';
  const ogImageUrl = ogImage || `${siteUrl}/og-image.png`;

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content={siteKeywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="author" content={author} />

        {/* Open Graph */}
        <meta property="og:type" content={article ? 'article' : 'website'} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:locale" content="ko_KR" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={ogImageUrl} />

        {article && publishedTime && (
          <>
            <meta property="article:published_time" content={publishedTime} />
            {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
            <meta property="article:author" content={author} />
          </>
        )}

        <link rel="canonical" href={siteUrl} />
      </Head>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': article ? 'BlogPosting' : 'WebSite',
            name: fullTitle,
            description: siteDescription,
            url: siteUrl,
            ...(article && {
              headline: title,
              datePublished: publishedTime,
              dateModified: modifiedTime || publishedTime,
              author: { '@type': 'Person', name: author },
              publisher: {
                '@type': 'Organization',
                name: siteName,
                logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` }
              },
              image: ogImageUrl
            })
          })
        }}
      />

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow">{children}</main>

        {/* 푸터 */}
        <footer className="bg-gray-900 text-white mt-16">
          <div className="container-custom py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* 브랜드 */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">보</span>
                  </div>
                  <span className="text-xl font-bold">보담</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  손해사정사가 직접 알려주는<br />
                  보험금 청구의 모든 것
                </p>
              </div>

              {/* 카테고리 */}
              <div>
                <h4 className="font-semibold mb-4 text-emerald-400">보험 정보</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/category/auto" className="text-gray-400 hover:text-emerald-400 transition-colors">자동차보험</Link></li>
                  <li><Link href="/category/health" className="text-gray-400 hover:text-emerald-400 transition-colors">실손보험</Link></li>
                  <li><Link href="/category/life" className="text-gray-400 hover:text-emerald-400 transition-colors">생명/건강보험</Link></li>
                  <li><Link href="/category/property" className="text-gray-400 hover:text-emerald-400 transition-colors">재물/화재보험</Link></li>
                </ul>
              </div>

              {/* 서비스 */}
              <div>
                <h4 className="font-semibold mb-4 text-emerald-400">서비스</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/category/dispute" className="text-gray-400 hover:text-emerald-400 transition-colors">분쟁해결 가이드</Link></li>
                  <li><Link href="/category/cases" className="text-gray-400 hover:text-emerald-400 transition-colors">실제 사례</Link></li>
                  <li><Link href="/category/tools" className="text-gray-400 hover:text-emerald-400 transition-colors">보험금 진단</Link></li>
                  <li><Link href="/contact" className="text-gray-400 hover:text-emerald-400 transition-colors">무료 상담</Link></li>
                </ul>
              </div>

              {/* 법적 고지 */}
              <div>
                <h4 className="font-semibold mb-4 text-emerald-400">정보</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/about" className="text-gray-400 hover:text-emerald-400 transition-colors">소개</Link></li>
                  <li><Link href="/privacy" className="text-gray-400 hover:text-emerald-400 transition-colors">개인정보처리방침</Link></li>
                  <li><Link href="/terms" className="text-gray-400 hover:text-emerald-400 transition-colors">이용약관</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} 보담. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs">
                  본 사이트의 정보는 참고용이며, 구체적인 사안은 전문가 상담을 권장합니다.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
