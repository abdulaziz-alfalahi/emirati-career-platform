import React from 'react';
import { useAPI } from './APIContext';

// Custom hook for handling API loading states and errors
export const useAPIRequest = <T,>(
  apiCall: () => Promise<any>,
  initialData: T,
  dependencies: any[] = []
) => {
  const [data, setData] = React.useState<T>(initialData);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const execute = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiCall();
      if (response.status >= 200 && response.status < 300) {
        setData(response.data);
        return response.data;
      } else {
        setError(response.message || 'An error occurred');
        return null;
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [apiCall, ...dependencies]);

  React.useEffect(() => {
    execute();
  }, dependencies);

  return { data, isLoading, error, execute, setData };
};

// Example usage:
// 
// import { useAPIRequest } from '../lib/api/useAPIRequest';
// 
// const UserProfile = ({ userId }) => {
//   const api = useAPI();
//   const { data: profile, isLoading, error } = useAPIRequest(
//     () => api.user.getProfile(userId),
//     null,
//     [userId]
//   );
//   
//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   
//   return (
//     <div>
//       <h1>{profile.name}</h1>
//       <p>{profile.email}</p>
//     </div>
//   );
// };
