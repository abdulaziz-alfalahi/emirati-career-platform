import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { APIProvider } from './lib/api/APIContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardLayout from './components/layouts/DashboardLayout';

// Lazy load pages for code splitting
const SignInPage = lazy(() => import('./pages/SignInPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const SchoolStudentDashboard = lazy(() => import('./pages/dashboards/SchoolStudentDashboard'));
const UniversityStudentDashboard = lazy(() => import('./pages/dashboards/UniversityStudentDashboard'));
const ParentDashboard = lazy(() => import('./pages/dashboards/ParentDashboard'));
const RecruiterDashboard = lazy(() => import('./pages/dashboards/RecruiterDashboard'));
const JobseekerDashboard = lazy(() => import('./pages/dashboards/JobseekerDashboard'));
const PlatformAdminDashboard = lazy(() => import('./pages/dashboards/PlatformAdminDashboard'));
const EducationalInstitutionDashboard = lazy(() => import('./pages/dashboards/EducationalInstitutionDashboard'));
const TrainingCenterDashboard = lazy(() => import('./pages/dashboards/TrainingCenterDashboard'));
const AssessmentCenterDashboard = lazy(() => import('./pages/dashboards/AssessmentCenterDashboard'));
const MentorDashboard = lazy(() => import('./pages/dashboards/MentorDashboard'));
const CareerAdvisorDashboard = lazy(() => import('./pages/dashboards/CareerAdvisorDashboard'));
const ResumePage = lazy(() => import('./pages/ResumePage'));
const CareerRecommendationsPage = lazy(() => import('./pages/CareerRecommendationsPage'));
const LinkedInIntegrationPage = lazy(() => import('./pages/LinkedInIntegrationPage'));
const SkillsTaxonomyPage = lazy(() => import('./pages/SkillsTaxonomyPage'));
const LocationSearchPage = lazy(() => import('./pages/LocationSearchPage'));
const InterviewPage = lazy(() => import('./pages/InterviewPage'));

// Loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    <p className="ml-3 text-primary font-medium">Loading...</p>
  </div>
);

// Error boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <div className="text-accent mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h1>
          <p className="text-gray-600 mb-4">We're sorry, but there was an error loading this page.</p>
          <button 
            className="btn-primary"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Optimized App component
const App = () => {
  // Preload critical pages
  React.useEffect(() => {
    const preloadPages = () => {
      // Preload authentication pages
      const preloadSignIn = () => import('./pages/SignInPage');
      const preloadSignUp = () => import('./pages/SignUpPage');
      
      // Trigger preloads
      preloadSignIn();
      preloadSignUp();
    };
    
    // Use requestIdleCallback for non-critical preloading
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(preloadPages, { timeout: 2000 });
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      setTimeout(preloadPages, 2000);
    }
  }, []);
  
  return (
    <ErrorBoundary>
      <APIProvider>
        <Router>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Public routes */}
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              
              {/* Protected routes with role-based access */}
              <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                {/* Student dashboards */}
                <Route path="school-student" element={<SchoolStudentDashboard />} />
                <Route path="university-student" element={<UniversityStudentDashboard />} />
                
                {/* Parent dashboard */}
                <Route path="parent" element={<ParentDashboard />} />
                
                {/* Recruiter dashboard */}
                <Route path="recruiter" element={<RecruiterDashboard />} />
                
                {/* Jobseeker dashboard */}
                <Route path="jobseeker" element={<JobseekerDashboard />} />
                
                {/* Institution dashboards */}
                <Route path="educational-institution" element={<EducationalInstitutionDashboard />} />
                <Route path="training-center" element={<TrainingCenterDashboard />} />
                <Route path="assessment-center" element={<AssessmentCenterDashboard />} />
                
                {/* Advisor dashboards */}
                <Route path="mentor" element={<MentorDashboard />} />
                <Route path="career-advisor" element={<CareerAdvisorDashboard />} />
                
                {/* Admin dashboard */}
                <Route path="admin" element={<PlatformAdminDashboard />} />
                
                {/* Feature pages */}
                <Route path="resume" element={<ResumePage />} />
                <Route path="career-recommendations" element={<CareerRecommendationsPage />} />
                <Route path="linkedin-integration" element={<LinkedInIntegrationPage />} />
                <Route path="skills" element={<SkillsTaxonomyPage />} />
                <Route path="locations" element={<LocationSearchPage />} />
                <Route path="interview" element={<InterviewPage />} />
              </Route>
              
              {/* Fallback route */}
              <Route path="*" element={
                <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h1>
                  <p className="text-gray-600 mb-4">The page you are looking for does not exist.</p>
                  <a href="/" className="btn-primary">Go to Home</a>
                </div>
              } />
            </Routes>
          </Suspense>
        </Router>
      </APIProvider>
    </ErrorBoundary>
  );
};

export default App;
