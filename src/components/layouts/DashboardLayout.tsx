import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#007A3D', color: 'white', padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Emirati Career Journey Platform</h1>
          
          {user && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '1rem' }}>Welcome, {user.name}</span>
              <button 
                onClick={() => logout()}
                style={{ 
                  backgroundColor: 'white', 
                  color: '#007A3D', 
                  border: 'none', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '0.25rem',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
      
      {/* Main content */}
      <div style={{ display: 'flex', flex: 1, backgroundColor: '#F5F0E1' }}>
        {/* Sidebar */}
        <aside style={{ width: '250px', backgroundColor: '#FFFFFF', padding: '1rem', boxShadow: '2px 0 5px rgba(0,0,0,0.1)' }}>
          <nav>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{ display: 'block', padding: '0.75rem', backgroundColor: '#007A3D', color: 'white', textDecoration: 'none', borderRadius: '0.25rem' }}>
                  Dashboard
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{ display: 'block', padding: '0.75rem', color: '#333', textDecoration: 'none', borderRadius: '0.25rem' }}>
                  Profile
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{ display: 'block', padding: '0.75rem', color: '#333', textDecoration: 'none', borderRadius: '0.25rem' }}>
                  Resume
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{ display: 'block', padding: '0.75rem', color: '#333', textDecoration: 'none', borderRadius: '0.25rem' }}>
                  Job Search
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{ display: 'block', padding: '0.75rem', color: '#333', textDecoration: 'none', borderRadius: '0.25rem' }}>
                  Career Recommendations
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{ display: 'block', padding: '0.75rem', color: '#333', textDecoration: 'none', borderRadius: '0.25rem' }}>
                  Skills Assessment
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        
        {/* Content area */}
        <main style={{ flex: 1, padding: '2rem' }}>
          {children}
        </main>
      </div>
      
      {/* Footer */}
      <footer style={{ backgroundColor: '#007A3D', color: 'white', padding: '1rem', textAlign: 'center' }}>
        <p>© 2025 Emirati Career Journey Platform</p>
      </footer>
    </div>
  );
}
