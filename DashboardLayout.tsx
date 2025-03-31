import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';
import UserProfileDisplay from '../auth/UserProfileDisplay';
import RoleBasedNavigation from '../auth/RoleBasedNavigation';
import '../../styles/theme.css';

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/signin');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div 
        className={`sidebar w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition duration-200 ease-in-out z-30`}
      >
        <div className="flex items-center justify-between px-4">
          <h2 className="text-2xl font-bold">Emirati Career</h2>
          <button onClick={toggleSidebar} className="md:hidden">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="arabesque-border px-4 py-2">
          <img src="/falcon-logo.svg" alt="Falcon Logo" className="h-12 w-auto mx-auto" />
        </div>

        <nav className="flex flex-col space-y-1">
          {/* Common navigation for all users */}
          <Link 
            to="/dashboard" 
            className={`px-4 py-2 rounded-md ${
              location.pathname === '/dashboard' ? 'bg-red-dark' : 'hover:bg-red-dark'
            }`}
          >
            Dashboard Home
          </Link>

          {/* School Student Navigation */}
          <RoleBasedNavigation requiredRoles={['school_student']}>
            <Link 
              to="/dashboard/school-student" 
              className={`px-4 py-2 rounded-md ${
                location.pathname === '/dashboard/school-student' ? 'bg-red-dark' : 'hover:bg-red-dark'
              }`}
            >
              School Student Dashboard
            </Link>
          </RoleBasedNavigation>

          {/* University Student Navigation */}
          <RoleBasedNavigation requiredRoles={['university_student']}>
            <Link 
              to="/dashboard/university-student" 
              className={`px-4 py-2 rounded-md ${
                location.pathname === '/dashboard/university-student' ? 'bg-red-dark' : 'hover:bg-red-dark'
              }`}
            >
              University Student Dashboard
            </Link>
          </RoleBasedNavigation>

          {/* Parent Navigation */}
          <RoleBasedNavigation requiredRoles={['parent']}>
            <Link 
              to="/dashboard/parent" 
              className={`px-4 py-2 rounded-md ${
                location.pathname === '/dashboard/parent' ? 'bg-red-dark' : 'hover:bg-red-dark'
              }`}
            >
              Parent Dashboard
            </Link>
          </RoleBasedNavigation>

          {/* Educational Institution Navigation */}
          <RoleBasedNavigation requiredRoles={['educational_institution_rep']}>
            <Link 
              to="/dashboard/educational-institution" 
              className={`px-4 py-2 rounded-md ${
                location.pathname === '/dashboard/educational-institution' ? 'bg-red-dark' : 'hover:bg-red-dark'
              }`}
            >
              Educational Institution
            </Link>
          </RoleBasedNavigation>

          {/* Training Center Navigation */}
          <RoleBasedNavigation requiredRoles={['training_center_rep']}>
            <Link 
              to="/dashboard/training-center" 
              className={`px-4 py-2 rounded-md ${
                location.pathname === '/dashboard/training-center' ? 'bg-red-dark' : 'hover:bg-red-dark'
              }`}
            >
              Training Center
            </Link>
          </RoleBasedNavigation>

          {/* Assessment Center Navigation */}
          <RoleBasedNavigation requiredRoles={['assessment_center_rep']}>
            <Link 
              to="/dashboard/assessment-center" 
              className={`px-4 py-2 rounded-md ${
                location.pathname === '/dashboard/assessment-center' ? 'bg-red-dark' : 'hover:bg-red-dark'
              }`}
            >
              Assessment Center
            </Link>
          </RoleBasedNavigation>

          {/* Mentor Navigation */}
          <RoleBasedNavigation requiredRoles={['mentor']}>
            <Link 
              to="/dashboard/mentor" 
              className={`px-4 py-2 rounded-md ${
                location.pathname === '/dashboard/mentor' ? 'bg-red-dark' : 'hover:bg-red-dark'
              }`}
            >
              Mentor Dashboard
            </Link>
          </RoleBasedNavigation>

          {/* Career Advisor Navigation */}
          <RoleBasedNavigation requiredRoles={['career_advisor']}>
            <Link 
              to="/dashboard/career-advisor" 
              className={`px-4 py-2 rounded-md ${
                location.pathname === '/dashboard/career-advisor' ? 'bg-red-dark' : 'hover:bg-red-dark'
              }`}
            >
              Career Advisor
            </Link>
          </RoleBasedNavigation>

          {/* Recruiter Navigation */}
          <RoleBasedNavigation requiredRoles={['recruiter']}>
            <Link 
              to="/dashboard/recruiter" 
              className={`px-4 py-2 rounded-md ${
                location.pathname === '/dashboard/recruiter' ? 'bg-red-dark' : 'hover:bg-red-dark'
              }`}
            >
              Recruiter Dashboard
            </Link>
          </RoleBasedNavigation>

          {/* Jobseeker Navigation */}
          <RoleBasedNavigation requiredRoles={['jobseeker']}>
            <Link 
              to="/dashboard/jobseeker" 
              className={`px-4 py-2 rounded-md ${
                location.pathname === '/dashboard/jobseeker' ? 'bg-red-dark' : 'hover:bg-red-dark'
              }`}
            >
              Jobseeker Dashboard
            </Link>
          </RoleBasedNavigation>

          {/* Retiree Navigation */}
          <RoleBasedNavigation requiredRoles={['retiree']}>
            <Link 
              to="/dashboard/retiree" 
              className={`px-4 py-2 rounded-md ${
                location.pathname === '/dashboard/retiree' ? 'bg-red-dark' : 'hover:bg-red-dark'
              }`}
            >
              Retiree Dashboard
            </Link>
          </RoleBasedNavigation>

          {/* Retiree Advocate Navigation */}
          <RoleBasedNavigation requiredRoles={['retiree_advocate']}>
            <Link 
              to="/dashboard/retiree-advocate" 
              className={`px-4 py-2 rounded-md ${
                location.pathname === '/dashboard/retiree-advocate' ? 'bg-red-dark' : 'hover:bg-red-dark'
              }`}
            >
              Retiree Advocate
            </Link>
          </RoleBasedNavigation>

          {/* Government Rep Navigation */}
          <RoleBasedNavigation requiredRoles={['government_rep']}>
            <Link 
              to="/dashboard/government-rep" 
              className={`px-4 py-2 rounded-md ${
                location.pathname === '/dashboard/government-rep' ? 'bg-red-dark' : 'hover:bg-red-dark'
              }`}
            >
              Government Rep
            </Link>
          </RoleBasedNavigation>

          {/* Platform Operator Navigation */}
          <RoleBasedNavigation requiredRoles={['platform_operator']}>
            <Link 
              to="/dashboard/platform-operator" 
              className={`px-4 py-2 rounded-md ${
                location.pathname === '/dashboard/platform-operator' ? 'bg-red-dark' : 'hover:bg-red-dark'
              }`}
            >
              Platform Operator
            </Link>
          </RoleBasedNavigation>

          {/* Platform Admin Navigation */}
          <RoleBasedNavigation requiredRoles={['platform_admin']}>
            <Link 
              to="/dashboard/platform-admin" 
              className={`px-4 py-2 rounded-md ${
                location.pathname === '/dashboard/platform-admin' ? 'bg-red-dark' : 'hover:bg-red-dark'
              }`}
            >
              Platform Admin
            </Link>
          </RoleBasedNavigation>

          {/* Super User Navigation */}
          <RoleBasedNavigation requiredRoles={['super_user']}>
            <Link 
              to="/dashboard/super-user" 
              className={`px-4 py-2 rounded-md ${
                location.pathname === '/dashboard/super-user' ? 'bg-red-dark' : 'hover:bg-red-dark'
              }`}
            >
              Super User
            </Link>
          </RoleBasedNavigation>

          {/* Logout button */}
          <button 
            onClick={handleLogout}
            className="px-4 py-2 mt-auto text-white rounded-md hover:bg-red-dark"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="navbar shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <button onClick={toggleSidebar} className="md:hidden">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold">Emirati Career Journey Platform</h1>
            <div className="flex items-center">
              {user && (
                <div className="ml-3 relative">
                  <UserProfileDisplay />
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="main-content flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
