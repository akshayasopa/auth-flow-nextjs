"use client";

import Link from "next/link";
import useLogin from "@/hooks/useLogin";

export default function LoginForm() {
  const { email, setEmail, password, setPassword, errors, submitting, handleSubmit } = useLogin();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-[300px]">
      <h1>Login</h1>

      {errors.form && <p className="text-red-500">{errors.form}</p>}

      <div className="flex flex-col gap-1">
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? "Logging in..." : "Login"}
      </button>

      <p>Don't have an account? <Link href="/signup">Sign up</Link></p>
    </form>
  );
}