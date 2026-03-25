import React from "react";
import SingleProduct from "./SingleProduct.jsx";
import f1 from"../assets/1.jpg" ;
import f5 from "../assets/5.jpg";
import f7 from "../assets/7.jpg";

export default function FeaturedProducts() {
  return (
    <div className="my-10 mx-40">
      <p className=" text-3xl font-bold mb-2">Featured Products</p>
      <hr className="mb-2" />
      <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-4">
          <SingleProduct
            imgPath={f1}
            productName="Modern Chair"
            price={999.99}
          />
          <SingleProduct
            imgPath={f5}
            productName="Modern Chair"
            price={599.99}
          />
          <SingleProduct
            imgPath={f7}
            productName="Modern Chair"
            price={299.99}
          />
          </div>
    </div>
  );
}
