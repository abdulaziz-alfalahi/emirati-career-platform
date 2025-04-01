import { createClient } from '@supabase/supabase-js';

// These would normally be in your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://awyosxxqnqxmuoowjwyf.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3eW9zeHhxbnF4bXVvb3dqd3lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MjkwMzUsImV4cCI6MjA1OTAwNTAzNX0.Omb_mkDDwhBRbk7q-Ierae9mtWOLsCoTsWqAo9syf00';

export const supabase = createClient(supabaseUrl, supabaseAnonKey) ;
