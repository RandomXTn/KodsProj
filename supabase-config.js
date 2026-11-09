// Supabase Configuration for ELORA Accessories
// Replace with your actual Supabase project credentials

const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // e.g., https://xxxxx.supabase.co
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Enable/disable Supabase (set to false to use local storage fallback)
const SUPABASE_ENABLED = false; // Set to true after configuring your Supabase project

// Export configuration
window.ELORA_SUPABASE = {
  client: supabase,
  enabled: SUPABASE_ENABLED,
  url: SUPABASE_URL
};
