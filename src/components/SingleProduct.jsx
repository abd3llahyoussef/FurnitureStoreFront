import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice.jsx";
import { ToastContainer, toast } from "react-toastify";

export default function SingleProduct({
  productId,
  imgPath,
  productName,
  price,
  onProductClick,
}) {

  const { products } = useSelector((state) => state.product.products);
  const { user } = useSelector((state) => state.user.isLoggedIn );

  const dispatch = useDispatch();

  const getProductIndex = async (id) => {
    let index = await products.findIndex((p) => p.productid === id);
    return index;
  };

  const handleAddToCart = async (e) => {
    // Stop event propagation to prevent showing product details
    e.stopPropagation();
    
    // TODO: Add to cart logic with quantity
    const index = await getProductIndex(productId);
    const newItems = { product: { ...products[index] }, newQuantity: 1 };
    dispatch(addToCart(newItems));

    toast.success("item added to cart successfully!", {
      position: "top-center",
      autoClose: 2000,
      pauseOnHover: true,
      theme: "light",
    });
  };

  return (
    <div
      className="group relative bg-base-100 border border-base-300 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={() => onProductClick(productId)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={imgPath}
          alt={productName}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {user || (
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              className="btn bg-[#f5be91] hover:bg-[#f5a76f] border-none text-black font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
        )}
      </div>
      <div className="p-4 text-center">
        <h2 className="font-bold text-lg mb-1 truncate">{productName}</h2>
        <p className="text-[#f5be91] font-black text-xl">${price}</p>
      </div>
    </div>
  );
}
