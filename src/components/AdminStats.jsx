import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaUsers, FaBox, FaShoppingBag, FaDollarSign } from 'react-icons/fa';
import { fetchAdminStats, fetchRecentOrders } from '../features/adminSlice';

export default function AdminStats() {
    const dispatch = useDispatch();
    const { stats, recentOrders, isLoading } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(fetchAdminStats());
        dispatch(fetchRecentOrders());
    }, [dispatch]);

    if (isLoading || !stats) {
        return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-base-300 rounded-2xl"></div>)}
        </div>;
    }

    const statCards = [
        { label: 'Total Users', value: stats.totalUsers, icon: <FaUsers />, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Total Products', value: stats.totalProducts, icon: <FaBox />, color: 'text-green-500', bg: 'bg-green-500/10' },
        { label: 'Total Orders', value: stats.totalOrders, icon: <FaShoppingBag />, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { label: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: <FaDollarSign />, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    ];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <div key={i} className="card bg-base-100 shadow-sm border border-base-300 hover:shadow-md transition-shadow duration-300 overflow-hidden">
                        <div className="card-body p-6 flex-row items-center gap-5">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${stat.bg} ${stat.color} shadow-sm border border-white/5`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-sm opacity-60 font-medium mb-0.5">{stat.label}</p>
                                <h3 className="text-2xl font-black">{stat.value}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card bg-base-100 shadow-sm border border-base-300 overflow-hidden">
                <div className="card-body p-0">
                    <div className="p-6 border-b border-base-300 bg-base-100/50">
                        <h4 className="card-title text-xl font-bold">Recent Orders</h4>
                        <p className="text-sm opacity-60 mt-0.5">Summary of the latest purchase activities.</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr className="bg-base-200/50 text-xs uppercase tracking-wider">
                                    <th className="py-4 px-6 font-semibold">Order ID</th>
                                    <th className="py-4 px-6 font-semibold">Customer</th>
                                    <th className="py-4 px-6 font-semibold">Total</th>
                                    <th className="py-4 px-6 font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders && recentOrders.length > 0 ? (
                                    recentOrders.map((order) => (
                                        <tr key={order.orderid} className="hover:bg-primary/5 transition-colors cursor-default">
                                            <td className="py-4 px-6 font-mono text-xs opacity-70">#{order.orderid}</td>
                                            <td className="py-4 px-6">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-sm">{order.username}</span>
                                                    <span className="text-xs opacity-50">{order.email}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 font-bold text-sm text-primary">${order.totalamount}</td>
                                            <td className="py-4 px-6">
                                                <span className={`badge badge-sm rounded-md font-bold ${
                                                    order.status === 'Completed' ? 'badge-success' : 
                                                    order.status === 'Pending' ? 'badge-warning' : 'badge-ghost'
                                                }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="py-12 text-center text-sm opacity-50 italic">
                                            No recent orders found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
