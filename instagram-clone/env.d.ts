/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_KEY: string;
  // other `VITE_` keys...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
