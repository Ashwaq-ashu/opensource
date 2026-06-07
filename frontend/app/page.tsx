'use client';

import Link from 'next/link';
import AnimatedStat from './components/AnimatedStat';
import { 
  Building2, 
  Home, 
  Briefcase, 
  Key, 
  PaintRoller, 
  ClipboardList, 
  Leaf, 
  ShieldCheck 
} from 'lucide-react';

/* ── Stats data ─────────────────────────────────────────── */
const stats = [
  { value: '25+', label: 'Projects Completed' },
  { value: '120+', label: 'Skilled Professionals' },
  { value: '18+', label: 'Years of Experience' },
  { value: '100%', label: 'Client Satisfaction' },
];

/* ── Specializations ────────────────────────────────────── */
const specializations = [
  {
    icon: <Building2 size={32} strokeWidth={1.5} />,
    title: 'Civil Construction',
    desc: 'Robust structural solutions including columns, beams, and RC frameworks built for long-term strength.',
  },
  {
    icon: <Home size={32} strokeWidth={1.5} />,
    title: 'Residential Projects',
    desc: 'We craft houses, villas, and apartments designed for living comfort, functionality, and modern living.',
  },
  {
    icon: <Briefcase size={32} strokeWidth={1.5} />,
    title: 'Commercial Construction',
    desc: 'From offices to retail spaces, we create efficient, professional, and business-ready environments.',
  },
  {
    icon: <Key size={32} strokeWidth={1.5} />,
    title: 'Turnkey Projects',
    desc: 'End-to-end responsibility, from planning to final handover, ensuring a smooth and stress-free experience.',
  },
  {
    icon: <PaintRoller size={32} strokeWidth={1.5} />,
    title: 'Renovation & Remodeling',
    desc: 'Revitalizing existing spaces with improved design, enhanced functionality, and master construction techniques.',
  },
  {
    icon: <ClipboardList size={32} strokeWidth={1.5} />,
    title: 'Planning & Estimation',
    desc: 'Accurate cost estimation and detailed project planning to protect your budget and practical execution timelines.',
  },
  {
    icon: <Leaf size={32} strokeWidth={1.5} />,
    title: 'Sustainable Architecture',
    desc: 'Integrating green building practices and LEED-certified materials to minimize environmental impact and reduce energy costs.',
  },
  {
    icon: <ShieldCheck size={32} strokeWidth={1.5} />,
    title: 'Safety & Compliance',
    desc: 'Rigorous safety protocols and OSHA compliance ensuring every job site protects our team and your investment.',
  },
];

/* ── Featured Projects ──────────────────────────────────── */
const projects = [
  {
    title: 'Apex Plaza Center',
    category: 'Commercial',
    location: 'Dubai, UAE',
    gradient: 'linear-gradient(135deg, #1a2a3a 0%, #2d3436 50%, #3d5a80 100%)',
  },
  {
    title: 'Titan Logistics Hub',
    category: 'Industrial',
    location: 'Sharjah, UAE',
    gradient: 'linear-gradient(135deg, #0d1b2a 0%, #1b263b 50%, #415a77 100%)',
  },
  {
    title: 'Skyline Ridge Estate',
    category: 'Residential',
    location: 'Ajman, UAE',
    gradient: 'linear-gradient(135deg, #2d3436 0%, #3d5a42 50%, #2d6a4f 100%)',
  },
];

