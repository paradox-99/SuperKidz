import React from 'react';
import Link from 'next/link';

const NotFound = () => {
      return (
            <main style={styles.page}>
                  <div style={styles.card} className="flex flex-col items-center justify-center">
                        <svg
                              width="120"
                              height="120"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden
                              style={{ marginBottom: 16 }}
                        >
                              <path
                                    d="M11.03 2.151a9 9 0 1 0 9.819 9.819"
                                    stroke="#60A5FA"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                              />
                              <path
                                    d="M12 7v5l3 3"
                                    stroke="#2563EB"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                              />
                        </svg>

                        <h1 style={styles.code}>404</h1>
                        <h2 style={styles.title}>Page not found</h2>
                        <p style={styles.description}>
                              Sorry — the page you were looking for doesn&apos;t exist or has been moved.
                        </p>

                        <div style={{ marginTop: 20 }}>
                              <Link href="/" style={styles.button}>
                                    Go home
                              </Link>
                        </div>
                  </div>
            </main>
      );
};

const styles: { [k: string]: React.CSSProperties } = {
      page: {
            minHeight: '70vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 16px',
            background: 'linear-gradient(180deg,#f8fafc 0%,#fff 100%)',
      },
      card: {
            maxWidth: 720,
            textAlign: 'center',
            padding: '48px',
            borderRadius: 12,
            boxShadow: '0 8px 30px rgba(2,6,23,0.08)',
            background: '#ffffff',
      },
      code: {
            fontSize: 64,
            margin: 0,
            color: '#0f172a',
            lineHeight: 1,
      },
      title: {
            fontSize: 20,
            margin: '8px 0 0',
            color: '#0f172a',
            fontWeight: 600,
      },
      description: {
            marginTop: 12,
            color: '#475569',
            fontSize: 15,
      },
      button: {
            display: 'inline-block',
            padding: '10px 18px',
            borderRadius: 8,
            background: '#2563EB',
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 600,
      },
};

export default NotFound;