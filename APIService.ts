// Type-safe Supabase implementation with type assertions
import { createClient, SupabaseClient, PostgrestResponse, PostgrestSingleResponse } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://awyosxxqnqxmuoowjwyf.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3eW9zeHhxbnF4bXVvb3dqd3lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MjkwMzUsImV4cCI6MjA1OTAwNTAzNX0.Omb_mkDDwhBRbk7q-Ierae9mtWOLsCoTsWqAo9syf00';
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
    }
  },
  
  // Database operations with type assertions
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
    }
  }
};

export default TypeAssertionSupabaseService;
