import Link from 'next/link';

export default function Home() {
  return (
    <main
      style={{
        position: 'relative',
        width: '100%',
        height: '761px',
        overflow: 'hidden',
        backgroundImage: "url('/hero-bg.jpg')", // вкажи точну назву фонової картинки з папки public
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Затемнення фону */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          pointerEvents: 'none',
        }}
      />

      {/* Контентний блок за точними координатами з Figma */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1440px',
          margin: '0 auto',
          paddingLeft: '64px',
          paddingRight: '64px',
          paddingTop: '260px',
        }}
      >
        <div style={{ width: '571px' }}>
          {/* Заголовок H1 */}
          <h1
            style={{
              color: '#F7F7F7',
              fontWeight: 600,
              fontSize: '48px',
              lineHeight: '48px',
              letterSpacing: '0%',
              marginBottom: '16px',
            }}
          >
            Campers of your dreams
          </h1>

          {/* Підзаголовок H2 */}
          <h2
            style={{
              color: '#F7F7F7',
              fontWeight: 600,
              fontSize: '24px',
              lineHeight: '32px',
              letterSpacing: '0%',
              marginBottom: '40px',
              maxWidth: '550px',
            }}
          >
            You can find everything you want in our catalog
          </h2>

          {/* Кнопка View Now */}
          <Link
            href="/catalog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '173px',
              height: '56px',
              backgroundColor: '#829B91',
              color: '#FFFFFF',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '24px',
              letterSpacing: '-0.5%',
              borderRadius: '200px',
              textDecoration: 'none',
            }}
          >
            View Now
          </Link>
        </div>
      </div>
    </main>
  );
}