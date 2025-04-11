// StripeComponent.tsx

import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Load the Stripe object with the publishable key from your Vite environment variable
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// CheckoutForm component for handling the payment form
const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    setError(null);

    // Confirm the payment using the PaymentElement
    const { error: paymentError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Replace with your own return URL after payment
        return_url: "https://your-domain.com/payment-complete",
      },
    });

    if (paymentError) {
      setError(paymentError.message || "An unexpected error occurred.");
    } else {
      setMessage("Payment succeeded!");
    }
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
      {error && <div className="mt-2 text-red-500">{error}</div>}
      {message && <div className="mt-2 text-green-500">{message}</div>}
    </form>
  );
};

// StripeComponent handles fetching the client secret and rendering the Elements wrapper.
const StripeComponent: React.FC = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    // Call your backend to create a PaymentIntent and retrieve its client secret
    fetch("/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Include any required payment details here
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((err) => console.error("Error creating PaymentIntent:", err));
  }, []);

  // Options for the Stripe Elements
  const options = {
    clientSecret,
    // You can add additional appearance or locale options here
  };

  return clientSecret ? (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  ) : (
    <div>Loading payment options...</div>
  );
};

export default StripeComponent;
