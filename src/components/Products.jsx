import React, { useCallback, useEffect, useState, useContext } from "react";
import SingleProduct from "./SingleProduct.jsx";
import ProductDetails from "./ProductDetails.jsx";
import { getProducts } from "../features/productSlice.jsx";
import ReadImages from "../features/readImages.jsx";
import PaginationComponent from "../features/PaginationComponent.jsx";
import { IoGrid } from "react-icons/io5";
import { FaAlignJustify } from "react-icons/fa";
import { ProductContext } from "../features/productContext.jsx";
import { useDispatch, useSelector } from "react-redux";

export default function Products() {
  const dispatch = useDispatch();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const { pageNumber, setPageNumber, pageSize } = useContext(ProductContext);

  // Get images array directly from ReadImages function
  let images = [];
  
  const { products, isLoading, error } = useSelector((state) => state.product);

  //load Products
  const loadProducts = useCallback(async () => {
    await dispatch(getProducts({ pageNumber, pageSize }));
  }, [dispatch, pageNumber, pageSize]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  images = ReadImages();


  //Search functionality
  const [searchTerm, setSearchTerm] = useState(null||'');
  let filteredProducts =[];
  const filtered = ()=> {
    filteredProducts =Array.isArray(products.products)
    ? products.products.filter(
        (p) =>
          p &&
          p.productid ||
          (!searchTerm || (p.productname || '').toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : []};

filtered();
    //Change View Functionality
  const handleStripView = () => {
    const grid = document.querySelector("#product-grid");
    grid.classList.remove("grid-cols-3");
    grid.classList.add("grid-cols-1");
  };

  const handleGridView = () => {
    const grid = document.querySelector("#product-grid");
    grid.classList.remove("grid-cols-1");
    grid.classList.add("grid-cols-3");
  };

  //Show Product Details
  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
  };

  const handleCloseDetails = () => {
    setSelectedProductId(null);
  };


  const handleInputChange = (e) => {
    setSearchTerm(e.target.value?e.target.value.toLowerCase():"");
    filtered();
  };


  
  return (
    <div className="bg-base-200/50 min-h-screen pb-20">
      {selectedProductId && (
        <ProductDetails
          productId={selectedProductId} 
          onClose={handleCloseDetails}
        />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-black tracking-tight mb-2">Our Collection</h1>
            <p className="text-base-content/60 text-lg">Quality furniture for your dream home.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group flex-1 md:w-80">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => handleInputChange(e)}
                className="input input-bordered w-full h-12 rounded-2xl bg-base-100 focus:border-[#f5be91] transition-all pl-12"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 group-focus-within:text-[#f5be91] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="flex bg-base-100 p-1 rounded-2xl border border-base-300">
              <button 
                className={`btn btn-sm btn-ghost rounded-xl ${document.querySelector("#product-grid")?.classList.contains("grid-cols-3") ? "bg-base-200" : ""}`} 
                onClick={handleGridView}
              >
                <IoGrid size={18} />
              </button>
              <button 
                className={`btn btn-sm btn-ghost rounded-xl ${document.querySelector("#product-grid")?.classList.contains("grid-cols-1") ? "bg-base-200" : ""}`} 
                onClick={handleStripView}
              >
                <FaAlignJustify size={18} />
              </button>
            </div>
          </div>
        </div>

        <div id="product-grid" className="grid max-sm:grid-cols-1 grid-cols-3 gap-8">
          {isLoading && (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <span className="loading loading-spinner loading-lg text-[#f5be91]"></span>
              <p className="mt-4 font-bold text-lg">Curating excellence...</p>
            </div>
          )}
          {error && <p className="col-span-full text-center text-error font-bold py-10">Error: {error}</p>}
          {!isLoading && !error && Array.isArray(filteredProducts) &&
            (filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <p className="text-2xl font-bold opacity-30">No products found matching "{searchTerm}"</p>
              </div>
            ) : (
              filteredProducts
                .filter((p) => p && p.productid)
                .map((product) => (
                  <SingleProduct
                    key={product.productid}
                    productId={product.productid}
                    imgPath={images[product.productid - 1]}
                    productName={product.productname}
                    price={product.price}
                    onProductClick={() => handleProductClick(product.productid)}
                  />
                ))
            ))}
        </div>
        <div className="my-6 flex justify-center">
          <PaginationComponent
            pageNumber={pageNumber}
            totalPages={products && products.pagination ? products.pagination.totalPages : 1}
            onPageChange={(p) => setPageNumber(p)}
          />
        </div>
      </div>
    </div>
  );
}
