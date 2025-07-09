import stripe from "stripe";
import Booking from "../models/bookingModel.js";

//Api to handle stripe webhooks

export const stripeWebhooks = async (request, response) => {
  // Initialize Stripe gateway
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
  const sig = request.headers["stripe-signature"];
  let event;

  try {
    // Verify the webhook signature
    event = stripeInstance.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Error verifying webhook signature:", err);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const paymentIntentId = paymentIntent.id;

    //Getting session metadata
    const session = await stripeInstance.checkout.sessions.list({
      limit: 1,
      payment_intent: paymentIntentId,
    });

    const { bookingId } = session.data[0].metadata;

    //Mark payment as paid in the database
    await Booking.findByIdAndUpdate(bookingId, {
      isPaid: true,
      paymentMethod: "Stripe",
    });
  } else {
    console.log(`Unhandled event type: ${event.type}`);
  }
  // Return a response to acknowledge receipt of the event
  response.status(200).json({ received: true });
};
