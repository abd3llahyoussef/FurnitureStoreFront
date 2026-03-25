import React from "react";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";

export default function NavTitles() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const user = useSelector((state) => state.user);

  return (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/products">Products</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      {isLoggedIn && (
      <li>
        <NavLink to="/cart">Cart</NavLink>
      </li>)}
      {isLoggedIn && (
      <li>
        <NavLink to="/checkout">Checkout</NavLink>
      </li>)}
      {isLoggedIn && (
      <li>
        <NavLink to="/orders">Orders</NavLink>
      </li>)}
      {isLoggedIn && user.user?.findUser?.fk_role === 1 && (
      <li>
        <NavLink to="/admin">Dashboard</NavLink>
      </li>)}
    </>
  );
}
