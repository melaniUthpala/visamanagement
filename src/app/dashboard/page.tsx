"use client";

import { useAuth } from "@/features/auth/AuthContext";
import { useUserApplications } from "@/hooks/useApplications";
import { useUserInterviews } from "@/hooks/useInterviews";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ApplicationTimeline } from "@/components/shared/ApplicationTimeline";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, CreditCard, Calendar, Plus } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default function UserDashboard() {
  const { appUser } = useAuth();
  const { applications, loading } = useUserApplications();
  const { interviews } = useUserInterviews();

  if (loading) return <LoadingSpinner />;

  const latestApp = applications[0];
  const upcomingInterview = interviews[0];

  const stats = [
    { title: "Total Applications", value: applications.length, icon: FileText, colorClass: "bg-blue-100 text-blue-600" },
    { title: "Under Review", value: applications.filter(a => a.status === "under_review").length, icon: Upload, colorClass: "bg-amber-100 text-amber-600" },
    { title: "Completed", value: applications.filter(a => a.status === "completed").length, icon: CreditCard, colorClass: "bg-green-100 text-green-600" },
    { title: "Interviews", value: interviews.length, icon: Calendar, colorClass: "bg-purple-100 text-purple-600" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {appUser?.name?.split(" ")[0]} 👋</h1>
        <p className="text-muted-foreground">Here&apos;s an overview of your visa applications.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => <StatsCard key={s.title} {...s} />)}
      </div>

      {applications.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center py-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground/40 mb-4" />
            <h3 className="font-semibold text-lg mb-2">No Applications Yet</h3>
            <p className="text-muted-foreground text-sm mb-4">Start your visa application process today.</p>
            <Button asChild>
              <Link href="/dashboard/application"><Plus className="h-4 w-4 mr-2" />New Application</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Latest Application</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{latestApp.country} — {latestApp.jobCategory}</p>
                  <p className="text-sm text-muted-foreground">Passport: {latestApp.passportNumber}</p>
                </div>
                <StatusBadge status={latestApp.status} />
              </div>
              {latestApp.adminRemarks && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
                  <strong>Admin Note:</strong> {latestApp.adminRemarks}
                </div>
              )}
              <ApplicationTimeline status={latestApp.status} />
            </CardContent>
          </Card>

          {upcomingInterview && (
            <Card className="border-indigo-200 bg-indigo-50/30">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-indigo-600" />
                  Upcoming Interview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold text-lg">{formatDate(upcomingInterview.date)}</p>
                  <p className="text-muted-foreground">{upcomingInterview.time}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium bg-indigo-100 text-indigo-700 rounded-full px-3 py-1">
                    {upcomingInterview.mode === "online" ? "🌐 Online" : "🏢 In-Person"}
                  </span>
                  {upcomingInterview.notes && (
                    <p className="text-sm text-muted-foreground mt-2">{upcomingInterview.notes}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
