"use client";

import { useState } from "react";
import { createPaymentRecord } from "@/services/payments.service";
import { updateApplicationStatus } from "@/services/applications.service";
import { VisaApplication, PaymentType } from "@/types";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, DollarSign } from "lucide-react";
import { useAuth } from "@/features/auth/AuthContext";

interface Props {
  application: VisaApplication;
  onSuccess?: () => void;
}

export function AssignPaymentDialog({ application, onSuccess }: Props) {
  const { appUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<PaymentType>("registration");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAssign = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await createPaymentRecord(
        application.id,
        application.userId,
        parseFloat(amount),
        type
      );
      await updateApplicationStatus(
        application.id,
        "waiting_payment",
        appUser!.uid,
        type === "registration"
          ? "Registration fee assigned. Please complete payment."
          : "Final fee assigned. Please complete your final payment."
      );
      setOpen(false);
      setAmount("");
      onSuccess?.();
    } catch (e: any) {
      setError(e.message || "Failed to assign payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-1.5">
          <CreditCard className="h-3.5 w-3.5" />
          Assign Fee
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Payment Fee</DialogTitle>
          <DialogDescription>
            Set the fee amount for <strong>{application.fullName}</strong>. The applicant will see the Pay Now button.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <Label>Fee Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as PaymentType)}>
              <SelectTrigger className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="registration">Registration / Document Fee</SelectItem>
                <SelectItem value="final">Final Visa Fee</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Amount (USD)</Label>
            <div className="relative mt-1.5">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                min="1"
                step="0.01"
                placeholder="0.00"
                className="pl-8"
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setError(""); }}
              />
            </div>
          </div>
          {error && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-700">
            <strong>Note:</strong> Application status will automatically update to "Waiting Payment".
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAssign} disabled={loading || !amount}>
            {loading ? "Assigning..." : "Assign Payment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}