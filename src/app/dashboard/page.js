"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) return <p className="p-8">Checking session...</p>;
  if (!user) return null;

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <main className="p-8">
      <h1>Welcome, {user.name}</h1>
      <p>You are logged in as {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </main>
  );
}