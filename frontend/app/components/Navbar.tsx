'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Floating Capsule Navbar */}
      <header style={{
        position: 'fixed',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        width: 'calc(100% - 48px)',
        maxWidth: '1200px',
        transition: 'box-shadow 300ms ease',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(16px)',
          borderRadius: '9999px', /* Cylindrical/Pill shape */
          padding: '0 8px 0 24px',
          height: '64px',
          boxShadow: scrolled
            ? '0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.1)'
            : '0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.06)',
        }}>

          {/* Logo */}
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
          }}>
            <Image 
              src="/logo-full.jpg" 
              alt="MT Mohammed Tajuddin Constructions" 
              width={180} 
              height={50} 
              style={{ objectFit: 'contain', height: '40px', width: 'auto' }}
              priority
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="desktop-nav" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
          }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-label)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--color-secondary)' : '#444',
                    textDecoration: 'none',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    backgroundColor: isActive ? 'rgba(225,112,85,0.08)' : 'transparent',
                    transition: 'color 180ms, background-color 180ms',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = 'var(--color-primary)';
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(0,0,0,0.04)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = '#444';
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                    }
                  }}
                >{link.label}</Link>
              );
            })}
          </nav>

          {/* CTA + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <Link
              href="/contact"
              className="desktop-nav"
              style={{
                fontFamily: 'var(--font-label)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#ffffff',
                backgroundColor: 'var(--color-primary)',
                textDecoration: 'none',
                padding: '12px 24px',
                borderRadius: '9999px', /* Cylindrical/Pill shape */
                whiteSpace: 'nowrap',
                transition: 'background-color 180ms',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-secondary)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-primary)'}
            >Get a Quote</Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="hamburger-btn"
              aria-label="Toggle menu"
              style={{
                display: 'none',
                flexDirection: 'column',
                gap: '5px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              <span style={{ width: '22px', height: '2px', backgroundColor: 'var(--color-primary)', display: 'block' }} />
              <span style={{ width: '22px', height: '2px', backgroundColor: 'var(--color-primary)', display: 'block' }} />
              <span style={{ width: '14px', height: '2px', backgroundColor: 'var(--color-secondary)', display: 'block' }} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div style={{
            marginTop: '8px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.16)',
            border: '1px solid rgba(0,0,0,0.06)',
            overflow: 'hidden',
          }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-label)',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: pathname === link.href ? 'var(--color-secondary)' : 'var(--color-primary)',
                  textDecoration: 'none',
                  padding: '16px 20px',
                  borderBottom: '1px solid rgba(0,0,0,0.05)',
                }}
              >{link.label}</Link>
            ))}
            <div style={{ padding: '16px 20px' }}>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'inline-flex',
                  fontFamily: 'var(--font-label)',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  backgroundColor: 'var(--color-primary)',
                  textDecoration: 'none',
                  padding: '12px 24px',
                  borderRadius: '4px',
                }}
              >Get a Quote</Link>
            </div>
          </div>
        )}
      </header>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
