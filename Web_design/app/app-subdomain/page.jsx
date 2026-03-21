export default function AppSubdomainHome() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#fff', padding: '60px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center', maxWidth: '500px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '16px', letterSpacing: '-1px' }}>
          App Dashboard
        </h1>
        <p style={{ color: '#666', fontSize: '16px', marginBottom: '40px', lineHeight: '1.5' }}>
          This page is securely served from your new subdomain:<br />
          <strong style={{ color: '#000' }}>app.noderhq.com</strong>
        </p>
        
        <button className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '15px' }}>
          Enter Workspace
        </button>
      </div>
    </div>
  );
}
