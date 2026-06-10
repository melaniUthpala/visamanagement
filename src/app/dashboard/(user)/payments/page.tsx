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
  const { firebaseUser } = useAuth();
  const searchParams = useSearchParams();

  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState<string | null>(null);

  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");
  const paymentId = searchParams.get("paymentId");

  useEffect(() => {
    let mounted = true;

    const fetchPayments = async () => {
      try {
        if (!firebaseUser?.uid) {
          if (mounted) setLoading(false);
          return;
        }

        console.log("Firebase User UID:", firebaseUser.uid);

        const apps = await getUserApplications(firebaseUser.uid);

        console.log("Applications:", apps);

        if (!mounted) return;

        if (!apps || apps.length === 0) {
          setPayments([]);
          setLoading(false);
          return;
        }

        const app = apps[0];

        const paymentList = await getApplicationPayments(app.id);

        console.log("Payments:", paymentList);

        if (!mounted) return;

        setPayments(paymentList || []);
      } catch (err) {
        console.error("Failed to fetch payments:", err);

        if (mounted) {
          setPayments([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchPayments();

    return () => {
      mounted = false;
    };
  }, [firebaseUser?.uid]);

  useEffect(() => {
    const updateStatus = async () => {
      if (success && paymentId) {
        try {
          await updatePaymentStatus(paymentId, "completed");

          setPayments((prev) =>
            prev.map((p) =>
              p.id === paymentId
                ? { ...p, status: "completed" }
                : p
            )
          );
        } catch (err) {
          console.error("Failed to update payment:", err);
        }
      }
    };

    updateStatus();
  }, [success, paymentId]);

  const handlePay = async (payment: Payment) => {
    try {
      setPayingId(payment.id);

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.abs(payment.amount),
          paymentId: payment.id,
          applicationId: payment.applicationId,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create Stripe session");
      }

      const data = await res.json();

      if (!data?.url) {
        throw new Error("Stripe URL not returned");
      }

      window.location.href = data.url;
    } catch (err) {
      console.error("Payment Error:", err);
      setPayingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Payments
      </h1>

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
                  <CardTitle className="text-base capitalize">
                    {p.type} Fee
                  </CardTitle>

                  <Badge
                    variant={
                      p.status === "completed"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {p.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="flex items-center justify-between">
                <span className="text-2xl font-bold">
                  {formatCurrency(Math.abs(p.amount))}
                </span>

                {p.status !== "completed" ? (
                  <Button
                    onClick={() => handlePay(p)}
                    disabled={payingId === p.id}
                    className="flex items-center gap-2"
                  >
                    <CreditCard className="h-4 w-4" />

                    {payingId === p.id
                      ? "Redirecting..."
                      : "Pay Now"}
                  </Button>
                ) : (
                  <span className="text-green-600 flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    Paid
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