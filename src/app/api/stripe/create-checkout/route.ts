import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
  try {
    const { amount, type, applicationId } = await req.json();
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
      success_url: `${req.headers.get("origin")}/dashboard/payments?success=true`,
      cancel_url: `${req.headers.get("origin")}/dashboard/payments?cancelled=true`,
      metadata: { applicationId, type },
    });
    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}