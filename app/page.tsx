import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Index() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const test = await supabase.auth.getSession();
  const thing = await supabase.from("board").select();

  console.log(thing);
  return <div>Hello World </div>;
}
