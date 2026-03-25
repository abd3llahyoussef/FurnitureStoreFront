import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { FaShoppingCart, FaUser, FaMoon, FaSun, FaHome } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import NavLinks from './NavLinks';

export default function NavBar() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const { cartItems } = useSelector((state) => state.cart || { cartItems: [] });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="navbar bg-base-100 px-4 lg:px-20 sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <NavLinks />
                    </ul>
                </div>
                <div className="flex-none gap-4 bg-[#f5be91] rounded-lg">
                    <Link to="/" className="btn btn-ghost btn-circle">
                        <span className="text-xl font-bold">F</span>
                    </Link>
                </div>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <NavLinks />
                </ul>
            </div>

            <div className="navbar-end gap-2">
                <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
                    {theme === 'light' ? <FaMoon className="text-xl" /> : <FaSun className="text-xl" />}
                </button>

                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <FaShoppingCart className="text-xl" onClick={()=> Navigate.to("/cart")}/>
                            {cartItems.length > 0 && (
                                <span className="badge badge-sm badge-primary indicator-item bg-[#f5be91] border-none text-black font-bold">
                                    {cartItems.length}
                                </span>
                            )}
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
}
