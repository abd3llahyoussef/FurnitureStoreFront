import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAdminStats } from '../features/adminSlice';
import AdminSidebar from './AdminSidebar';
import AdminStats from './AdminStats';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';
import AdminUsers from './AdminUsers';

export default function AdminDashboard() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const [activeTab, setActiveTab] = useState('stats');

    useEffect(() => {
        dispatch(fetchAdminStats());
    }, [dispatch]);

    if (!user || user.findUser.fk_role !== 1) {
        return (
            <div className="flex items-center justify-center h-screen bg-base-200">
                <div className="text-center p-8 bg-base-100 rounded-xl shadow-2xl">
                    <h1 className="text-4xl font-bold text-error mb-4">Access Denied</h1>
                    <p className="text-lg opacity-70">You do not have permission to view this page.</p>
                </div>
            </div>
        );
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'stats': return <AdminStats />;
            case 'products': return <AdminProducts />;
            case 'orders': return <AdminOrders />;
            case 'users': return <AdminUsers />;
            default: return <AdminStats />;
        }
    };

    return (
        <div className="flex h-screen bg-base-200 overflow-hidden">
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <main className="flex-1 overflow-y-auto p-8">
                <div className="max-w-7xl mx-auto">
                    <header className="flex justify-between items-center mb-8 p-6 bg-[#f5be91] rounded-2xl shadow-sm font-black">
                        <div>
                            <h1 className="text-3xl font-extrabold capitalize font-black">Admin {activeTab}</h1>
                            <p className="opacity-80 text-sm mt-1 font-medium font-black">Manage your store's {activeTab} efficiently.</p>
                        </div>
                    </header>   
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}
