import { Database } from "@/types/supabase";
import {
  SupabaseClient,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

let supabase: SupabaseClient<Database> | null = null;

export function getSupabaseClient() {
  if (!supabase) {
    supabase = createClientComponentClient<Database>();
  }

  return supabase;
}
