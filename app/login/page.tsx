"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Logo } from "@/components/ui/Logo";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState("sign-in");
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    setView("check-email");
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.push("/");
  };

  const handleGuestAccount = async () => {
    await supabase.auth.signInWithPassword({
      email: "b.radvatne@gmail.com",
      password: "password",
    });
    router.push("/");
  };

  return (
    <div className="flex w-full h-full justify-center items-center bg-slate-50 dark:bg-darkgrey">
      <div className="flex-1 flex flex-col w-full max-w-sm justify-center gap-2">
        <Logo />

        {view === "check-email" ? (
          <p className="text-center text-mediumgrey">
            Check <span className="font-bold text-mediumgrey">{email}</span> to
            continue signing up
          </p>
        ) : (
          <form
            className="flex-1 flex flex-col w-full max-w-sm justify-center gap-2"
            onSubmit={view === "sign-in" ? handleSignIn : handleSignUp}
          >
            <label className="text-md text-mediumgrey mt-6" htmlFor="email">
              Email
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6 text-black dark:text-mediumgrey focus:border-purplehover"
              name="email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="you@example.com"
            />
            <label className="text-md text-mediumgrey" htmlFor="password">
              Password
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6 text-black dark:text-mediumgrey focus:border-purplehover"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder=""
            />
            {view === "sign-in" ? (
              <>
                <button className="bg-purple hover:bg-purplehover rounded px-4 py-2 text-white mb-6">
                  Sign In
                </button>
                <p className="text-sm text-neutral-500 text-center">
                  Don't have an account?
                  <button
                    className="ml-1 text-purplehover underline"
                    onClick={() => setView("sign-up")}
                  >
                    Sign up now
                  </button>
                </p>
                <p className="text-sm text-neutral-500 text-center">
                  Want to take a tour?
                  <button
                    className="ml-1 text-purplehover underline"
                    onClick={() => handleGuestAccount()}
                  >
                    Sign in with a guest account
                  </button>
                </p>
              </>
            ) : null}
            {view === "sign-up" ? (
              <>
                <button className="bg-purple rounded px-4 py-2 text-white mb-6">
                  Sign Up
                </button>
                <p className="text-sm text-neutral-500 text-center">
                  Already have an account?
                  <button
                    className="ml-1 text-mediumgrey underline"
                    onClick={() => setView("sign-in")}
                  >
                    Sign In Now
                  </button>
                </p>
              </>
            ) : null}
          </form>
        )}
      </div>
    </div>
  );
}
