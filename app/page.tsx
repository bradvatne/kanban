import Top from "@/sections/Top";
import { Left } from "@/sections/Left";
import { Right } from "@/sections/Right";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    // This route can only be accessed by authenticated users.
    // Unauthenticated users will be redirected to the `/login` route.
    redirect('/login')
  }
  return (
    <div className="h-full relative">
      <Top />
      <div className="flex test">
        <Left />
        <Right />
      </div>
    </div>
  );
}
