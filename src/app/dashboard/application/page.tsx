"use client";

import { useUserApplications } from "@/hooks/useApplications";
import { ApplicationForm } from "@/components/forms/ApplicationForm";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ApplicationTimeline } from "@/components/shared/ApplicationTimeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function ApplicationPage() {
  const { applications, loading } = useUserApplications();

  if (loading) return <LoadingSpinner />;

  if (applications.length > 0) {
    const app = applications[0];
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">My Application</h1>
          <p className="text-muted-foreground">Track your application details and progress.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Application Details</CardTitle>
                <StatusBadge status={app.status} />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-muted-foreground">Full Name</span><p className="font-medium mt-0.5">{app.fullName}</p></div>
                  <div><span className="text-muted-foreground">Date of Birth</span><p className="font-medium mt-0.5">{app.dateOfBirth}</p></div>
                  <div><span className="text-muted-foreground">Gender</span><p className="font-medium mt-0.5 capitalize">{app.gender}</p></div>
                  <div><span className="text-muted-foreground">Passport</span><p className="font-medium mt-0.5 font-mono">{app.passportNumber}</p></div>
                  <div><span className="text-muted-foreground">Country</span><p className="font-medium mt-0.5">{app.country}</p></div>
                  <div><span className="text-muted-foreground">Job Category</span><p className="font-medium mt-0.5">{app.jobCategory}</p></div>
                  <div className="col-span-2"><span className="text-muted-foreground">Address</span><p className="font-medium mt-0.5">{app.address}</p></div>
                </div>
                {app.adminRemarks && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
                    <strong>Admin Remarks:</strong> {app.adminRemarks}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardContent className="pt-6">
                <ApplicationTimeline status={app.status} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">New Visa Application</h1>
        <p className="text-muted-foreground">Complete all details to submit your application.</p>
      </div>
      <ApplicationForm />
    </div>
  );
}
