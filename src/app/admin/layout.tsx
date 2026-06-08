"use client";

import { useAuth } from "@/features/auth/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Sidebar } from "@/components/shared/Sidebar";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { appUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !appUser) router.push("/login");
    if (!loading && appUser?.role !== "admin") router.push("/dashboard");
  }, [appUser, loading, router]);

  if (loading) return <LoadingSpinner className="min-h-screen" />;
  if (!appUser || appUser.role !== "admin") return null;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
