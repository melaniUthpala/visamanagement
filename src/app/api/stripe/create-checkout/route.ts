import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

export async function POST(req: NextRequest) {
  try {
    const { amount, type, applicationId, paymentId } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Math.round(amount * 100),
            product_data: {
              name: `Visa Application ${type === "registration" ? "Registration" : "Final"} Fee`,
              description: `Application ID: ${applicationId}`,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get("origin")}/dashboard/payments?success=true&paymentId=${paymentId}`,
      cancel_url: `${req.headers.get("origin")}/dashboard/payments?canceled=true`,
      metadata: { applicationId, type, paymentId },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}