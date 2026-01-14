// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        {/* Google Search Console 소유권 확인 */}
        <meta name="google-site-verification" content="bm18zpPy21dTL72CRiWiAzPfodrH0lCB6pFAEkn-xKE" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
