import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllOrders, updateOrderStatus } from '../features/adminSlice';
import { FaEye, FaRegCheckCircle, FaTrashAlt } from 'react-icons/fa';
import { ProductContext } from '../features/productContext';
import PaginationComponent from '../features/PaginationComponent';

export default function AdminOrders() {
    const dispatch = useDispatch();
    const { allOrders, isLoading,pagination } = useSelector((state) => state.admin);
    const { pageNumber, setPageNumber, pageSize } = useContext(ProductContext);

    

    useEffect(() => {
        dispatch(fetchAllOrders({ pageNumber, pageSize }));
    }, [dispatch,pageNumber,pageSize]);

    const handleStatusUpdate = (order, newStatus) => {
        dispatch(updateOrderStatus({
            orderid: order.orderid,
            status: newStatus,
            totalamount: order.totalamount,
            fk_userId: order.fk_userid
        }));
    };

    return (
        <div className="card bg-base-100 shadow-sm border border-base-300 overflow-hidden">
            <div className="p-6 border-b border-base-300 bg-base-100/50">
                <h4 className="card-title text-xl font-bold">Comprehensive Orders</h4>
                <p className="text-sm opacity-60 mt-0.5">Monitor and process customer transaction statuses.</p>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr className="bg-base-200/50 text-xs uppercase tracking-wider">
                            <th className="py-4 px-6 font-semibold">Order ID</th>
                            <th className="py-4 px-6 font-semibold">User ID</th>
                            <th className="py-4 px-6 font-semibold">Amount</th>
                            <th className="py-4 px-6 font-semibold">Status</th>
                            <th className="py-4 px-6 font-semibold text-center">Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allOrders.map((order) => (
                            <tr key={order.orderid} className="hover:bg-[#f5be91]/5 transition-colors group">
                                <td className="py-4 px-6 font-mono text-xs opacity-60">#{order.orderid}</td>
                                <td className="py-4 px-6 text-sm font-medium italic">UID: {order.fk_userid}</td>
                                <td className="py-4 px-6 font-bold text-sm text-primary">${order.totalamount}</td>
                                <td className="py-4 px-6">
                                    <div className={`badge badge-sm font-bold rounded-md ${
                                        order.status === 'Delivered' ? 'badge-success' : 
                                        order.status === 'Processing' ? 'badge-info' : 
                                        order.status === 'Shipped' ? 'badge-info' : 
                                        order.status === 'Pending' ? 'badge-warning' : 
                                        order.status === 'Cancelled' ? 'badge-error' : 'badge-ghost'
                                    }`}>
                                        {order.status}
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <div className="p-1 px-2 border border-base-300 rounded-lg inline-flex items-center gap-1.5 shadow-sm bg-base-200/20">
                                        {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((stat) => (
                                            <button 
                                                key={stat}
                                                onClick={() => handleStatusUpdate(order, stat)}
                                                className={`px-2 py-1 rounded-md text-[10px] uppercase font-black transition-all ${
                                                    order.status === stat ? 'bg-primary text-primary-content shadow-sm' : 'hover:bg-primary/10 opacity-40 hover:opacity-100'
                                                }`}
                                            >
                                                {stat}
                                            </button>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {pagination && (
                <PaginationComponent
                    totalPages={pagination.totalPages}
                    pageNumber={pagination.pageNumber}
                    onPageChange={(page) => setPageNumber(page)}
                />
            )}
        </div>
    );
}
