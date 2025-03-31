import { supabase } from './supabase';

export type SignUpCredentials = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type SignInCredentials = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles?: string[];
};

export const signUp = async (credentials: SignUpCredentials): Promise<{ user: User | null; error: any }> => {
  try {
    // Register the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
    });

    if (authError) throw authError;
    
    if (!authData.user) {
      return { user: null, error: 'User registration failed' };
    }

    // Create a profile for the user
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        first_name: credentials.firstName,
        last_name: credentials.lastName,
      });

    if (profileError) throw profileError;

    // Assign default role to the user
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert({
        user_id: authData.user.id,
        role_id: 'default-role-id', // This should be replaced with actual role ID
      });

    if (roleError) throw roleError;

    return {
      user: {
        id: authData.user.id,
        email: authData.user.email || '',
        firstName: credentials.firstName,
        lastName: credentials.lastName,
      },
      error: null,
    };
  } catch (error) {
    console.error('Error signing up:', error);
    return { user: null, error };
  }
};

export const signIn = async (credentials: SignInCredentials): Promise<{ user: User | null; error: any }> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) throw error;

    if (!data.user) {
      return { user: null, error: 'Login failed' };
    }

    // Fetch user profile
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('first_name, last_name')
      .eq('id', data.user.id)
      .single();

    if (profileError) throw profileError;

    // Fetch user roles
    const { data: rolesData, error: rolesError } = await supabase
      .from('user_roles')
      .select('roles(name)')
      .eq('user_id', data.user.id);

    if (rolesError) throw rolesError;

    const roles = rolesData.map((role: any) => role.roles.name);

    return {
      user: {
        id: data.user.id,
        email: data.user.email || '',
        firstName: profileData?.first_name,
        lastName: profileData?.last_name,
        roles,
      },
      error: null,
    };
  } catch (error) {
    console.error('Error signing in:', error);
    return { user: null, error };
  }
};

export const signOut = async (): Promise<{ error: any }> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error signing out:', error);
    return { error };
  }
};

export const getCurrentUser = async (): Promise<{ user: User | null; error: any }> => {
  try {
    const { data, error } = await supabase.auth.getUser();
    
    if (error) throw error;
    
    if (!data.user) {
      return { user: null, error: null };
    }

    // Fetch user profile
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('first_name, last_name')
      .eq('id', data.user.id)
      .single();

    if (profileError) throw profileError;

    // Fetch user roles
    const { data: rolesData, error: rolesError } = await supabase
      .from('user_roles')
      .select('roles(name)')
      .eq('user_id', data.user.id);

    if (rolesError) throw rolesError;

    const roles = rolesData.map((role: any) => role.roles.name);

    return {
      user: {
        id: data.user.id,
        email: data.user.email || '',
        firstName: profileData?.first_name,
        lastName: profileData?.last_name,
        roles,
      },
      error: null,
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return { user: null, error };
  }
};

export const resetPassword = async (email: string): Promise<{ error: any }> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error resetting password:', error);
    return { error };
  }
};

export const updatePassword = async (password: string): Promise<{ error: any }> => {
  try {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error updating password:', error);
    return { error };
  }
};

export const hasRole = (user: User | null, role: string): boolean => {
  if (!user || !user.roles) return false;
  return user.roles.includes(role);
};

export const hasAnyRole = (user: User | null, roles: string[]): boolean => {
  if (!user || !user.roles) return false;
  return roles.some(role => user.roles?.includes(role));
};
