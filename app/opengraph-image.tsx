import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'NextCommerce - Cửa Hàng Công Nghệ & Lifestyle Chính Hãng';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 900, marginBottom: 24 }}>
          Next<span style={{ color: '#818cf8' }}>Commerce</span>
        </div>
        <div style={{ fontSize: 28, color: '#c7d2fe', maxWidth: 700, textAlign: 'center' }}>
          Thiết bị công nghệ & Lifestyle chính hãng – Bảo hành 12 tháng
        </div>
      </div>
    ),
    { ...size },
  );
}

