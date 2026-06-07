'use client';

import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  'Quick Links': [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Services', href: '/services' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Contact', href: '/contact' },
  ],
  'Services': [
    { label: 'Civil Construction', href: '/services' },
    { label: 'Residential Projects', href: '/services' },
    { label: 'Commercial Construction', href: '/services' },
    { label: 'Turnkey Projects', href: '/services' },
    { label: 'Renovation & Remodeling', href: '/services' },
    { label: 'Planning & Estimation', href: '/services' },
  ],
};

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--color-primary)',
      color: '#ffffff',
      borderTop: '3px solid var(--color-secondary)',
    }}>
      {/* Main Footer */}
      <div className="container" style={{ paddingBlock: '64px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
        }}>

          {/* Brand Column */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <Image 
                src="/logo-full.jpg" 
                alt="MT Mohammed Tajuddin Constructions" 
                width={180} 
                height={50} 
                style={{ objectFit: 'contain', height: '48px', width: 'auto', filter: 'brightness(0) invert(1)' }} 
              />
            </div>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: '24px', maxWidth: '240px' }}>
              Precision engineering meets architectural vision. Delivering high-quality commercial and residential projects with absolute reliability.
            </p>
            {/* Socials */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {['FB', 'IG', 'LI'].map((s) => (
                <a key={s} href="#" style={{
                  width: '36px', height: '36px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-label)', fontSize: '10px', fontWeight: 700,
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                  transition: 'border-color 200ms, color 200ms',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-secondary)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--color-secondary)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                }}
                >{s}</a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 style={{
                fontFamily: 'var(--font-label)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-secondary)',
                marginBottom: '20px',
              }}>{title}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} style={{
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.55)',
                      textDecoration: 'none',
                      transition: 'color 200ms',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#ffffff'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'}
                    >{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-label)',
              fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'var(--color-secondary)', marginBottom: '20px',
            }}>Contact Info</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { icon: '✉', text: 'info@mtconstructions.com' },
                { icon: '✆', text: '+1 (555) 000-0000' },
                { icon: '◎', text: 'Dubai, UAE' },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: 'var(--color-secondary)', fontSize: '13px', marginTop: '2px', flexShrink: 0 }}>{icon}</span>
                  <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container" style={{
          paddingBlock: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
            © {new Date().getFullYear()} MT Constructions. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy Policy', 'Terms & Conditions'].map((item) => (
              <a key={item} href="#" style={{
                fontSize: '11px', color: 'rgba(255,255,255,0.3)',
                textDecoration: 'none', letterSpacing: '0.05em',
                transition: 'color 200ms',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)'}
              >{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
