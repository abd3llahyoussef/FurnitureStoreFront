import { useEffect, useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { Link } from 'react-router';
import { FaCheckCircle, FaShoppingBag, FaArrowRight, FaTimesCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { clearCart } from '../features/cartSlice.jsx';
import { checkAuth } from '../features/userSlice.jsx';

export default function PaymentSuccess() {
    const stripe = useStripe();
    const [status, setStatus] = useState('loading');
    const [paymentIntent, setPaymentIntent] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!stripe) return;

        const clientSecret = new URLSearchParams(window.location.search)
            .get('payment_intent_client_secret');
        
        if (!clientSecret) {
            setStatus('error');
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            setPaymentIntent(paymentIntent);
            switch (paymentIntent.status) {
                case 'succeeded': 
                    setStatus('succeeded'); 
                    dispatch(clearCart());
                    dispatch(checkAuth()); // Refresh user data just in case
                    break;
                case 'processing': 
                    setStatus('processing'); 
                    break;
                case 'requires_payment_method': 
                    setStatus('failed'); 
                    break;
                default: 
                    setStatus('error'); 
                    break;
            }
        });
    }, [stripe]);

    if (status === 'loading') {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
                <span className="loading loading-spinner loading-lg text-[#f5be91]"></span>
                <p className="mt-4 text-base-content/60 font-medium animate-pulse">Verifying payment status...</p>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4 bg-base-200/30">
            <div className="max-w-md w-full bg-base-100 p-10 rounded-[40px] shadow-2xl border border-base-200 text-center relative overflow-hidden">
                {/* Aesthetic background blobs */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#f5be91]/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#f5be91]/10 rounded-full blur-3xl"></div>
                
                {status === 'succeeded' ? (
                    <>
                        <div className="mb-8 inline-flex items-center justify-center w-28 h-28 bg-success/10 rounded-full">
                            <FaCheckCircle className="text-7xl text-success" />
                        </div>
                        <h1 className="text-4xl font-black mb-4 tracking-tight">Success!</h1>
                        <p className="text-base-content/60 mb-8 font-medium leading-relaxed">
                            Your payment was processed successfully. Thank you for choosing our premium furniture collection.
                        </p>
                        
                        {paymentIntent && (
                            <div className="bg-base-200/50 p-6 rounded-3xl mb-10 border border-base-300 text-left">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-bold uppercase tracking-wider text-base-content/40">Amount Paid</span>
                                    <span className="text-lg font-black text-[#f5be91]">${(paymentIntent.amount / 100).toFixed(2)}</span>
                                </div>
                                <div className="h-px bg-base-300 mb-3"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold uppercase tracking-wider text-base-content/40">Reference</span>
                                    <span className="font-mono text-[10px] opacity-60">#{paymentIntent.id.slice(-12)}</span>
                                </div>
                            </div>
                        )}

                        <div className="grid gap-4">
                            <Link to="/orders" className="btn btn-lg bg-[#f5be91] border-none hover:bg-[#f5a76f] text-black font-bold rounded-2xl shadow-lg shadow-[#f5be91]/20 transition-all active:scale-95 group">
                                View Orders <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/" className="btn btn-lg btn-ghost font-bold rounded-2xl hover:bg-base-200">
                                <FaShoppingBag className="mr-2" /> Continue Shopping
                            </Link>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="mb-8 inline-flex items-center justify-center w-28 h-28 bg-error/10 rounded-full">
                            <FaTimesCircle className="text-7xl text-error" />
                        </div>
                        <h1 className="text-3xl font-black mb-4 tracking-tight">Oops!</h1>
                        <p className="text-base-content/60 mb-8 font-medium">
                            {status === 'processing' 
                                ? "Your payment is still being processed by your bank. We'll update you soon." 
                                : "Something went wrong with the transaction. Please check your card details and try again."}
                        </p>
                        <div className="grid gap-4">
                            <Link to="/checkout" className="btn btn-lg bg-base-300 border-none hover:bg-base-400 text-base-content font-bold rounded-2xl transition-all active:scale-95">
                                Try Again
                            </Link>
                            <Link to="/" className="btn btn-lg btn-ghost font-bold rounded-2xl">
                                Back to Home
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}