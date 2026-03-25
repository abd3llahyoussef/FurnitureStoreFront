import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import ReadImages from '../features/readImages.jsx';
import { IoClose } from 'react-icons/io5';
import { addToCart } from '../features/cartSlice.jsx';
import { ToastContainer, toast } from "react-toastify";

export default function ProductDetails({productId, onClose}) {
  
   const { products } = useSelector((state) => state.product.products);
  const { user } = useSelector((state) => state.user);
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const filteredProduct = products.find(product => product.productid === productId || product.productid === productId);

  if (!filteredProduct) return null;

  // Get image list after confirming product exists (no hooks here)
  const images = ReadImages();

  const handleQuantityChange = (e) => {
    const raw = e.target.value;
    const parsed = parseInt(raw, 10);
    if (Number.isNaN(parsed)) {
      // If the user cleared the field or entered invalid input, reset to 1
      setQuantity(1);
      return;
    }
    const safe = Math.max(1, Math.min(parsed, filteredProduct.quantity));
    setQuantity(safe);
  };

  const handleQuantityBlur = (e) => {
    if (e.target.value === '' || Number.isNaN(parseInt(e.target.value, 10))) {
      setQuantity(1);
    }
  };

  const incrementQuantity = () => {
    setQuantity((q) => {
      const n = Number(q) || 1;
      const max = filteredProduct?.quantity ?? (n + 1);
      return Math.min(max, n + 1);
    });
  };

  const decrementQuantity = () => {
    setQuantity((q) => {
      const n = Number(q) || 1;
      return Math.max(1, n - 1);
    });
  };

  const getProductIndex = async(id) => {
    let index =  await products.findIndex((p) => p.productid === id);
    return index;
  }


   const handleAddToCart = async (e) => {
    // Stop event propagation
    if (e) e.stopPropagation();
    
    // TODO: Add to cart logic with quantity
    const index = await getProductIndex(productId);
    const newItems = { product:{...products[index]}, newQuantity: quantity };
    dispatch(addToCart(newItems));

     toast.success("item added to cart successfully!", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          theme: "light",
        });
  };

  return (
    <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300'>
      <div className='bg-base-100 rounded-3xl p-8 max-w-4xl w-full relative shadow-2xl max-h-[90vh] overflow-y-auto border border-white/10'>
        <button 
          onClick={onClose}
          className='absolute top-6 right-6 btn btn-ghost btn-circle hover:bg-base-300 transition-colors'
        >
          <IoClose size={28} />
        </button>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          {/* Image Section */}
          <div className='flex flex-col items-center justify-center bg-base-200 rounded-2xl overflow-hidden p-4 group'>
            <img 
              src={images[filteredProduct.productid - 1]} 
              alt={filteredProduct.productname} 
              className='w-full h-[450px] object-contain rounded-lg transition-transform duration-500 group-hover:scale-105'
            />
          </div>

          {/* Details Section */}
          <div className='flex flex-col'>
            <div className="mb-8">
              <span className="badge badge-lg bg-[#f5be91] border-none text-black font-bold mb-4">New Arrival</span>
              <h1 className='text-5xl font-black mb-4 tracking-tight leading-tight'>{filteredProduct.productname}</h1>
              <p className='text-4xl font-black text-[#f5be91] mb-6'>${parseFloat(filteredProduct.price).toFixed(2)}</p>
              <div className="h-1 w-20 bg-[#f5be91] mb-6 rounded-full"></div>
              <p className='text-base-content/80 mb-8 leading-relaxed text-xl'>{filteredProduct.description}</p>
            </div>

            <div className="mt-auto">
              {/* Quantity Input */}
              <div className='mb-8'>
                <div className='flex items-center justify-between mb-4'>
                  <span className='text-lg font-bold'>Quantity</span>
                  <span className='badge badge-outline gap-2'>
                    {filteredProduct.quantity} in stock
                  </span>
                </div>
                <div className='flex items-center gap-4 bg-base-200 p-2 rounded-2xl w-fit'>
                  <button className='btn btn-circle btn-ghost btn-sm' type='button' onClick={decrementQuantity}>-</button>
                  <input 
                    type='number' 
                    className='bg-transparent border-none focus:ring-0 w-12 text-center font-bold text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' 
                    value={quantity}
                    onChange={handleQuantityChange}
                    onBlur={handleQuantityBlur}
                  />
                  <button className='btn btn-circle btn-ghost btn-sm' type='button' onClick={incrementQuantity}>+</button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex gap-4'>
                <button 
                  className='btn btn-lg flex-[2] bg-[#f5be91] border-none hover:bg-[#f5a76f] text-black font-bold shadow-lg shadow-[#f5be91]/20 transition-all active:scale-95'
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
                <button 
                  className='btn btn-lg btn-outline flex-1 rounded-xl'
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
