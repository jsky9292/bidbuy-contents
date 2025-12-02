// components/Layout.js
// 비드바이 스타일 레이아웃

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
  author = 'Bidbuy'
}) {
  const siteTitle = 'Bidbuy';
  const siteName = 'Bidbuy - 일본 여행, 쇼핑, 문화 정보 블로그';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bidbuy.co.kr';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteName;

  const siteDescription = description || '일본 여행, 쇼핑, 환율, 문화까지! 유용한 일본 정보를 한곳에서 만나보세요.';
  const siteKeywords = keywords || '일본여행, 일본쇼핑, 엔화환율, 일본문화, 구매대행, 비드바이';
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

        <meta property="og:type" content={article ? 'article' : 'website'} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:locale" content="ko_KR" />

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

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow">{children}</main>

        {/* 푸터 */}
        <footer className="bg-gray-50 border-t mt-12">
          <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              {/* 브랜드 */}
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl font-bold italic text-[#4db6ac]">Bidbuy</span>
                </div>
                <p className="text-sm text-gray-500">
                  Japan Contents<br />
                  일본 정보 블로그
                </p>
              </div>

              {/* 일본 여행 */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 text-sm">일본 여행</h4>
                <ul className="space-y-2">
                  <li><Link href="/category/travel" className="text-sm text-gray-500 hover:text-[#4db6ac]">여행 정보</Link></li>
                  <li><Link href="/category/culture" className="text-sm text-gray-500 hover:text-[#4db6ac]">일본 문화</Link></li>
                  <li><Link href="/category/tips" className="text-sm text-gray-500 hover:text-[#4db6ac]">여행 꿀팁</Link></li>
                </ul>
              </div>

              {/* 쇼핑 & 환율 */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 text-sm">쇼핑 & 환율</h4>
                <ul className="space-y-2">
                  <li><Link href="/category/shopping" className="text-sm text-gray-500 hover:text-[#4db6ac]">일본 쇼핑</Link></li>
                  <li><Link href="/category/proxy" className="text-sm text-gray-500 hover:text-[#4db6ac]">구매대행 정보</Link></li>
                  <li><Link href="/category/exchange" className="text-sm text-gray-500 hover:text-[#4db6ac]">환율 정보</Link></li>
                </ul>
              </div>

              {/* 비드바이 */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 text-sm">비드바이</h4>
                <ul className="space-y-2">
                  <li><a href="https://bidbuy.co.kr" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-[#4db6ac]">구매대행 신청</a></li>
                  <li><Link href="/category/news" className="text-sm text-gray-500 hover:text-[#4db6ac]">일본 뉴스</Link></li>
                  <li><Link href="/category/all" className="text-sm text-gray-500 hover:text-[#4db6ac]">전체 글 보기</Link></li>
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t text-center">
              <p className="text-xs text-gray-400">
                © {new Date().getFullYear()} Bidbuy. All rights reserved. 본 사이트의 정보는 참고용입니다.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
