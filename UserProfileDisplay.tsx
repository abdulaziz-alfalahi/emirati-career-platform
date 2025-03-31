import React from 'react';
import { useAuth } from '../../lib/AuthContext';

const UserProfileDisplay: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500">Please sign in to view your profile</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-semibold text-lg">
            {user.firstName?.charAt(0) || ''}{user.lastName?.charAt(0) || ''}
          </span>
        </div>
        <div>
          <h3 className="font-medium">{user.firstName} {user.lastName}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
          {user.roles && user.roles.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {user.roles.map((role, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                >
                  {role}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileDisplay;
