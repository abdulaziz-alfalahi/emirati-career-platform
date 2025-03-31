import React from 'react';

function App() {
  return (
    <div style={{backgroundColor: '#F5F0E1', minHeight: '100vh'}}>
      <header style={{backgroundColor: '#007A3D', color: 'white', padding: '1rem'}}>
        <h1 style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Emirati Career Journey Platform</h1>
      </header>
      <main style={{padding: '1rem'}}>
        <p style={{fontSize: '1.125rem'}}>Welcome to the Emirati Career Journey Platform!</p>
        <div style={{marginTop: '2rem', padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '1px solid rgba(0, 122, 61, 0.2)'}}>
          <h2 style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#007A3D', marginBottom: '1rem'}}>Platform Features</h2>
          <ul style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
            <li style={{display: 'flex', alignItems: 'center'}}>
              <span style={{width: '0.75rem', height: '0.75rem', backgroundColor: '#007A3D', borderRadius: '9999px', marginRight: '0.5rem'}}></span>
              <span>23 different user personas with role-based access</span>
            </li>
            <li style={{display: 'flex', alignItems: 'center'}}>
              <span style={{width: '0.75rem', height: '0.75rem', backgroundColor: '#007A3D', borderRadius: '9999px', marginRight: '0.5rem'}}></span>
              <span>16 specialized dashboards for different user types</span>
            </li>
            <li style={{display: 'flex', alignItems: 'center'}}>
              <span style={{width: '0.75rem', height: '0.75rem', backgroundColor: '#007A3D', borderRadius: '9999px', marginRight: '0.5rem'}}></span>
              <span>Resume parsing with Affinda integration</span>
            </li>
            <li style={{display: 'flex', alignItems: 'center'}}>
              <span style={{width: '0.75rem', height: '0.75rem', backgroundColor: '#007A3D', borderRadius: '9999px', marginRight: '0.5rem'}}></span>
              <span>Career recommendations powered by OpenAI</span>
            </li>
            <li style={{display: 'flex', alignItems: 'center'}}>
              <span style={{width: '0.75rem', height: '0.75rem', backgroundColor: '#007A3D', borderRadius: '9999px', marginRight: '0.5rem'}}></span>
              <span>LinkedIn data integration</span>
            </li>
            <li style={{display: 'flex', alignItems: 'center'}}>
              <span style={{width: '0.75rem', height: '0.75rem', backgroundColor: '#007A3D', borderRadius: '9999px', marginRight: '0.5rem'}}></span>
              <span>Location-based services with Mapbox</span>
            </li>
            <li style={{display: 'flex', alignItems: 'center'}}>
              <span style={{width: '0.75rem', height: '0.75rem', backgroundColor: '#007A3D', borderRadius: '9999px', marginRight: '0.5rem'}}></span>
              <span>Video conferencing for online interviews</span>
            </li>
          </ul>
        </div>
      </main>
      <footer style={{backgroundColor: '#007A3D', color: 'white', padding: '1rem', marginTop: '2rem', textAlign: 'center'}}>
        <p>© 2025 Emirati Career Journey Platform</p>
      </footer>
    </div>
  )
}

export default App
