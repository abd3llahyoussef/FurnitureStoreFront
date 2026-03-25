import { Routes, Route } from "react-router";
import { useContext } from "react";
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

import "./app.css"
function App() {
  const { pageNumber, setPageNumber, pageSize, setPageSize } = useContext(ProductContext);

  return (
    <>
    <UserContainer/>
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
      </Routes>
    </>
  );
}

export default App;
