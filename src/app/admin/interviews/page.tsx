"use client";

import { useAllInterviews } from "@/hooks/useInterviews";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Monitor, MapPin } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AdminInterviewsPage() {
  const { interviews, loading } = useAllInterviews();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Interviews</h1>
        <p className="text-muted-foreground">{interviews.length} scheduled interviews</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {interviews.map((interview) => (
          <Card key={interview.id} className="border-indigo-100 hover:shadow-md transition-shadow">
            <CardContent className="pt-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-base">{formatDate(interview.date)}</p>
                  <p className="text-sm text-muted-foreground">{interview.time}</p>
                </div>
                <Badge className={interview.mode === "online" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}>
                  {interview.mode === "online" ? <Monitor className="h-3 w-3 mr-1" /> : <MapPin className="h-3 w-3 mr-1" />}
                  {interview.mode}
                </Badge>
              </div>
              <p className="text-xs font-mono text-muted-foreground">App: {interview.applicationId.slice(0, 14)}...</p>
              {interview.notes && (
                <p className="text-sm text-muted-foreground mt-2 border-t pt-2">{interview.notes}</p>
              )}
            </CardContent>
          </Card>
        ))}
        {interviews.length === 0 && (
          <div className="col-span-3 text-center py-12 text-muted-foreground">
            <Calendar className="h-10 w-10 mx-auto mb-3 opacity-30" />
            No interviews scheduled yet.
          </div>
        )}
      </div>
    </div>
  );
}
