import React from 'react';
import APIService from './APIService';
import LinkedInService from './LinkedInService';

// Create a context for API access
export const APIContext = React.createContext<typeof APIService | null>(null);

// API Provider component
export const APIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <APIContext.Provider value={APIService}>
      {children}
    </APIContext.Provider>
  );
};

// Custom hook for using the API
export const useAPI = () => {
  const context = React.useContext(APIContext);
  if (!context) {
    throw new Error('useAPI must be used within an APIProvider');
  }
  return context;
};

// Create a context specifically for LinkedIn API access
export const LinkedInContext = React.createContext<typeof LinkedInService | null>(null);

// LinkedIn API Provider component
export const LinkedInProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LinkedInContext.Provider value={LinkedInService}>
      {children}
    </LinkedInContext.Provider>
  );
};

// Custom hook for using the LinkedIn API
export const useLinkedIn = () => {
  const context = React.useContext(LinkedInContext);
  if (!context) {
    throw new Error('useLinkedIn must be used within a LinkedInProvider');
  }
  return context;
};

// Combined provider for convenience
export const APIProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <APIProvider>
      <LinkedInProvider>
        {children}
      </LinkedInProvider>
    </APIProvider>
  );
};

// Example usage:
// 
// import { useAPI, useLinkedIn } from '../lib/api/APIContext';
// 
// const MyComponent = () => {
//   const api = useAPI();
//   const linkedin = useLinkedIn();
//   
//   const handleSignIn = async () => {
//     const response = await api.auth.signIn('user@example.com', 'password');
//     if (response.status === 200) {
//       // Success
//     } else {
//       // Error handling
//     }
//   };
//
//   const fetchLinkedInProfile = async () => {
//     const response = await api.linkedin.getProfileByUsername('johndoe');
//     if (response.status === 200) {
//       // Success
//     } else {
//       // Error handling
//     }
//   };
//   
//   return (
//     // Component JSX
//   );
// };
