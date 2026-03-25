import React from 'react';
import { FaChartLine, FaBoxOpen, FaClipboardList, FaUsers, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router';

export default function AdminSidebar({ activeTab, setActiveTab }) {
    const navigate = useNavigate();

    const menuItems = [
        { id: 'stats', label: 'Stats Overview', icon: <FaChartLine /> },
        { id: 'products', label: 'Products', icon: <FaBoxOpen /> },
        { id: 'orders', label: 'Orders', icon: <FaClipboardList /> },
        { id: 'users', label: 'Users', icon: <FaUsers /> },
    ];

    return (
        <aside className="w-72 bg-base-100 shadow-xl flex flex-col h-full border-r border-base-300">
            <div className="p-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#f5be91] rounded-lg flex items-center justify-center font-black text-2xl font-bold shadow-lg">F</div>
                <span className="text-2xl font-black tracking-tighter">Admin <span className="text-[#f5be91] text-sm uppercase">Panel</span></span>
            </div>
            
            <nav className="flex-1 px-4 py-6 space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 font-medium ${
                            activeTab === item.id 
                            ? 'bg-[#f5be91] text-black shadow-md scale-105' 
                            : 'hover:bg-[#f5be91]/10 hover:translate-x-1'
                        }`}
                    >
                        <span className="text-xl">{item.icon}</span>
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="p-6 border-t border-base-300">
                <button 
                    onClick={() => navigate('/')} 
                    className="btn btn-outline btn-block rounded-xl group transition-all"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    Back to Store
                </button>
            </div>
        </aside>
    );
}
