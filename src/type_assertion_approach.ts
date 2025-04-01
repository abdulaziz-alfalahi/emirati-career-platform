import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || 'your-supabase-key';
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

// API response interface
interface APIResponse<T> {
  data: T;
  error: any | null;
  status: number;
  message?: string;
}

// Alternative approach using type assertions to bypass TypeScript errors
const TypeAssertionSupabaseService = {
  // Auth methods
  auth: {
    // Get current session
    getCurrentSession: async (): Promise<APIResponse<any>> => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        return {
          data: data || null,
          error: error,
          status: error ? 400 : 200,
          message: error ? error.message : undefined
        };
      } catch (err: any) {
        return {
          data: null,
          error: err,
          status: 500,
          message: err.message
        } as APIResponse<any>;
      }
    },
    
    // Sign in with email and password
    signIn: async (email: string, password: string): Promise<APIResponse<any>> => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        return {
          data: data || null,
          error: error,
          status: error ? 400 : 200,
          message: error ? error.message : undefined
        };
      } catch (err: any) {
        return {
          data: null,
          error: err,
          status: 500,
          message: err.message
        } as APIResponse<any>;
      }
    },
    
    // Sign out
    signOut: async (): Promise<APIResponse<null>> => {
      try {
        const { error } = await supabase.auth.signOut();
        
        return {
          data: null,
          error: error,
          status: error ? 400 : 200,
          message: error ? error.message : undefined
        };
      } catch (err: any) {
        return {
          data: null,
          error: err,
          status: 500,
          message: err.message
        };
      }
    },
    
    // Get user
    getUser: async (): Promise<APIResponse<any>> => {
      try {
        const { data, error } = await supabase.auth.getUser();
        
        return {
          data: data || null,
          error: error,
          status: error ? 400 : 200,
          message: error ? error.message : undefined
        };
      } catch (err: any) {
        return {
          data: null,
          error: err,
          status: 500,
          message: err.message
        } as APIResponse<any>;
      }
    },
    
    // Reset password
    resetPassword: async (email: string): Promise<APIResponse<null>> => {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        
        return {
          data: null,
          error: error,
          status: error ? 400 : 200,
          message: error ? error.message : undefined
        };
      } catch (err: any) {
        return {
          data: null,
          error: err,
          status: 500,
          message: err.message
        };
      }
    },
    
    // Update user
    updateUser: async (attributes: any): Promise<APIResponse<any>> => {
      try {
        const { data, error } = await supabase.auth.updateUser(attributes);
        
        return {
          data: data || null,
          error: error,
          status: error ? 400 : 200,
          message: error ? error.message : undefined
        };
      } catch (err: any) {
        return {
          data: null,
          error: err,
          status: 500,
          message: err.message
        } as APIResponse<any>;
      }
    }
  },
  
  // Database operations with type assertion approach
  db: {
    // Get data with type assertion approach
    getData: async <T>(
      table: string, 
      query?: { select?: string, filters?: Record<string, any> }
    ): Promise<APIResponse<T[]>> => {
      try {
        let queryBuilder = supabase.from(table).select(query?.select || '*');
        
        // Apply filters if provided
        if (query?.filters) {
          Object.entries(query.filters).forEach(([key, value]) => {
            queryBuilder = queryBuilder.eq(key, value);
          });
        }
        
        const { data, error } = await queryBuilder;
        
        // Use type assertion to bypass TypeScript errors
        return {
          data: (data || []) as T[],
          error: error,
          status: error ? 400 : 200,
          message: error ? error.message : undefined
        };
      } catch (err: any) {
        return {
          data: [] as T[],
          error: err,
          status: 500,
          message: err.message
        };
      }
    },
    
    // Get single item with type assertion approach
    getSingle: async <T>(
      table: string,
      id: string,
      idField: string = 'id',
      select: string = '*'
    ): Promise<APIResponse<T>> => {
      try {
        const { data, error } = await supabase
          .from(table)
          .select(select)
          .eq(idField, id)
          .single();
        
        // Use type assertion to bypass TypeScript errors
        return {
          data: data as T,
          error: error,
          status: error ? 400 : 200,
          message: error ? error.message : undefined
        };
      } catch (err: any) {
        return {
          data: null as unknown as T,
          error: err,
          status: 500,
          message: err.message
        };
      }
    },
    
    // Insert data with type assertion approach
    insert: async <T>(
      table: string,
      data: Record<string, any>
    ): Promise<APIResponse<T>> => {
      try {
        const response = await supabase
          .from(table)
          .insert(data);
        
        // Use type assertion to bypass TypeScript errors
        return {
          data: (response.data?.[0] || null) as T,
          error: response.error,
          status: response.error ? 400 : 200,
          message: response.error ? response.error.message : undefined
        };
      } catch (err: any) {
        return {
          data: null as unknown as T,
          error: err,
          status: 500,
          message: err.message
        };
      }
    },
    
    // Update data with type assertion approach
    update: async <T>(
      table: string,
      id: string,
      data: Record<string, any>,
      idField: string = 'id'
    ): Promise<APIResponse<T>> => {
      try {
        const response = await supabase
          .from(table)
          .update(data)
          .eq(idField, id);
        
        // Use type assertion to bypass TypeScript errors
        return {
          data: (response.data?.[0] || null) as T,
          error: response.error,
          status: response.error ? 400 : 200,
          message: response.error ? response.error.message : undefined
        };
      } catch (err: any) {
        return {
          data: null as unknown as T,
          error: err,
          status: 500,
          message: err.message
        };
      }
    },
    
    // Delete data with type assertion approach
    delete: async <T>(
      table: string,
      id: string,
      idField: string = 'id'
    ): Promise<APIResponse<T>> => {
      try {
        const response = await supabase
          .from(table)
          .delete()
          .eq(idField, id);
        
        // Use type assertion to bypass TypeScript errors
        return {
          data: (response.data?.[0] || null) as T,
          error: response.error,
          status: response.error ? 400 : 200,
          message: response.error ? response.error.message : undefined
        };
      } catch (err: any) {
        return {
          data: null as unknown as T,
          error: err,
          status: 500,
          message: err.message
        };
      }
    },
    
    // Execute RPC function
    rpc: async <T>(
      functionName: string,
      params?: Record<string, any>
    ): Promise<APIResponse<T>> => {
      try {
        const { data, error } = await supabase.rpc(functionName, params || {});
        
        return {
          data: data as T,
          error: error,
          status: error ? 400 : 200,
          message: error ? error.message : undefined
        };
      } catch (err: any) {
        return {
          data: null as unknown as T,
          error: err,
          status: 500,
          message: err.message
        };
      }
    }
  },
  
  // Storage operations
  storage: {
    // Upload file
    upload: async (
      bucket: string,
      path: string,
      file: File
    ): Promise<APIResponse<any>> => {
      try {
        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(path, file);
        
        return {
          data: data,
          error: error,
          status: error ? 400 : 200,
          message: error ? error.message : undefined
        };
      } catch (err: any) {
        return {
          data: null,
          error: err,
          status: 500,
          message: err.message
        };
      }
    },
    
    // Download file
    download: async (
      bucket: string,
      path: string
    ): Promise<APIResponse<any>> => {
      try {
        const { data, error } = await supabase.storage
          .from(bucket)
          .download(path);
        
        return {
          data: data,
          error: error,
          status: error ? 400 : 200,
          message: error ? error.message : undefined
        };
      } catch (err: any) {
        return {
          data: null,
          error: err,
          status: 500,
          message: err.message
        };
      }
    },
    
    // Get public URL
    getPublicUrl: (
      bucket: string,
      path: string
    ): string => {
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(path);
      
      return data.publicUrl;
    },
    
    // List files
    list: async (
      bucket: string,
      path?: string
    ): Promise<APIResponse<any>> => {
      try {
        const { data, error } = await supabase.storage
          .from(bucket)
          .list(path || '');
        
        return {
          data: data,
          error: error,
          status: error ? 400 : 200,
          message: error ? error.message : undefined
        };
      } catch (err: any) {
        return {
          data: null,
          error: err,
          status: 500,
          message: err.message
        };
      }
    },
    
    // Remove file
    remove: async (
      bucket: string,
      paths: string[]
    ): Promise<APIResponse<any>> => {
      try {
        const { data, error } = await supabase.storage
          .from(bucket)
          .remove(paths);
        
        return {
          data: data,
          error: error,
          status: error ? 400 : 200,
          message: error ? error.message : undefined
        };
      } catch (err: any) {
        return {
          data: null,
          error: err,
          status: 500,
          message: err.message
        };
      }
    }
  }
};

export default TypeAssertionSupabaseService;
