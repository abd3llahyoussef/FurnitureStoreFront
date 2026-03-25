import React from 'react'
import { useSelector } from 'react-redux'
import SingleCartProduct from './SingleCartProduct.jsx';
import CartCharge from './CartCharge.jsx';

export default function Cart() {

  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className='min-h-screen bg-base-200 py-12 px-4 sm:px-8 lg:px-16'>
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="text-sm breadcrumbs mb-4 text-base-content/50">
            <ul>
              <li><a>Home</a></li> 
              <li>Cart</li>
            </ul>
          </div>
          <h1 className="text-5xl font-black tracking-tight">Your Shopping Cart</h1>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
          <div className="lg:col-span-8 space-y-2">
            {cartItems.length === 0 ? (
              <div className="bg-base-100 rounded-[32px] p-20 text-center shadow-sm border border-base-200">
                <div className="mb-6 opacity-20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4">Your cart is feeling a bit light</h2>
                <p className="text-base-content/60 mb-8">Looks like you haven't added anything to your cart yet.</p>
                <button className="btn bg-[#f5be91] border-none text-black font-bold px-8 rounded-xl shadow-lg shadow-[#f5be91]/20">Start Shopping</button>
              </div>
            ) : (
              cartItems.map((item, index) => (
                <SingleCartProduct key={`${item.product.productid}-${index}`} product={item} />
              ))
            )}
          </div>
          
          <div className="lg:col-span-4">
            {cartItems.length > 0 && <CartCharge cartItems={cartItems} />}
          </div>
        </div>
      </div>
    </div>
  )
}
