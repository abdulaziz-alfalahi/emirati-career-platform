import React, { createContext, useContext, useState, useEffect } from 'react';

// Define user types based on the 23 personas
type UserRole = 
  | 'school_student' 
  | 'university_student' 
  | 'national_service' 
  | 'employee_full_time' 
  | 'employee_part_time'
  | 'gig_worker'
  | 'jobseeker'
  | 'entrepreneur'
  | 'retiree'
  | 'educational_institution'
  | 'parent'
  | 'recruiter'
  | 'government_rep'
  | 'retiree_advocate'
  | 'training_center'
  | 'assessment_center'
  | 'mentor'
  | 'career_advisor'
  | 'platform_operator'
  | 'platform_admin'
  | 'super_user';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  profileComplete: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for development
const MOCK_USER: User = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'jobseeker',
  profileComplete: true
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate loading the user on mount
  useEffect(() => {
    // In a real app, this would check for an existing session
    setTimeout(() => {
      setUser(MOCK_USER);
      setLoading(false);
    }, 1000);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, this would call an authentication API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(MOCK_USER);
      setError(null);
    } catch (err) {
      setError('Failed to login');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    setLoading(true);
    try {
      // In a real app, this would call an authentication API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser({
        id: '2',
        email,
        name,
        role,
        profileComplete: false
      });
      setError(null);
    } catch (err) {
      setError('Failed to sign up');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      // In a real app, this would call an authentication API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(null);
      setError(null);
    } catch (err) {
      setError('Failed to logout');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      // In a real app, this would call an authentication API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setError(null);
    } catch (err) {
      setError('Failed to reset password');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, signup, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
