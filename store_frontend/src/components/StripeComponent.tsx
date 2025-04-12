"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { API_URL } from "../config";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
  AddressElement,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Types
interface StripeComponentProps {
  carId: number;
  quantity: number;
}

interface PaymentIntentResponse {
  client_secret: string;
}

// API function
const createPaymentIntent = async (
  token: string,
  carId: number,
  quantity: number,
): Promise<PaymentIntentResponse> => {
  const response = await fetch(`${API_URL}/payment/intent/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      cart: [{ id: carId, quantity }],
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create payment intent");
  }

  return response.json();
};

// Main StripeComponent
export default function StripeComponent({
  carId,
  quantity,
}: StripeComponentProps) {
  const { getToken } = useAuth();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return createPaymentIntent(token, carId, quantity);
    },
    onSuccess: (data) => {
      setClientSecret(data.client_secret);
    },
    onError: (err) => {
      console.error("Payment intent error:", err);
      setError("Failed to initialize payment. Please try again.");
    },
  });

  useEffect(() => {
    if (carId && quantity) {
      mutation.mutate();
    }
  }, [carId, quantity]);

  if (mutation.isPending) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500 mb-4" />
        <p className="text-gray-600">Initializing payment...</p>
      </div>
    );
  }

  if (error || mutation.isError) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 mb-4">{error ?? "An error occurred."}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  if (!clientSecret) return null;

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-6 text-center">
        Complete Your Purchase
      </h2>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

// Checkout form component
function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setPaymentError(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-confirmation/`,
        },
        redirect: "if_required",
      });

      if (error) {
        setPaymentError(error.message ?? "Payment failed. Please try again.");
      } else if (paymentIntent?.status === "succeeded") {
        setPaymentSuccess(true);
      } else {
        setPaymentError("Payment failed. Please try again.");
      }
    } catch (err) {
      setPaymentError("An unexpected error occurred.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="text-center p-6">
        <div className="mb-4 text-green-500">✅ Payment Successful!</div>
        <p className="text-gray-600 mb-4">
          Thank you for your purchase. Your order has been processed
          successfully.
        </p>
        <Button onClick={() => (window.location.href = "/")}>
          Return to Showroom
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Card Details
        </label>
        <PaymentElement />
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Shipping Address
        </label>
        <AddressElement options={{ mode: "shipping" }} />
      </div>

      {paymentError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-500 text-sm">{paymentError}</p>
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Pay Now"
        )}
      </Button>
    </form>
  );
}
