import { Routes, Route } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import stripePromise from "./stripePromise.js";
import { Elements } from "@stripe/react-stripe-js";


import Hero from "./components/Hero.jsx";
import Products from "./components/Products.jsx";
import About from "./components/About.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import Orders from "./components/Orders.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import NavBar from "./components/NavBar.jsx";
import { ProductContext } from "./features/productContext.jsx";
import UserContainer from "./components/UserContainer.jsx";

import { checkAuth } from "./features/userSlice.jsx";
import PaymentSuccess from "./components/paymentSuccess.jsx";


import "./app.css"
function App() {
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // const { pageNumber, setPageNumber, pageSize, setPageSize } = useContext(ProductContext);
  const options = {
    // These appearance options style the Stripe-hosted card field
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#635BFF',
        borderRadius: '8px',
      },
    },
  };
  return (
    <>
      <Elements stripe={stripePromise}>
        <UserContainer />
        <NavBar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Routes>
      </Elements>
    </>
  );
}

export default App;
