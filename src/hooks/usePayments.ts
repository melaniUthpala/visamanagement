"use client";

import { useState, useEffect } from "react";
import { Payment } from "@/types";
import { getAllPayments } from "@/services/payments.service";

export function useAllPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPayments()
      .then(setPayments)
      .finally(() => setLoading(false));
  }, []);

  return { payments, loading };
}
