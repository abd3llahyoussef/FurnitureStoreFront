import React, { useState,useCallback } from "react";
import { useDispatch } from "react-redux";
import ReadImages from "../features/readImages";
import { removeFromCart,updateQuantity } from "../features/cartSlice.jsx";

export default function SingleCartProduct({ product }) {

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.newQuantity);

  const handleQuantityChange = (e) => {
    const raw = e.target.value;
    const parsed = parseInt(raw, 10);
    if (Number.isNaN(parsed)) {
      // If the user cleared the field or entered invalid input, reset to 1
      setQuantity(1);
      return;
    }
    const current = quantity;

    let safe;
    if (parsed > current) {
      // Incrementing: cap at available stock
      safe = Math.min(parsed, product.product.quantity);
    } else {
      // Decrementing or same: floor at 1
      safe = Math.max(parsed, 1);
    }

    setQuantity(safe);
    dispatch(updateQuantity({ productId: product.product.productid, newQuantity: safe }));
  };

  const handleQuantityBlur = (e) => {
    if (e.target.value === "" || Number.isNaN(parseInt(e.target.value, 10))) {
      setQuantity(1);
    }
  };

  const image = useCallback(()=>ReadImages()[product.product.productid - 1],[product.product.productid]);


  const incrementQuantity = () => {
    if (quantity < product.product.quantity) {
      const newQty = quantity + 1;
      setQuantity(newQty);
      dispatch(updateQuantity({ productId: product.product.productid, newQuantity: newQty }));
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      dispatch(updateQuantity({ productId: product.product.productid, newQuantity: newQty }));
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 p-6 bg-base-100 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 border border-base-200 mb-6 group w-full">
      <div className="w-full sm:w-48 h-48 bg-base-200 rounded-2xl overflow-hidden flex-shrink-0">
        <img
          src={image()}
          alt={product.product.productname}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      <div className="flex flex-col flex-grow justify-between py-2">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-black mb-1">{product.product.productname}</h2>
            <p className="text-base-content/60 text-sm font-medium uppercase tracking-wider">Furniture Design</p>
          </div>
          <p className="text-2xl font-black text-[#f5be91]">${(product.product.price * quantity).toFixed(2)}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mt-8">
          <div className="flex items-center gap-4 bg-base-200 p-2 rounded-2xl w-fit">
            <button 
              className="btn btn-circle btn-ghost btn-sm text-lg font-bold" 
              type="button" 
              onClick={decrementQuantity}
            >
              -
            </button>
            <span className="w-8 text-center font-bold text-lg">{quantity}</span>
            <button 
              className="btn btn-circle btn-ghost btn-sm text-lg font-bold" 
              type="button" 
              onClick={incrementQuantity}
            >
              +
            </button>
          </div>

          <button 
            className="btn btn-ghost text-error hover:bg-error/10 font-bold px-6 rounded-xl transition-colors" 
            onClick={() => dispatch(removeFromCart(product.product.productid))}
          >
            Remove Item
          </button>
        </div>
      </div>
    </div>
  );
}
