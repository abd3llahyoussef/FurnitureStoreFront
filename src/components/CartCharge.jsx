import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, addProductToOrder } from "../features/orderSlice.jsx";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useElements, useStripe, PaymentElement, Elements } from "@stripe/react-stripe-js";

import stripePromise from "../stripePromise.js";
import { fetchClientSecret } from "../features/payService.jsx";

// Sub-component to handle the actual Stripe payment logic
const StripeCheckoutForm = ({ clientSecret, total, cartItems, buttonText }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { currentOrderId } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handlePayment = async () => {
    if (!stripe || !elements) return;
    setIsLoading(true);

    try {
      // 1. Create the order
      const userId = user?.findUser?.userid || 1;
      const createResult = await dispatch(
        createOrder({ totalAmount: total, status: "Pending", userSerial: userId }),
      ).unwrap();


      const orderId = createResult?.orderid;
      if (!orderId) throw new Error('Failed to create order');

      // 2. Add products to order
      await Promise.all(cartItems.map((product) =>
        dispatch(addProductToOrder({
          orderid: orderId,
          productId: product.product.productid,
          quantity: product.newQuantity,
          price: product.product.price * product.newQuantity,
        })).unwrap()
      ));

      // 3. Confirm payment
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
      });

      if (error) {
        if (error.type === 'card_error' || error.type === 'validation_error') {
          setMessage(error.message);
        } else {
          setMessage('An unexpected error occurred.');
        }
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setMessage(err.message || "An error occurred during checkout.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8">
        <PaymentElement />
      </div>

      {message && <div className="text-error text-sm mb-4 bg-error/10 p-3 rounded-lg">{message}</div>}

      <button
        className="btn btn-lg w-full bg-[#f5be91] border-none hover:bg-[#f5a76f] text-black font-bold shadow-lg shadow-[#f5be91]/20 transition-all active:scale-95"
        onClick={handlePayment}
        disabled={isLoading || !stripe || !elements}
      >
        {isLoading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          buttonText
        )}
      </button>
    </>
  );
};

export default function CartCharge({ cartItems, buttonText = "Proceed to Checkout" }) {
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState(null);

  const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.newQuantity, 0);
  const shipping = 5.99;
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  useEffect(() => {
    // Only fetch clientSecret if we're on the checkout page (buttonText is "Place Order")
    if (buttonText !== "Place Order" || !total || total <= 0) return;

    const getSecret = async () => {
      try {
        const secret = await fetchClientSecret(total);
        setClientSecret(secret);
      } catch (err) {
        setError("Failed to initialize payment. Please try again.");
      }
    };

    getSecret();
  }, [total, buttonText]);

  return (
    <div className="bg-base-100 p-8 rounded-[32px] shadow-xl border border-base-200 h-fit sticky top-24">
      <h2 className="text-2xl font-black mb-8 border-b-2 border-[#f5be91] pb-2 w-fit">Order Summary</h2>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center text-lg">
          <span className="text-base-content/60 font-medium">Subtotal</span>
          <span className="font-bold">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center text-lg">
          <span className="text-base-content/60 font-medium">Shipping</span>
          <span className="font-bold">${shipping.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center text-lg">
          <span className="text-base-content/60 font-medium">Tax (8%)</span>
          <span className="font-bold">${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="h-px bg-base-200 mb-8"></div>

      <div className="flex justify-between items-center mb-10">
        <span className="text-2xl font-black">Total</span>
        <span className="text-3xl font-black text-[#f5be91]">${total.toFixed(2)}</span>
      </div>

      {buttonText === "Place Order" ? (
        clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <StripeCheckoutForm
              clientSecret={clientSecret}
              total={total}
              cartItems={cartItems}
              buttonText={buttonText}
            />
          </Elements>
        ) : error ? (
          <div className="text-error text-center p-4 bg-error/5 rounded-2xl">{error}</div>
        ) : (
          <div className="flex flex-col items-center gap-3 p-8 bg-base-200/50 rounded-2xl border border-dashed border-base-300">
            <span className="loading loading-spinner loading-md text-[#f5be91]"></span>
            <span className="text-sm font-medium text-base-content/50">Initializing Secure Payment...</span>
          </div>
        )
      ) : (
        <button
          className="btn btn-lg w-full bg-[#f5be91] border-none hover:bg-[#f5a76f] text-black font-bold shadow-lg shadow-[#f5be91]/20 transition-all active:scale-95"
          onClick={() => navigate("/checkout")}
        >
          {buttonText}
        </button>
      )}

      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-base-content/50 font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Secure Checkout Guaranteed
      </div>
      <ToastContainer />
    </div>
  );
}