/* ── Why Choose Us ──────────────────────────────────────── */
const whyUs = [
  {
    icon: '◆',
    title: 'Quality Materials',
    desc: 'We source only certified materials and use modern techniques to ensure lasting quality.',
  },
  {
    icon: '◆',
    title: 'Better Execution',
    desc: 'Our disciplined team executes every step to get the best value for your investment.',
  },
  {
    icon: '◆',
    title: 'Safety First',
    desc: 'Our professionals work day to protect our team, family, and clients.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: 'url("/hero-bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: '80px',
      }}>
        {/* Decorative accent line */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: '4px', backgroundColor: 'var(--color-secondary)',
        }} />

        <div className="container" style={{ paddingBlock: '80px', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '640px' }}>
            {/* Label */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              marginBottom: '28px',
            }}>
              <div style={{ width: '32px', height: '2px', backgroundColor: 'var(--color-secondary)' }} />
              <span className="label-caps" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Precision Engineering · Structural Integrity
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: 'var(--font-headline)',
              fontSize: 'clamp(44px, 6vw, 72px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              marginBottom: '24px',
            }}>
              Building with{' '}
              <span style={{ color: 'var(--color-secondary)' }}>Integrity</span>
            </h1>

            {/* Subheading */}
            <p style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.7,
              marginBottom: '40px',
              maxWidth: '500px',
            }}>
              Precision engineering meets architectural vision. We deliver high-quality commercial and residential projects with absolute reliability.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link href="/contact" className="btn btn-primary">
                Get a Quote →
              </Link>
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-label)',
                fontSize: '12px', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.7)',
                transition: 'color 200ms',
              }}>
                <div style={{
                  width: '44px', height: '44px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '16px',
                }}>▶</div>
                Watch Our Video
              </button>
            </div>
          </div>
        </div>

        {/* Decorative corner bracket */}
        <div style={{
          position: 'absolute', right: '48px', bottom: '48px',
          width: '80px', height: '80px',
          borderRight: '2px solid rgba(225,112,85,0.3)',
          borderBottom: '2px solid rgba(225,112,85,0.3)',
        }} />
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────── */}
      <section style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--color-border-light)',
        borderTop: '1px solid var(--color-border-light)',
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0',
        }}>
          {stats.map((stat, i) => (
            <div key={stat.label} style={{
              padding: '36px 24px',
              textAlign: 'center',
              borderRight: i < stats.length - 1 ? '1px solid var(--color-border-light)' : 'none',
            }}>
              <div style={{
                fontFamily: 'var(--font-headline)',
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 800,
                color: 'var(--color-secondary)',
                lineHeight: 1,
                marginBottom: '8px',
              }}>
                <AnimatedStat value={stat.value} />
              </div>
              <div className="label-caps" style={{ color: 'var(--color-text-muted)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SPECIALIZATIONS ───────────────────────────────────────────── */}
      <section className="section bg-blueprint-light">
        <div className="container">
          {/* Header */}
          <div style={{ marginBottom: '48px' }}>
            <div className="section-label">Who We Are</div>
            <div className="divider" />
            <h2 className="section-title" style={{ marginBottom: '0' }}>Our Specializations</h2>
          </div>

          {/* Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1px',
            backgroundColor: 'var(--color-border-light)',
            border: '1px solid var(--color-border-light)',
          }}>
            {specializations.map((spec) => (
              <div key={spec.title} style={{
                backgroundColor: '#ffffff',
                padding: '32px 28px',
                transition: 'background-color 200ms',
                cursor: 'default',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = '#fdf4f2'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = '#ffffff'}
              >
                <div style={{
                  fontSize: '24px',
                  color: 'var(--color-secondary)',
                  marginBottom: '16px',
                }}>{spec.icon}</div>
                <h3 style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                  marginBottom: '10px',
                }}>{spec.title}</h3>
                <p style={{
                  fontSize: '14px',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.65,
                }}>{spec.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA to Services */}
          <div style={{
            marginTop: '40px',
            padding: '24px 28px',
            backgroundColor: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>
              Not sure where to start? Let's discuss your project.
            </p>
            <Link href="/services" className="btn btn-primary">
              Full Consultation →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ─────────────────────────────────────────── */}
      <section className="section" style={{ backgroundColor: 'var(--color-surface-alt)' }}>
        <div className="container">
          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
            <div>
              <div className="section-label">Our Work</div>
              <div className="divider" />
              <h2 className="section-title" style={{ marginBottom: 0 }}>Featured Projects</h2>
            </div>
            <Link href="/projects" className="btn btn-ghost" style={{ padding: '10px 20px', fontSize: '11px' }}>
              View All Projects →
            </Link>
          </div>

          {/* Project cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2px',
          }}>
            {projects.map((project) => (
              <div key={project.title} style={{
                position: 'relative', overflow: 'hidden',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                const overlay = (e.currentTarget as HTMLElement).querySelector('.project-overlay') as HTMLElement;
                if (overlay) overlay.style.opacity = '1';
              }}
              onMouseLeave={e => {
                const overlay = (e.currentTarget as HTMLElement).querySelector('.project-overlay') as HTMLElement;
                if (overlay) overlay.style.opacity = '0';
              }}
              >
                {/* Image placeholder */}
                <div style={{
                  height: '260px',
                  background: project.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: 'var(--font-headline)', fontSize: '40px', fontWeight: 800, color: 'rgba(255,255,255,0.08)', letterSpacing: '-0.02em' }}>MT</span>
                </div>

                {/* Hover overlay */}
                <div className="project-overlay" style={{
                  position: 'absolute', inset: 0,
                  backgroundColor: 'rgba(225,112,85,0.12)',
                  border: '2px solid var(--color-secondary)',
                  opacity: 0,
                  transition: 'opacity 200ms',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '20px',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-label)', fontSize: '11px', fontWeight: 700,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: 'var(--color-secondary)',
                  }}>View Project →</span>
                </div>

                {/* Info */}
                <div style={{
                  backgroundColor: '#ffffff',
                  padding: '20px 20px 24px',
                  borderTop: '2px solid var(--color-border-light)',
                }}>
                  <div className="label-caps" style={{ color: 'var(--color-secondary)', marginBottom: '6px' }}>{project.category}</div>
                  <h3 style={{
                    fontFamily: 'var(--font-headline)', fontSize: '18px', fontWeight: 700,
                    color: 'var(--color-primary)', marginBottom: '6px',
                  }}>{project.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>◎ {project.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ─────────────────────────────────────────────── */}
      <section className="section bg-blueprint">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'center',
          }}>
            {/* Left: visual placeholder */}
            <div style={{
              height: '420px',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, rgba(225,112,85,0.05) 0%, rgba(24,31,33,0) 100%)',
            }}>
              {/* Animated corner lines */}
              <div style={{ position: 'absolute', top: '16px', left: '16px', width: '40px', height: '40px', borderTop: '2px solid var(--color-secondary)', borderLeft: '2px solid var(--color-secondary)' }} />
              <div style={{ position: 'absolute', bottom: '16px', right: '16px', width: '40px', height: '40px', borderBottom: '2px solid var(--color-secondary)', borderRight: '2px solid var(--color-secondary)' }} />
              <span style={{ fontFamily: 'var(--font-headline)', fontSize: '80px', fontWeight: 900, color: 'rgba(255,255,255,0.04)', letterSpacing: '-0.04em' }}>MT</span>
            </div>

            {/* Right: content */}
            <div>
              <div className="section-label" style={{ color: 'rgba(255,255,255,0.45)' }}>Why About Us</div>
              <div className="divider" />
              <h2 style={{
                fontFamily: 'var(--font-headline)',
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                fontWeight: 800, color: '#ffffff',
                lineHeight: 1.15, marginBottom: '32px',
                letterSpacing: '-0.01em',
              }}>
                Engineered for<br />
                <span style={{ color: 'var(--color-secondary)' }}>Reliability</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
                {whyUs.map((item) => (
                  <div key={item.title} style={{ display: 'flex', gap: '16px' }}>
                    <div style={{
                      flexShrink: 0,
                      width: '36px', height: '36px',
                      backgroundColor: 'var(--color-secondary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', color: '#fff',
                    }}>{item.icon}</div>
                    <div>
                      <h4 style={{
                        fontFamily: 'var(--font-headline)',
                        fontSize: '15px', fontWeight: 700,
                        color: '#ffffff', marginBottom: '4px',
                      }}>{item.title}</h4>
                      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/about" className="btn btn-ghost-light">
                About Our Company →
              </Link>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            #why-choose-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── CONTACT BANNER ────────────────────────────────────────────── */}
      <section style={{
        backgroundColor: 'var(--color-secondary)',
        padding: '64px 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Blueprint grid on orange */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div className="label-caps" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>Start Your Journey</div>
          <h2 style={{
            fontFamily: 'var(--font-headline)',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '16px',
            letterSpacing: '-0.01em',
          }}>Ready to Start Your Next Project?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', marginBottom: '36px', maxWidth: '480px', marginInline: 'auto' }}>
            Let's discuss your vision and make it a reality. Our team is ready to deliver excellence.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '14px 32px',
              backgroundColor: '#ffffff',
              color: 'var(--color-secondary)',
              fontFamily: 'var(--font-label)',
              fontSize: '12px', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'transform 80ms, box-shadow 80ms',
              boxShadow: '4px 4px 0 rgba(0,0,0,0.15)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translate(2px,2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '2px 2px 0 rgba(0,0,0,0.15)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translate(0,0)';
              (e.currentTarget as HTMLElement).style.boxShadow = '4px 4px 0 rgba(0,0,0,0.15)';
            }}
            >Get a Quote</Link>
            <Link href="/contact" className="btn btn-ghost-light">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
