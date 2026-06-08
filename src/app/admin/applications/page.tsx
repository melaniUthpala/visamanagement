"use client";

import { useAllApplications } from "@/hooks/useApplications";
import { updateApplicationStatus } from "@/services/applications.service";
import { useAuth } from "@/features/auth/AuthContext";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { VisaApplication, ApplicationStatus } from "@/types";
import { Search, Filter, Eye, Download } from "lucide-react";
import Link from "next/link";

const STATUS_OPTIONS: ApplicationStatus[] = [
  "pending_review","approved","rejected","needs_correction",
  "under_review","processing","waiting_payment","payment_completed",
  "interview_scheduled","completed",
];

export default function AdminApplicationsPage() {
  const { appUser } = useAuth();
  const { applications, loading, refetch } = useAllApplications();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedApp, setSelectedApp] = useState<VisaApplication | null>(null);
  const [newStatus, setNewStatus] = useState<ApplicationStatus>("pending_review");
  const [remarks, setRemarks] = useState("");
  const [updating, setUpdating] = useState(false);

  const filtered = applications.filter((a) => {
    const matchSearch =
      a.fullName.toLowerCase().includes(search.toLowerCase()) ||
      a.passportNumber.toLowerCase().includes(search.toLowerCase()) ||
      a.userEmail.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleUpdateStatus = async () => {
    if (!selectedApp || !appUser) return;
    setUpdating(true);
    try {
      await updateApplicationStatus(selectedApp.id, newStatus, appUser.uid, remarks);
      await refetch();
      setSelectedApp(null);
      setRemarks("");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Applications</h1>
          <p className="text-muted-foreground">{applications.length} total applications</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />Export CSV
        </Button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, passport, email..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s} value={s}>{s.replace(/_/g, " ")}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-4 font-medium">Applicant</th>
                  <th className="text-left p-4 font-medium">Country</th>
                  <th className="text-left p-4 font-medium">Job</th>
                  <th className="text-left p-4 font-medium">Passport</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((app) => (
                  <tr key={app.id} className="border-b hover:bg-muted/20 transition-colors">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{app.fullName}</p>
                        <p className="text-xs text-muted-foreground">{app.userEmail}</p>
                      </div>
                    </td>
                    <td className="p-4">{app.country}</td>
                    <td className="p-4">{app.jobCategory}</td>
                    <td className="p-4 font-mono text-xs">{app.passportNumber}</td>
                    <td className="p-4"><StatusBadge status={app.status} /></td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link href={`/admin/applications/${app.id}`}>
                          <Button variant="ghost" size="sm"><Eye className="h-3.5 w-3.5" /></Button>
                        </Link>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => { setSelectedApp(app); setNewStatus(app.status); }}
                            >
                              Update
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Update Application Status</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div>
                                <Label>New Status</Label>
                                <Select value={newStatus} onValueChange={(v) => setNewStatus(v as ApplicationStatus)}>
                                  <SelectTrigger><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    {STATUS_OPTIONS.map((s) => (
                                      <SelectItem key={s} value={s}>{s.replace(/_/g, " ")}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label>Admin Remarks (optional)</Label>
                                <Textarea
                                  value={remarks}
                                  onChange={(e) => setRemarks(e.target.value)}
                                  placeholder="Add notes for the applicant..."
                                  rows={3}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={handleUpdateStatus} disabled={updating}>
                                {updating ? "Updating..." : "Update Status"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">No applications found.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
