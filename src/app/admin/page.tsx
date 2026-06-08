"use client";

import { useAllApplications } from "@/hooks/useApplications";
import { useAllPayments } from "@/hooks/usePayments";
import { useAllInterviews } from "@/hooks/useInterviews";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ApplicationsByStatus, ApplicationsByCountry, MonthlyPayments } from "@/components/admin/AdminCharts";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { FileText, DollarSign, Clock, Calendar, Users, CheckCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function AdminDashboard() {
  const { applications, loading } = useAllApplications();
  const { payments } = useAllPayments();
  const { interviews } = useAllInterviews();

  if (loading) return <LoadingSpinner />;

  const totalRevenue = payments.filter(p => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  const pending = applications.filter(a => a.status === "pending_review").length;
  const processing = applications.filter(a => ["processing","under_review"].includes(a.status)).length;
  const completed = applications.filter(a => a.status === "completed").length;

  // Chart data
  const statusCounts = Object.entries(
    applications.reduce((acc, a) => {
      acc[a.status] = (acc[a.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([status, count]) => ({ status: status.replace(/_/g, " "), count }));

  const countryCounts = Object.entries(
    applications.reduce((acc, a) => {
      acc[a.country] = (acc[a.country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([country, count]) => ({ country, count })).slice(0, 6);

  const monthlyData = [
    { month: "Jan", amount: 2400 }, { month: "Feb", amount: 1800 },
    { month: "Mar", amount: 3200 }, { month: "Apr", amount: 2900 },
    { month: "May", amount: 4100 }, { month: "Jun", amount: 3600 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of all applications and system activity.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatsCard title="Total Applications" value={applications.length} icon={FileText} colorClass="bg-blue-100 text-blue-600" />
        <StatsCard title="Pending Review" value={pending} icon={Clock} colorClass="bg-amber-100 text-amber-600" />
        <StatsCard title="Processing" value={processing} icon={Users} colorClass="bg-purple-100 text-purple-600" />
        <StatsCard title="Completed" value={completed} icon={CheckCircle} colorClass="bg-green-100 text-green-600" />
        <StatsCard title="Revenue" value={formatCurrency(totalRevenue)} icon={DollarSign} colorClass="bg-emerald-100 text-emerald-600" />
        <StatsCard title="Upcoming Interviews" value={interviews.length} icon={Calendar} colorClass="bg-indigo-100 text-indigo-600" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ApplicationsByStatus data={statusCounts} />
        <ApplicationsByCountry data={countryCounts} />
        <MonthlyPayments data={monthlyData} />
      </div>
    </div>
  );
}
