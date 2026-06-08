import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { amount, paymentId, applicationId } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: "Visa Application Fee" },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/payments?success=true&paymentId=${paymentId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/payments?canceled=true`,
    metadata: { paymentId, applicationId },
  });

  return NextResponse.json({ url: session.url });
}