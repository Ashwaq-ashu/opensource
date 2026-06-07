export default function ContactPage() {
  return (
    <div className="section container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', textAlign: 'center' }}>
      <div className="section-label">Get In Touch</div>
      <h1 className="section-title section-title-lg">Contact Us</h1>
      <p style={{ color: 'var(--color-text-muted)', maxWidth: '500px' }}>Ready to start your next project? Reach out and let's talk. Coming soon.</p>
    </div>
  );
}
