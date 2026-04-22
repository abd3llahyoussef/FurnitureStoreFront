import customFunction from "./customFunction.jsx";

export const fetchClientSecret = async (total) => {
  try {
    const response = await customFunction("pay/create-payment-intent", "POST", {
      amount: Math.round(total * 100), // Stripe expects amounts in cents (integer)
      currency: "usd",
      metadata: { userSerial: 1 },
    }, null);
    
    // Note: customFunction returns response.data directly (based on my previous view of customFunction)
    // Actually, looking at customFunction again...
    return response.clientSecret;
  } catch (err) {
    console.error("Payment intent creation failed", err);
    throw err;
  }
};
