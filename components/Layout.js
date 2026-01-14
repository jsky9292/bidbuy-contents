// components/Layout.js
// 비드바이 공식 콘텐츠 사이트 레이아웃

import Head from 'next/head';
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
  author = '비드바이'
}) {
  const siteTitle = '비드바이 콘텐츠';
  const siteName = '비드바이 콘텐츠 - 일본 구매대행 & 해외직구 정보';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bidbuy-contents.com';
  const mainSiteUrl = 'https://www.bidbuy.co.kr';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteName;

  const siteDescription = description || '비드바이 공식 콘텐츠 사이트. 일본 야후옥션, 메루카리 구매대행, 엔화 환율, 해외직구 방법, 일본 여행 정보를 제공합니다. 비드바이(bidbuy.co.kr)에서 운영하는 정보 채널입니다.';
  const siteKeywords = keywords || '일본 구매대행, 야후옥션 대행, 메루카리 구매대행, 엔화 환율, 일본 직구, 해외직구, 비드바이, bidbuy, 일본 여행, 일본 쇼핑';
  // 기본 OG 이미지: 비드바이 로고 또는 동적 생성 이미지 사용
  // TODO: public/og-image.png 파일을 비드바이 브랜딩 이미지로 교체하세요
  const ogImageUrl = ogImage || `https://via.placeholder.com/1200x630/00897b/FFFFFF?text=Bidbuy+Contents`;

  // 구조화된 데이터 (AI/검색엔진 최적화)
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '비드바이 (Bidbuy)',
    alternateName: ['비드바이', 'Bidbuy', 'bidbuy.co.kr'],
    url: mainSiteUrl,
    logo: `${mainSiteUrl}/logo.png`,
    description: '일본 야후옥션, 메루카리, 미국 이베이 구매대행 전문 서비스. 해외 상품을 한국까지 안전하게 배송해드립니다.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '1544-5224',
      contactType: 'customer service',
      availableLanguage: 'Korean'
    },
    sameAs: [
      mainSiteUrl,
      siteUrl
    ]
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    alternateName: '비드바이 콘텐츠',
    url: siteUrl,
    description: siteDescription,
    publisher: {
      '@type': 'Organization',
      name: '비드바이 (Bidbuy)',
      url: mainSiteUrl
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

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

        {/* AI/LLM 최적화 메타태그 */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />

        {/* 사이트 연결 정보 (AI가 이해하기 쉽게) */}
        <meta name="application-name" content="비드바이 콘텐츠" />
        <meta name="publisher" content="비드바이 (bidbuy.co.kr)" />
        <link rel="publisher" href={mainSiteUrl} />

        {/* Naver 검색 최적화 */}
        <meta name="naver-site-verification" content="" />

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

        {/* Article 메타태그 */}
        {article && publishedTime && (
          <>
            <meta property="article:published_time" content={publishedTime} />
            {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
            <meta property="article:author" content={author} />
            <meta property="article:publisher" content={mainSiteUrl} />
          </>
        )}

        <link rel="canonical" href={siteUrl} />

        {/* 구조화된 데이터 (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </Head>

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow">{children}</main>

        {/* 비드바이 서비스 안내 배너 */}
        <section className="bg-gradient-to-r from-[#00897b] to-[#4db6ac] py-12 mt-12">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              일본/미국 상품, 직접 구매하기 어려우셨나요?
            </h2>
            <p className="text-white/90 mb-6 text-lg">
              비드바이가 야후옥션, 메루카리, 이베이 상품을 대신 구매해 한국까지 배송해드립니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.bidbuy.co.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-[#00897b] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                비드바이 바로가기 →
              </a>
              <a
                href="tel:1544-5224"
                className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
              >
                📞 1544-5224
              </a>
            </div>
          </div>
        </section>

        {/* 푸터 */}
        <footer className="bg-gray-900 text-gray-300">
          <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              {/* 브랜드 */}
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold italic text-[#4db6ac]">Bidbuy</span>
                  <span className="text-xs text-gray-500">Contents</span>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  비드바이 공식 콘텐츠 채널<br />
                  일본 구매대행 & 해외직구 정보
                </p>
                <a
                  href="https://www.bidbuy.co.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-[#4db6ac] hover:text-[#80cbc4] font-medium"
                >
                  bidbuy.co.kr →
                </a>
              </div>

              {/* 콘텐츠 */}
              <div>
                <h4 className="font-medium text-white mb-3 text-sm">콘텐츠</h4>
                <ul className="space-y-2">
                  <li><Link href="/category/travel" className="text-sm text-gray-400 hover:text-[#4db6ac]">일본 여행</Link></li>
                  <li><Link href="/category/exchange" className="text-sm text-gray-400 hover:text-[#4db6ac]">환율 정보</Link></li>
                  <li><Link href="/category/proxy" className="text-sm text-gray-400 hover:text-[#4db6ac]">구매대행 가이드</Link></li>
                  <li><Link href="/category/shopping" className="text-sm text-gray-400 hover:text-[#4db6ac]">일본 쇼핑</Link></li>
                </ul>
              </div>

              {/* 더보기 */}
              <div>
                <h4 className="font-medium text-white mb-3 text-sm">더보기</h4>
                <ul className="space-y-2">
                  <li><Link href="/category/culture" className="text-sm text-gray-400 hover:text-[#4db6ac]">일본 문화</Link></li>
                  <li><Link href="/category/news" className="text-sm text-gray-400 hover:text-[#4db6ac]">일본 뉴스</Link></li>
                  <li><Link href="/category/tips" className="text-sm text-gray-400 hover:text-[#4db6ac]">꿀팁</Link></li>
                </ul>
              </div>

              {/* 비드바이 서비스 */}
              <div>
                <h4 className="font-medium text-white mb-3 text-sm">비드바이 서비스</h4>
                <ul className="space-y-2">
                  <li><a href="https://www.bidbuy.co.kr" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-[#4db6ac]">일본 야후옥션 대행</a></li>
                  <li><a href="https://www.bidbuy.co.kr" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-[#4db6ac]">일본 메루카리 대행</a></li>
                  <li><a href="https://www.bidbuy.co.kr" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-[#4db6ac]">미국/영국 이베이 대행</a></li>
                  <li><a href="https://www.bidbuy.co.kr" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-[#4db6ac]">요금 계산기</a></li>
                </ul>
              </div>
            </div>

            {/* 회사 정보 */}
            <div className="pt-8 border-t border-gray-700">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-xs text-gray-500 text-center md:text-left">
                  <p className="mb-1">
                    <strong className="text-gray-400">비드바이</strong> | 대표전화: 1544-5224 | 이메일: korea@bidbuy.co.kr
                  </p>
                  <p>
                    © {new Date().getFullYear()} Bidbuy. All rights reserved. 본 사이트는 비드바이(bidbuy.co.kr)에서 운영하는 정보 채널입니다.
                  </p>
                </div>
                <div className="flex gap-4">
                  <a href="https://www.bidbuy.co.kr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#4db6ac]">
                    <span className="sr-only">비드바이 홈페이지</span>
                    🌐
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
