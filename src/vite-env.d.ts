/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL: string;
    readonly VITE_SUPABASE_ANON_KEY: string;
    readonly VITE_AFFINDA_API_KEY: string;
    readonly VITE_OPENAI_API_KEY: string;
    readonly VITE_MAPBOX_ACCESS_TOKEN: string;
    // Add other environment variables as needed
  }
  
  // This ensures ImportMeta.env has the correct type
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  