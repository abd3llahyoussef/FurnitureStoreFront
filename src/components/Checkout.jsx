import {useSelector} from "react-redux";
import CartCharge from "./CartCharge";

export default function Checkout() {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="text-sm breadcrumbs mb-4 text-base-content/50">
            <ul>
              <li><a>Home</a></li> 
              <li><a>Cart</a></li>
              <li>Checkout</li>
            </ul>
          </div>
          <h1 className="text-5xl font-black tracking-tight">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 bg-base-100 p-10 rounded-[40px] shadow-xl border border-base-200 h-fit">
            <h2 className="text-3xl font-black mb-8 border-b-2 border-[#f5be91] pb-2 w-fit">Shipping Details</h2>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold text-base-content/70">Full Name</span>
                  </label>
                  <input type="text" placeholder="John Doe" className="input input-lg bg-base-200 border-none focus:ring-2 focus:ring-[#f5be91] rounded-2xl w-full" required />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold text-base-content/70">Email Address</span>
                  </label>
                  <input type="email" placeholder="john@example.com" className="input input-lg bg-base-200 border-none focus:ring-2 focus:ring-[#f5be91] rounded-2xl w-full" required />
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-base-content/70">Shipping Address</span>
                </label>
                <input type="text" placeholder="123 Luxury Ave, Suite 100" className="input input-lg bg-base-200 border-none focus:ring-2 focus:ring-[#f5be91] rounded-2xl w-full" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold text-base-content/70">City</span>
                  </label>
                  <input type="text" placeholder="New York" className="input input-lg bg-base-200 border-none focus:ring-2 focus:ring-[#f5be91] rounded-2xl w-full" required />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold text-base-content/70">State / Province</span>
                  </label>
                  <input type="text" placeholder="NY" className="input input-lg bg-base-200 border-none focus:ring-2 focus:ring-[#f5be91] rounded-2xl w-full" required />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold text-base-content/70">ZIP / Postal Code</span>
                  </label>
                  <input type="text" placeholder="10001" className="input input-lg bg-base-200 border-none focus:ring-2 focus:ring-[#f5be91] rounded-2xl w-full" required />
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-base-content/70">Phone Number</span>
                </label>
                <input type="tel" placeholder="(555) 000-0000" className="input input-lg bg-base-200 border-none focus:ring-2 focus:ring-[#f5be91] rounded-2xl w-full" required />
              </div>

              <div className="pt-4">
                <div className="flex items-center gap-3 p-4 bg-info/5 rounded-2xl border border-info/10 text-info text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span>Orders are typically processed within 24 hours of being placed.</span>
                </div>
              </div>
            </form>
          </div>

          <div className="lg:col-span-5">
            <CartCharge cartItems={cartItems} buttonText="Place Order" />
          </div>
        </div>
      </div>
    </div>
  );
}
