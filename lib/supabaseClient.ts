import { Database } from "@/types/supabase";
import {
  SupabaseClient,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

let supabase: SupabaseClient | null = null;

export function getSupabaseClient() {
  if (!supabase) {
    supabase = createClientComponentClient<Database>();
  }

  return supabase;
}
