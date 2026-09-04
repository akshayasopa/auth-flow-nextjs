"use client";

import Link from "next/link";
import useSignup from "@/hooks/useSignup";

export default function SignupForm() {
  const {
    name, setName, email, setEmail, password, setPassword,
    confirmPassword, setConfirmPassword, errors, submitting, handleSubmit,
  } = useSignup();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-[300px]">
      <h1>Sign Up</h1>

      {errors.form && <p className="text-red-500">{errors.form}</p>}

      <div className="flex flex-col gap-1">
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? "Creating account..." : "Sign Up"}
      </button>

      <p>Already have an account? <Link href="/login">Login</Link></p>
    </form>
  );
}