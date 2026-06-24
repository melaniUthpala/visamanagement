"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/features/auth/AuthContext";
import { getApplicationPayments } from "@/services/payments.service";
import { getUserApplications } from "@/services/applications.service";
import { Payment } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard, CheckCircle, Clock, XCircle,
  ArrowRight, ShieldCheck, RefreshCw,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const STATUS_CONFIG = {
  paid: {
    icon: <CheckCircle className="h-4 w-4 text-emerald-600" />,
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    label: "Paid",
  },
  pending: {
    icon: <Clock className="h-4 w-4 text-amber-500" />,
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    label: "Pending",
  },
  failed: {
    icon: <XCircle className="h-4 w-4 text-red-500" />,
    badge: "bg-red-100 text-red-700 border-red-200",
    label: "Failed",
  },
};

function PaymentsContent() {
  const { appUser } = useAuth();
  const searchParams = useSearchParams();

  const [payments, setPayments] = useState<Payment[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [payingId, setPayingId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error" | "cancelled";
    msg: string;
  } | null>(null);

  const fetchAll = useCallback(async (uid: string) => {
    try {
      const apps = await getUserApplications(uid);
      if (apps.length > 0) {
        const data = await getApplicationPayments(apps[0].id);
        setPayments(data);
      } else {
        setPayments([]);
      }
    } catch (e) {
      console.error("Failed to load payments:", e);
      setPayments([]);
    } finally {
      setInitialized(true);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (appUser?.uid) {
      fetchAll(appUser.uid);
    } else {
      // Wait max 5 seconds for auth, then show empty state
      const timer = setTimeout(() => setInitialized(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [appUser?.uid, fetchAll]);

  // Handle Stripe redirect
  useEffect(() => {
    const success = searchParams.get("success");
    const cancelled = searchParams.get("cancelled");
    if (success === "true") {
      setToast({ type: "success", msg: "Payment successful! 🎉 Your application has been updated." });
      if (appUser?.uid) fetchAll(appUser.uid);
    }
    if (cancelled === "true") {
      setToast({ type: "cancelled", msg: "Payment cancelled. You can try again anytime." });
    }
    window.history.replaceState({}, "", "/dashboard/payments");
  }, [searchParams]); // eslint-disable-line

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const handleRefresh = () => {
    if (!appUser?.uid) return;
    setRefreshing(true);
    fetchAll(appUser.uid);
  };

  const handlePay = async (payment: Payment) => {
    setPayingId(payment.id);
    try {
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: payment.amount,
          type: payment.type,
          applicationId: payment.applicationId,
          paymentId: payment.id,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setToast({ type: "error", msg: data.error || "Failed to initiate payment." });
      }
    } catch {
      setToast({ type: "error", msg: "Network error. Please try again." });
    } finally {
      setPayingId(null);
    }
  };

  // Show skeleton only briefly while initializing
  if (!initialized) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-8 w-32 bg-muted animate-pulse rounded" />
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
        <div className="h-40 bg-muted animate-pulse rounded-xl" />
      </div>
    );
  }

  const totalPaid = payments.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  const totalPending = payments.filter((p) => p.status === "pending").reduce((s, p) => s + p.amount, 0);

  return (
    <div className="p-6 space-y-6">
      {toast && (
        <div className={`fixed top-6 right-6 z-50 rounded-xl border px-5 py-4 shadow-lg text-sm font-medium max-w-sm ${
          toast.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800"
          : toast.type === "cancelled" ? "bg-amber-50 border-amber-200 text-amber-800"
          : "bg-red-50 border-red-200 text-red-800"
        }`}>
          {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Payments</h1>
          <p className="text-muted-foreground">Manage your application fees securely via Stripe.</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {payments.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-5">
              <p className="text-xs text-muted-foreground">Total Payments</p>
              <p className="text-2xl font-bold mt-1">{payments.length}</p>
            </CardContent>
          </Card>
          <Card className="border-emerald-200 bg-emerald-50/40">
            <CardContent className="pt-5">
              <p className="text-xs text-emerald-700">Amount Paid</p>
              <p className="text-2xl font-bold text-emerald-700 mt-1">{formatCurrency(totalPaid)}</p>
            </CardContent>
          </Card>
          <Card className="border-amber-200 bg-amber-50/40">
            <CardContent className="pt-5">
              <p className="text-xs text-amber-700">Amount Due</p>
              <p className="text-2xl font-bold text-amber-700 mt-1">{formatCurrency(totalPending)}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {payments.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center py-16 text-center">
            <CreditCard className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="font-semibold text-lg mb-1">No Payments Yet</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Payment details will appear here once assigned by the admin.
            </p>
            {appUser && (
              <Button variant="outline" size="sm" className="mt-4" onClick={handleRefresh}>
                <RefreshCw className="h-3.5 w-3.5 mr-2" /> Refresh
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {payments.map((payment) => {
            const config = STATUS_CONFIG[payment.status];
            const isPending = payment.status === "pending";
            const isFailed = payment.status === "failed";

            return (
              <Card key={payment.id} className={`transition-all ${isPending ? "border-amber-200 shadow-sm" : ""} ${isFailed ? "border-red-200" : ""}`}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${
                        payment.status === "paid" ? "bg-emerald-100"
                        : payment.status === "pending" ? "bg-amber-100" : "bg-red-100"
                      }`}>
                        <CreditCard className={`h-5 w-5 ${
                          payment.status === "paid" ? "text-emerald-600"
                          : payment.status === "pending" ? "text-amber-600" : "text-red-600"
                        }`} />
                      </div>
                      <div>
                        <p className="font-semibold text-base">
                          {payment.type === "registration" ? "Registration Fee" : "Final Visa Fee"}
                        </p>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {payment.type === "registration"
                            ? "Initial processing and document review fee"
                            : "Final visa processing and approval fee"}
                        </p>
                        {payment.stripeSessionId && (
                          <p className="text-xs text-muted-foreground/60 font-mono mt-1">
                            Session: {payment.stripeSessionId.slice(0, 24)}...
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3 shrink-0">
                      <p className="text-2xl font-bold">{formatCurrency(payment.amount)}</p>
                      <div className="flex items-center gap-2">
                        <Badge className={`border ${config.badge} flex items-center gap-1.5`}>
                          {config.icon}
                          {config.label}
                        </Badge>
                        {isPending && (
                          <Button size="sm" onClick={() => handlePay(payment)} disabled={payingId === payment.id} className="gap-2">
                            {payingId === payment.id ? (
                              <><RefreshCw className="h-3.5 w-3.5 animate-spin" />Redirecting...</>
                            ) : (
                              <>Pay Now <ArrowRight className="h-3.5 w-3.5" /></>
                            )}
                          </Button>
                        )}
                        {isFailed && (
                          <Button size="sm" variant="outline" onClick={() => handlePay(payment)} disabled={payingId === payment.id}>
                            Retry Payment
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {isPending && (
                    <>
                      <Separator className="my-4" />
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                        Secure payment powered by Stripe. Test card:{" "}
                        <code className="bg-muted px-1.5 py-0.5 rounded font-mono">4242 4242 4242 4242</code>
                        {" "}· Exp: any future date · CVC: any 3 digits
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/60 pt-2">
        <ShieldCheck className="h-3.5 w-3.5" />
        All payments are processed securely by Stripe. RO94 Holdings does not store your card details.
      </div>
    </div>
  );
}

export default function PaymentsPage() {
  return (
    <Suspense fallback={
      <div className="p-6 space-y-4">
        <div className="h-8 w-32 bg-muted animate-pulse rounded" />
        <div className="h-40 bg-muted animate-pulse rounded-xl" />
      </div>
    }>
      <PaymentsContent />
    </Suspense>
  );
}