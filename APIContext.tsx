import React from 'react';
import APIService from './APIService';

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

// Example usage:
// 
// import { useAPI } from '../lib/api/APIContext';
// 
// const MyComponent = () => {
//   const api = useAPI();
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
//   return (
//     // Component JSX
//   );
// };
