import {
  addDoc, collection, getDocs, query, where,
  updateDoc, doc, serverTimestamp, deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { Payment, PaymentType, PaymentStatus } from "@/types";

export async function createPaymentRecord(
  applicationId: string,
  userId: string,
  amount: number,
  type: PaymentType
): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTIONS.PAYMENTS), {
    applicationId,
    userId,
    amount,
    type,
    status: "pending" as PaymentStatus,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updatePaymentStatus(
  paymentId: string,
  status: PaymentStatus,
  stripeSessionId?: string
) {
  await updateDoc(doc(db, COLLECTIONS.PAYMENTS, paymentId), {
    status,
    ...(stripeSessionId && { stripeSessionId }),
  });
}

export async function getApplicationPayments(applicationId: string): Promise<Payment[]> {
  const q = query(collection(db, COLLECTIONS.PAYMENTS), where("applicationId", "==", applicationId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Payment));
}

export async function getAllPayments(): Promise<Payment[]> {
  const snap = await getDocs(collection(db, COLLECTIONS.PAYMENTS));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Payment));
}

export async function deletePaymentRecord(paymentId: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTIONS.PAYMENTS, paymentId));
}