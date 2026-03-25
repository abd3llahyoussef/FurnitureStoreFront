import { useDispatch,useSelector } from "react-redux";
import { createOrder, addProductToOrder } from "../features/orderSlice.jsx";
import { ToastContainer, toast } from "react-toastify";
import {useNavigate} from "react-router";
export default function CartCharge({ cartItems, buttonText = "Proceed to Checkout", onCheckout }) {
  const dispatch = useDispatch();
  const { currentOrderId } = useSelector((state) => state.order)
  const navigate = useNavigate();
  const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.newQuantity, 0);
  const shipping = 5.99;
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  const handleCheckout = async() => {
    if (onCheckout || buttonText === "Proceed to Checkout") {
      //onCheckout(total);
      navigate("/checkout");
      return;
    }
    
    const createResult = await dispatch(
      createOrder({ totalAmount: total, status: "Pending", userSerial: 1 }),
    );

    const orderId = createResult?.payload?.orderid;
    if (!orderId) {
      console.error('No order id returned from createOrder');
      return;
    }

    await handleProduct(orderId);

    toast.success("Order created successfully!", {
      position: "top-center",
      autoClose: 2000,
      pauseOnHover: true,
      theme: "light",
    });
  };

  const handleProduct = async(orderId) => {
    const idToUse = orderId || currentOrderId;
    await Promise.all(cartItems.map((product) => 
      dispatch(addProductToOrder({
        orderid: idToUse,
        productId: product.product.productid,
        quantity: product.newQuantity,
        price: product.product.price * product.newQuantity,
      })).unwrap().catch((err) => console.error('Add product error', err))
    ));
  }

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

      <button 
        className="btn btn-lg w-full bg-[#f5be91] border-none hover:bg-[#f5a76f] text-black font-bold shadow-lg shadow-[#f5be91]/20 transition-all active:scale-95" 
        onClick={handleCheckout}
      >
        {buttonText}
      </button>

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
