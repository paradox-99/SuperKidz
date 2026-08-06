import React from 'react';

const Loading = () => {
      return (
            <main style={styles.page}>
                  <div style={styles.center} aria-live="polite">
                        <svg
                              width="64"
                              height="64"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              role="img"
                              aria-label="Loading"
                        >
                              <circle cx="12" cy="12" r="10" stroke="#e6eefc" strokeWidth="2.5" />
                              <path
                                    d="M22 12a10 10 0 0 1-10 10"
                                    stroke="#2563EB"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    fill="none"
                              >
                                    <animateTransform
                                          attributeName="transform"
                                          type="rotate"
                                          from="0 12 12"
                                          to="360 12 12"
                                          dur="1s"
                                          repeatCount="indefinite"
                                    />
                              </path>
                        </svg>

                        <div style={styles.text}>Loading...</div>
                  </div>
            </main>
      );
};

const styles: { [k: string]: React.CSSProperties } = {
      page: {
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 16px',
            background: 'linear-gradient(180deg,#ffffff 0%,#f8fafc 100%)',
      },
      center: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
      },
      text: {
            color: '#475569',
            fontSize: 16,
            fontWeight: 600,
      },
};

export default Loading;