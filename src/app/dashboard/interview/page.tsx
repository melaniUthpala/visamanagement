"use client";

import { useUserInterviews } from "@/hooks/useInterviews";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Monitor, MapPin } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function InterviewPage() {
  const { interviews, loading } = useUserInterviews();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Interview Schedule</h1>
        <p className="text-muted-foreground">View your scheduled interview details.</p>
      </div>

      {interviews.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center py-12 text-center">
            <Calendar className="h-10 w-10 text-muted-foreground/40 mb-3" />
            <h3 className="font-semibold">No Interview Scheduled</h3>
            <p className="text-muted-foreground text-sm">Your interview will appear here once scheduled by our team.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {interviews.map((interview) => (
            <Card key={interview.id} className="border-indigo-200">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-indigo-600" />
                  Interview Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Date</p>
                      <p className="font-semibold">{formatDate(interview.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Time</p>
                      <p className="font-semibold">{interview.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {interview.mode === "online" ? (
                      <Monitor className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                    )}
                    <div>
                      <p className="text-xs text-muted-foreground">Mode</p>
                      <p className="font-semibold capitalize">{interview.mode}</p>
                    </div>
                  </div>
                </div>
                {interview.notes && (
                  <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-lg p-3 text-sm text-indigo-800">
                    <strong>Notes:</strong> {interview.notes}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
