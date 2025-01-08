import { env } from "@/env";
import Stripe from "stripe";

// Create a new instance of the Stripe SDK with your Stripe secret key
const stripe = new Stripe(env.STRIPE_SECRET_KEY);

// Export the Stripe SDK instance
export default stripe;
