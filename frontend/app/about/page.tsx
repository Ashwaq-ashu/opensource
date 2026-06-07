'use client';

import Link from 'next/link';
import Image from 'next/image';

const values = [
  { icon: '⚖', title: 'Integrity', desc: 'Honesty in every contract, transparency in every budget, and reliability in every deadline.' },
  { icon: '⛑', title: 'Safety', desc: 'Zero-compromise safety protocols that protect our people and our partners on every site.' },
  { icon: '◬', title: 'Innovation', desc: 'Leveraging cutting-edge BIM and sustainable technologies to build more efficiently.' },
  { icon: '◎', title: 'Excellence', desc: 'A meticulous attention to detail that ensures the final structure exceeds all expectations.' },
];

const certifications = [
  { icon: '⎈', title: 'ISO 9001' },
  { icon: '⚑', title: 'LEED PLATINUM' },
  { icon: '⛨', title: 'OSHA COMPLIANT' },
  { icon: '🏛', title: 'ASCE MEMBER' },
];

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section style={{
        minHeight: '65vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--color-primary)',
        backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)), radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
        backgroundSize: '100% 100%, 32px 32px',
        paddingTop: '64px',
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            maxWidth: '600px',
            borderLeft: '3px solid var(--color-secondary)',
            paddingLeft: '24px',
          }}>
            <div className="label-caps" style={{ color: 'var(--color-secondary)', marginBottom: '16px' }}>
              Building the Future
            </div>
            <h1 style={{
              fontFamily: 'var(--font-headline)',
              fontSize: 'clamp(40px, 5vw, 64px)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '24px',
            }}>
              Expertise Rooted<br />in Trust.
            </h1>
            <p style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.6,
            }}>
              We don't just build structures; we forge legacies through uncompromising precision and architectural integrity.
            </p>
          </div>
        </div>
      </section>

      {/* ── LEGACY ─────────────────────────────────────────────────────── */}
      <section className="section bg-surface">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '80px',
            alignItems: 'center',
          }}>
            {/* Text Content */}
            <div>
              <div className="label-caps" style={{ color: 'var(--color-secondary)', marginBottom: '16px' }}>Established 2004</div>
              <h2 className="section-title">Our Legacy of Integrity</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--color-text-muted)', fontSize: '15px', lineHeight: 1.8 }}>
                <p>
                  MT Constructions began with a single vision: to elevate the standard of structural execution. Over three decades, we have evolved from a small regional firm into a premier architectural powerhouse, known for taking on projects that others deem impossible.
                </p>
                <p>
                  Our history is etched into the skylines we've helped shape. Every rivet, beam, and slab we place is a testament to our commitment to quality. We operate on the principle that a building is only as strong as the trust between the builder and the client.
                </p>
                <p>
                  Today, MT Constructions stands as a symbol of reliability in high-value commercial and residential developments, combining traditional craftsmanship with state-of-the-art CAD planning and sustainable engineering.
                </p>
              </div>
            </div>

            {/* Image Content */}
            <div style={{ position: 'relative' }}>
              <div style={{
                aspectRatio: '4/5',
                backgroundColor: 'var(--color-primary)',
                backgroundImage: 'linear-gradient(45deg, #0f172a 0%, #1e293b 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: 'rgba(255,255,255,0.1)', fontFamily: 'var(--font-headline)', fontSize: '48px', fontWeight: 800 }}>MT</span>
              </div>
              
              {/* Floating Red Box */}
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-20px',
                width: '120px',
                height: '120px',
                backgroundColor: 'var(--color-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(204, 0, 0, 0.3)',
              }}>
                <div style={{ textAlign: 'center', color: '#fff' }}>
                  <div style={{ fontFamily: 'var(--font-headline)', fontSize: '36px', fontWeight: 800, lineHeight: 1 }}>20+</div>
                  <div style={{ fontFamily: 'var(--font-label)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', marginTop: '4px' }}>YEARS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ─────────────────────────────────────────────────────── */}
      <section className="section bg-surface-alt">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px', maxWidth: '600px', marginInline: 'auto' }}>
            <h2 className="section-title" style={{ marginBottom: '16px' }}>Foundational Values</h2>
            <p style={{ color: 'var(--color-text-muted)' }}>Our core principles guide every decision, from the blueprint to the final walkthrough.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
          }}>
            {values.map((val) => (
              <div key={val.title} style={{
                backgroundColor: '#ffffff',
                padding: '40px 32px',
                border: '1px solid var(--color-border-light)',
                transition: 'transform 200ms, box-shadow 200ms',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 24px rgba(0,0,0,0.05)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
              >
                <div style={{ color: 'var(--color-secondary)', fontSize: '28px', marginBottom: '24px' }}>{val.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '18px', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '12px' }}>{val.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', lineHeight: 1.6 }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP ─────────────────────────────────────────────────── */}
      <section className="section bg-surface">
        <div className="container">
          {/* Header Split */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '32px',
            marginBottom: '64px',
          }}>
            <div>
              <div className="label-caps" style={{ color: 'var(--color-secondary)', marginBottom: '12px' }}>The Visionaries</div>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Meet the Leadership</h2>
            </div>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '400px', fontSize: '15px' }}>
              Our executive team brings over a century of combined experience in large-scale structural engineering and project management.
            </p>
          </div>

          {/* Profile Focus */}
          <div style={{
            maxWidth: '500px',
            marginInline: 'auto',
            textAlign: 'center',
          }}>
            <div style={{
              aspectRatio: '3/4',
              backgroundColor: 'var(--color-border-light)',
              marginBottom: '32px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>[ Portrait Placeholder ]</span>
            </div>
            
            <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', lineHeight: 1.8, marginBottom: '24px' }}>
              With over 25 years of experience in structural engineering and urban development, MD Tajuddin has spearheaded MT Constructions' growth from a boutique firm to an industrial powerhouse. His vision of "integrity-first" construction has shaped skylines and set new standards for safety and excellence in the industry.
            </p>

            <div style={{
              fontFamily: 'cursive, "Brush Script MT", "Snell Roundhand", sans-serif',
              fontSize: '42px',
              color: 'var(--color-primary)',
              marginBottom: '16px',
            }}>
              MD Tajuddin
            </div>

            <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '16px', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '4px' }}>
              MD Tajuddin
            </h3>
            <div className="label-caps" style={{ color: 'var(--color-secondary)', fontSize: '10px' }}>
              Founder & CEO
            </div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS (PRE-FOOTER) ────────────────────────────────── */}
      <section style={{
        backgroundColor: 'var(--color-primary)',
        padding: '64px 0',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}>
            <div>
              <h2 style={{
                fontFamily: 'var(--font-headline)',
                fontSize: '28px', fontWeight: 700,
                color: '#ffffff', marginBottom: '16px',
              }}>Certified for Excellence</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: 1.6, maxWidth: '400px' }}>
                Our work meets and exceeds the most rigorous international standards for safety and environmental sustainability.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '16px',
            }}>
              {certifications.map((cert) => (
                <div key={cert.title} style={{
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: '24px 16px',
                  textAlign: 'center',
                }}>
                  <div style={{ color: 'var(--color-secondary)', fontSize: '24px', marginBottom: '12px' }}>{cert.icon}</div>
                  <div className="label-caps" style={{ color: '#ffffff', fontSize: '10px' }}>{cert.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
