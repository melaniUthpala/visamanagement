import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/firebase/config";
import {
  collection, query, where, getDocs,
  updateDoc, doc, serverTimestamp,
} from "firebase/firestore";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { logActivity } from "@/services/activity.service";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { applicationId, type, paymentId } = session.metadata!;

    try {
      // Update payment status
      if (paymentId) {
        await updateDoc(doc(db, COLLECTIONS.PAYMENTS, paymentId), {
          status: "paid",
          stripeSessionId: session.id,
        });
      } else {
        const q = query(
          collection(db, COLLECTIONS.PAYMENTS),
          where("applicationId", "==", applicationId),
          where("type", "==", type),
          where("status", "==", "pending")
        );
        const snap = await getDocs(q);
        for (const d of snap.docs) {
          await updateDoc(doc(db, COLLECTIONS.PAYMENTS, d.id), {
            status: "paid",
            stripeSessionId: session.id,
          });
        }
      }

      // Update application status
      const newStatus = type === "final" ? "payment_completed" : "processing";
      await updateDoc(doc(db, COLLECTIONS.APPLICATIONS, applicationId), {
        status: newStatus,
        updatedAt: serverTimestamp(),
      });

      await logActivity("system", "payment_completed", applicationId,
        `${type} payment completed via Stripe`);

    } catch (e) {
      console.error("Webhook processing error:", e);
    }
  }

  return NextResponse.json({ received: true });
}