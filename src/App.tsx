import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/auth/LoginForm';
import JobseekerDashboard from './pages/dashboards/JobseekerDashboard';
import SchoolStudentDashboard from './pages/dashboards/SchoolStudentDashboard';
import ResumeParser from './components/resume/ResumeParser';
import CareerRecommendations from './components/career/CareerRecommendations';
import LocationMap from './components/map/LocationMap';
import VideoConference from './components/interview/VideoConference';

// Protected route component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#F5F0E1' }}>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginForm />} />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <JobseekerDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/school-dashboard" element={
        <ProtectedRoute>
          <SchoolStudentDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/resume" element={
        <ProtectedRoute>
          <ResumeParser />
        </ProtectedRoute>
      } />
      
      <Route path="/career-recommendations" element={
        <ProtectedRoute>
          <CareerRecommendations />
        </ProtectedRoute>
      } />
      
      <Route path="/location-search" element={
        <ProtectedRoute>
          <LocationMap />
        </ProtectedRoute>
      } />
      
      <Route path="/interview" element={
        <ProtectedRoute>
          <VideoConference />
        </ProtectedRoute>
      } />
      
      <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
