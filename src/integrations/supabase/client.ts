// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qgutzvqkdjpvvqdztbko.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFndXR6dnFrZGpwdnZxZHp0YmtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMjM4MzEsImV4cCI6MjA2NDY5OTgzMX0.ZJqyg5luv1DE7-yYsBI-2bWshoHr_SWvmg7RoGgj0Jk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);