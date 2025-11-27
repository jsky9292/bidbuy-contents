// pages/api/og.js
// @vercel/og를 사용한 PNG OG 이미지 생성

import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || '보담';
  const subtitle = searchParams.get('subtitle') || '손해사정사의 보험 이야기';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* 로고 박스 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 160,
            height: 160,
            borderRadius: 40,
            backgroundColor: '#3B82F6',
            marginBottom: 40,
            boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.4)',
          }}
        >
          <span
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            보
          </span>
        </div>

        {/* 타이틀 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: 56,
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: 16,
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontSize: 28,
              color: '#6B7280',
              marginBottom: 24,
            }}
          >
            {subtitle}
          </span>
          <span
            style={{
              fontSize: 22,
              color: '#3B82F6',
            }}
          >
            보험사가 알려주지 않는 보험금 청구의 모든 것
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
