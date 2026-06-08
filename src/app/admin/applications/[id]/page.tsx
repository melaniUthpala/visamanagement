"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getApplication, updateApplicationStatus } from "@/services/applications.service";
import { getApplicationPayments, deletePaymentRecord } from "@/services/payments.service";
import { getUserInterviews, scheduleInterview } from "@/services/interviews.service";
import { VisaApplication, Payment, Interview, ApplicationStatus } from "@/types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ApplicationTimeline } from "@/components/shared/ApplicationTimeline";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { AssignPaymentDialog } from "@/components/admin/AssignPaymentDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, CreditCard, CheckCircle, Clock, XCircle } from "lucide-react";
import Link from "next/link";
import { formatCurrency, STATUS_LABELS } from "@/lib/utils";
import { useAuth } from "@/features/auth/AuthContext";

const STATUS_OPTIONS: ApplicationStatus[] = [
  "pending_review","approved","rejected","needs_correction",
  "under_review","processing","waiting_payment","payment_completed",
  "interview_scheduled","completed",
];

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { appUser } = useAuth();
  const [app, setApp] = useState<VisaApplication | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  const [newStatus, setNewStatus] = useState<ApplicationStatus>("pending_review");
  const [remarks, setRemarks] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const [intDate, setIntDate] = useState("");
  const [intTime, setIntTime] = useState("");
  const [intMode, setIntMode] = useState<"online" | "physical">("online");
  const [intNotes, setIntNotes] = useState("");
  const [scheduling, setScheduling] = useState(false);

  const refresh = async () => {
    if (!id) return;
    const [a, p] = await Promise.all([
      getApplication(id),
      getApplicationPayments(id),
    ]);
    setApp(a);
    setPayments(p);
    if (a) {
      const i = await getUserInterviews(a.userId);
      setInterviews(i.filter(x => x.applicationId === id));
    }
  };

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (app) setNewStatus(app.status);
  }, [app]);

  const handleUpdateStatus = async () => {
    if (!app || !appUser) return;
    setUpdatingStatus(true);
    await updateApplicationStatus(app.id, newStatus, appUser.uid, remarks || undefined);
    await refresh();
    setRemarks("");
    setUpdatingStatus(false);
  };

  const handleSchedule = async () => {
    if (!app) return;
    setScheduling(true);
    await scheduleInterview(app.id, app.userId, intDate, intTime, intMode, intNotes || undefined);
    await updateApplicationStatus(app.id, "interview_scheduled", appUser!.uid);
    await refresh();
    setScheduling(false);
    setIntDate(""); setIntTime(""); setIntNotes("");
  };

  if (loading) return <LoadingSpinner />;
  if (!app) return <div className="p-6 text-muted-foreground">Application not found.</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 flex-wrap">
        <Link href="/admin/applications">
          <Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" />Back</Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{app.fullName}</h1>
          <p className="text-muted-foreground text-sm">{app.userEmail} · Passport: <span className="font-mono">{app.passportNumber}</span></p>
        </div>
        <StatusBadge status={app.status} />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-5">

          {/* Application Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Application Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                {[
                  ["Country", app.country],
                  ["Job Category", app.jobCategory],
                  ["Date of Birth", app.dateOfBirth],
                  ["Gender", app.gender],
                  ["Passport", app.passportNumber],
                ].map(([label, val]) => (
                  <div key={label}>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="font-medium capitalize mt-0.5">{val}</p>
                  </div>
                ))}
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="font-medium mt-0.5">{app.address}</p>
                </div>
                {app.adminRemarks && (
                  <div className="col-span-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-xs text-amber-700 font-medium">Admin Remarks</p>
                    <p className="text-sm text-amber-800 mt-0.5">{app.adminRemarks}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Update Status */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Update Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Select value={newStatus} onValueChange={(v) => setNewStatus(v as ApplicationStatus)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s}>{STATUS_LABELS[s]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Add remarks (optional)..."
                rows={2}
              />
              <Button onClick={handleUpdateStatus} disabled={updatingStatus} size="sm">
                {updatingStatus ? "Updating..." : "Update Status"}
              </Button>
            </CardContent>
          </Card>

          {/* Payments */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <CreditCard className="h-4 w-4" />Payments
              </CardTitle>
              <AssignPaymentDialog application={app} onSuccess={refresh} />
            </CardHeader>
            <CardContent>
              {payments.length === 0 ? (
                <p className="text-sm text-muted-foreground py-3 text-center">
                  No payments yet. Use "Assign Fee" to add one.
                </p>
              ) : (
                <div className="space-y-2">
                  {payments.map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
                      <div className="flex items-center gap-2">
                        {p.status === "paid" ? <CheckCircle className="h-4 w-4 text-emerald-600" />
                          : p.status === "pending" ? <Clock className="h-4 w-4 text-amber-500" />
                          : <XCircle className="h-4 w-4 text-red-500" />}
                        <div>
                          <p className="font-medium text-sm capitalize">{p.type} Fee</p>
                          <p className="text-xs text-muted-foreground capitalize">{p.status}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold">{formatCurrency(p.amount)}</span>
                        <Badge className={
                          p.status === "paid" ? "bg-emerald-100 text-emerald-700"
                          : p.status === "pending" ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                        }>
                          {p.status}
                        </Badge>
                        {/* 🗑 Delete Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 h-7 w-7 p-0"
                          onClick={async () => {
                            if (!confirm("Delete this payment?")) return;
                            await deletePaymentRecord(p.id);
                            setPayments(prev => prev.filter(x => x.id !== p.id));
                          }}
                        >
                          🗑
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Schedule Interview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4" />Schedule Interview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {interviews.map((i) => (
                <div key={i.id} className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 text-sm">
                  <p className="font-semibold text-indigo-800">{i.date} at {i.time}</p>
                  <p className="text-indigo-600 capitalize">{i.mode} interview</p>
                  {i.notes && <p className="text-indigo-700 mt-1">{i.notes}</p>}
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Date</Label>
                  <Input type="date" value={intDate} onChange={(e) => setIntDate(e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label className="text-xs">Time</Label>
                  <Input type="time" value={intTime} onChange={(e) => setIntTime(e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label className="text-xs">Mode</Label>
                  <Select value={intMode} onValueChange={(v) => setIntMode(v as any)}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="physical">Physical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Notes</Label>
                  <Input value={intNotes} onChange={(e) => setIntNotes(e.target.value)} placeholder="Optional" className="mt-1" />
                </div>
              </div>
              <Button size="sm" onClick={handleSchedule} disabled={scheduling || !intDate || !intTime}>
                {scheduling ? "Scheduling..." : "Schedule Interview"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <div>
          <Card className="sticky top-6">
            <CardContent className="pt-6">
              <ApplicationTimeline status={app.status} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}