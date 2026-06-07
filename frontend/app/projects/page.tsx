'use client';

import { useState } from 'react';
import Link from 'next/link';

const allProjects = [
  { id: 1, category: 'COMMERCIAL', year: '2023', title: 'Skyline Plaza', location: 'Central Business District, New York', imgGradient: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' },
  { id: 2, category: 'INDUSTRIAL', year: '2024', title: 'Apex Logistics Hub', location: 'Port Authority Area, New Jersey', imgGradient: 'linear-gradient(135deg, #3a3a3a 0%, #1f1f1f 100%)' },
  { id: 3, category: 'RESIDENTIAL', year: '2023', title: 'The Zenith Estate', location: 'Green Hills, Connecticut', imgGradient: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)' },
  { id: 4, category: 'COMMERCIAL', year: '2022', title: 'Nova Tech Campus', location: 'Silicon Alley, Austin', imgGradient: 'linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)' },
  { id: 5, category: 'INDUSTRIAL', year: '2023', title: 'Omni Steelworks', location: 'Industrial Zone, Gary', imgGradient: 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)' },
  { id: 6, category: 'RESIDENTIAL', year: '2022', title: 'Harbor View Townhomes', location: 'Waterfront, San Diego', imgGradient: 'linear-gradient(135deg, #8e9eab 0%, #eef2f3 100%)' },
];

const workflow = [
  { icon: '◬', title: 'PLANNING', desc: 'Meticulous blueprint analysis and site feasibility studies ensuring every inch is mathematically verified.' },
  { icon: '⛟', title: 'GROUNDWORK', desc: 'Sub-surface engineering and heavy-duty excavation utilizing the latest structural precision machinery.' },
  { icon: '🏗', title: 'CONSTRUCTION', desc: 'Execution by elite craftspeople following rigorous safety standards and architectural mandates.' },
  { icon: '🔑', title: 'HANDOVER', desc: 'Final quality audits and seamless transition of the asset to the client with full structural warranty.' },
];

const pipelineSteps = [
  { step: '01', status: 'Completed', icon: '📋' },
  { step: '02', status: 'Completed', icon: '📐' },
  { step: '03', status: 'In Progress', icon: '🚧' },
  { step: '04', status: 'Pending', icon: '🚜' },
  { step: '05', status: 'Pending', icon: '🏗' },
  { step: '06', status: 'Pending', icon: '🏢' },
  { step: '07', status: 'Pending', icon: '🔌' },
  { step: '08', status: 'Pending', icon: '🎨' },
  { step: '09', status: 'Pending', icon: '🔑' },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState('ALL');

  const filteredProjects = filter === 'ALL' 
    ? allProjects 
    : allProjects.filter(p => p.category === filter);

  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section style={{
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--color-primary)',
        backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.9)), radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
        backgroundSize: '100% 100%, 32px 32px',
        paddingTop: '80px',
        paddingBottom: '60px',
      }}>
        <div className="container">
          <div style={{ maxWidth: '640px' }}>
            <div className="label-caps" style={{ color: 'var(--color-secondary)', marginBottom: '16px' }}>
              Portfolio
            </div>
            <h1 style={{
              fontFamily: 'var(--font-headline)',
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '24px',
            }}>
              Our Architectural<br />Legacy
            </h1>
            <p style={{
              fontSize: '16px',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.6,
            }}>
              Explore our diverse portfolio of industrial powerhouses, commercial landmarks, and high-end residential estates. Built with integrity, engineered for precision.
            </p>
          </div>
        </div>
      </section>

      {/* ── GRID SECTION ───────────────────────────────────────────────── */}
      <section className="section bg-surface-alt">
        <div className="container">
          {/* Filters */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '40px' 
          }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['ALL', 'INDUSTRIAL', 'COMMERCIAL', 'RESIDENTIAL'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: filter === f ? 'var(--color-primary)' : 'transparent',
                    color: filter === f ? '#ffffff' : 'var(--color-text)',
                    border: `1px solid ${filter === f ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    fontFamily: 'var(--font-label)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    transition: 'all 200ms',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
            <div style={{ color: 'var(--color-text-muted)', fontSize: '13px' }}>
              Showing {filteredProjects.length} Projects
            </div>
          </div>

          {/* Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '32px',
            marginBottom: '48px',
          }}>
            {filteredProjects.map((project) => (
              <div key={project.id} style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--color-border-light)',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <div style={{
                  height: '240px',
                  background: project.imgGradient,
                }} />
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div className="label-caps" style={{ color: 'var(--color-secondary)', fontSize: '10px', marginBottom: '8px' }}>
                    {project.category} | {project.year}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '18px', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '8px' }}>
                    {project.title}
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', marginBottom: '24px', flex: 1 }}>
                    {project.location}
                  </p>
                  <button style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-primary)',
                    fontFamily: 'var(--font-label)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    transition: 'all 200ms',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-surface-alt)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                  }}
                  >
                    VIEW DETAILS →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button style={{
              padding: '14px 32px',
              backgroundColor: 'transparent',
              border: '2px solid var(--color-border)',
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-label)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              cursor: 'pointer',
            }}>
              LOAD MORE PROJECTS
            </button>
          </div>
        </div>
      </section>

      {/* ── ACTIVE PIPELINE (THE DASHBOARD) ────────────────────────────── */}
      <section className="section bg-surface">
        <div className="container">
          <div style={{ marginBottom: '40px' }}>
            <div className="label-caps" style={{ color: 'var(--color-secondary)', marginBottom: '12px' }}>Real-Time Transparency</div>
            <h2 className="section-title" style={{ marginBottom: 0, textTransform: 'uppercase' }}>Active Project Updates</h2>
            <div style={{ width: '40px', height: '3px', backgroundColor: 'var(--color-secondary)', marginTop: '16px' }} />
          </div>

          {/* Dashboard Container */}
          <div style={{
            backgroundColor: '#161e27', // very dark slate
            borderRadius: '12px',
            padding: '40px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Header row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '60px' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-headline)', color: '#ffffff', fontSize: '24px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  The Nexus Refinery
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>Live Project Pipeline Dashboard</p>
              </div>
              <div style={{
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                color: '#d4af37', // Gold
                padding: '8px 16px',
                borderRadius: '4px',
                fontFamily: 'var(--font-label)',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.1em',
              }}>
                ● ACTIVE PHASE: BLUEPRINT & PLANNING
              </div>
            </div>

            {/* Timeline */}
            <div style={{ position: 'relative', paddingBottom: '20px', overflowX: 'auto' }}>
              <div style={{ minWidth: '800px', display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                
                {/* Connecting Line Base */}
                <div style={{ position: 'absolute', top: '70px', left: '20px', right: '20px', height: '2px', backgroundColor: 'rgba(255,255,255,0.1)', zIndex: 0 }} />
                {/* Connecting Line Progress (up to step 3) */}
                <div style={{ position: 'absolute', top: '70px', left: '20px', width: '25%', height: '2px', backgroundColor: '#10b981', zIndex: 1 }} />
                
                {pipelineSteps.map((step, idx) => {
                  let color = 'rgba(255,255,255,0.2)';
                  let textColor = 'rgba(255,255,255,0.4)';
                  if (step.status === 'Completed') {
                    color = '#10b981'; // Green
                    textColor = '#10b981';
                  } else if (step.status === 'In Progress') {
                    color = '#d4af37'; // Gold
                    textColor = '#d4af37';
                  }

                  return (
                    <div key={step.step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, width: '60px' }}>
                      <div style={{ color, fontSize: '18px', marginBottom: '8px' }}>{step.icon}</div>
                      <div style={{ fontFamily: 'var(--font-headline)', color: textColor, fontSize: '14px', fontWeight: 700, marginBottom: '24px' }}>
                        {step.step}
                      </div>
                      
                      {/* Node circle */}
                      <div style={{
                        width: '16px', height: '16px',
                        borderRadius: '50%',
                        backgroundColor: step.status === 'Pending' ? '#161e27' : color,
                        border: `2px solid ${color}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        position: 'relative',
                        boxShadow: step.status === 'In Progress' ? `0 0 0 4px rgba(212, 175, 55, 0.2)` : 'none',
                      }}>
                        {step.status === 'Completed' && (
                          <div style={{ width: '6px', height: '6px', backgroundColor: '#161e27', borderRadius: '50%' }} />
                        )}
                        {step.status === 'In Progress' && (
                          <div style={{ width: '6px', height: '6px', backgroundColor: '#161e27', borderRadius: '50%' }} />
                        )}
                      </div>

                      <div style={{ color: textColor, fontSize: '9px', marginTop: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {step.status}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WORKFLOW ───────────────────────────────────────────────────── */}
      <section className="section bg-surface-alt">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="label-caps" style={{ color: 'var(--color-secondary)', marginBottom: '12px' }}>Methodology</div>
            <h2 className="section-title">Our Workflow</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
          }}>
            {workflow.map((item) => (
              <div key={item.title} style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--color-border-light)',
                padding: '48px 32px',
                textAlign: 'center',
              }}>
                <div style={{
                  width: '48px', height: '48px',
                  backgroundColor: 'var(--color-primary)',
                  color: '#ffffff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginInline: 'auto',
                  fontSize: '20px',
                  marginBottom: '32px',
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '15px', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '16px', letterSpacing: '0.05em' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
