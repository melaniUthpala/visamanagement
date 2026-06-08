"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/features/auth/AuthContext";
import { getUserApplications } from "@/services/applications.service";
import { getApplicationPayments, updatePaymentStatus } from "@/services/payments.service";
import { Payment } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, CheckCircle, XCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function PaymentsPage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState<string | null>(null);

  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");
  const paymentId = searchParams.get("paymentId");

  useEffect(() => {
  if (!user?.uid) return;
  
  let mounted = true;
  
  const fetchPayments = async () => {
    try {
      const apps = await getUserApplications(user.uid);
      if (!mounted) return;
      const app = apps[0];
      if (!app) {
        setLoading(false);
        return;
      }
      const p = await getApplicationPayments(app.id);
      if (!mounted) return;
      setPayments(p);
    } catch (err) {
      console.error("Failed to fetch payments:", err);
    } finally {
      if (mounted) setLoading(false);
    }
  };

  fetchPayments();
  
  return () => { mounted = false; };
}, [user?.uid]);
  useEffect(() => {
    if (success && paymentId) {
      updatePaymentStatus(paymentId, "completed");
      setPayments(prev =>
        prev.map(p => p.id === paymentId ? { ...p, status: "completed" } : p)
      );
    }
  }, [success, paymentId]);

  const handlePay = async (payment: Payment) => {
    setPayingId(payment.id);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.abs(payment.amount),
          paymentId: payment.id,
          applicationId: payment.applicationId,
        }),
      });
      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      console.error(err);
      setPayingId(null);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Payments</h1>

      {success && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          <CheckCircle className="h-5 w-5" />
          Payment successful! Thank you.
        </div>
      )}

      {canceled && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <XCircle className="h-5 w-5" />
          Payment canceled.
        </div>
      )}

      {payments.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            No payments assigned yet.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {payments.map((p) => (
            <Card key={p.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base capitalize">{p.type} Fee</CardTitle>
                  <Badge variant={p.status === "completed" ? "default" : "secondary"}>
                    {p.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="text-2xl font-bold">{formatCurrency(Math.abs(p.amount))}</span>
                {p.status !== "completed" && (
                  <Button
                    onClick={() => handlePay(p)}
                    disabled={payingId === p.id}
                    className="flex items-center gap-2"
                  >
                    <CreditCard className="h-4 w-4" />
                    {payingId === p.id ? "Redirecting..." : "Pay Now"}
                  </Button>
                )}
                {p.status === "completed" && (
                  <span className="text-green-600 flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" /> Paid
                  </span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}