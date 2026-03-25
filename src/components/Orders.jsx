import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders, getProductsByOrder } from '../features/orderSlice';
import { useContext } from 'react';
import { ProductContext } from '../features/productContext.jsx';
import PaginationComponent from '../features/PaginationComponent.jsx';

export default function Orders() {

    const dispatch = useDispatch();
    const {pageNumber,setPageNumber,pageSize} = useContext(ProductContext)
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const [orderProducts, setOrderProducts] = useState({});
    const [loadingProducts, setLoadingProducts] = useState(false);
    
    useEffect(() => {
       dispatch(getUserOrders({pageNumber, pageSize}));
    }, [pageNumber, pageSize]);

    const toggleOrderDetails = async (orderId) => {
      if (expandedOrderId === orderId) {
        setExpandedOrderId(null);
        return;
      }

      setExpandedOrderId(orderId);
      
      if (!orderProducts[orderId]) {
        setLoadingProducts(true);
        try {
          const result = await dispatch(getProductsByOrder({ orderid: orderId })).unwrap();
          setOrderProducts(prev => ({
            ...prev,
            [orderId]: result
          }));
        } catch (error) {
          console.error("Failed to fetch products:", error);
        } finally {
          setLoadingProducts(false);
        }
      }
    };
  

    // make sure the selector always returns an array to avoid errors
    const orderState = useSelector(state => state.order || {});
    const orders = orderState.orders || [];
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
      case 'success':
        return 'badge-success text-success-content';
      case 'pending':
        return 'badge-warning text-warning-content';
      case 'cancelled':
        return 'badge-error text-error-content';
      case 'processing':
        return 'badge-info text-info-content';
      case 'shipped':
        return 'badge-info text-info-content';
      default:
        return 'badge-ghost';
    }
  };

  return (
    <div className='min-h-screen bg-base-200 py-12 px-4 sm:px-8 lg:px-16'>
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="text-sm breadcrumbs mb-4 text-base-content/50">
            <ul>
              <li><a>Home</a></li> 
              <li>Orders</li>
            </ul>
          </div>
          <h1 className="text-5xl font-black tracking-tight">Your Order History</h1>
        </div>

        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="bg-base-100 rounded-[32px] p-20 text-center shadow-sm border border-base-200">
              <div className="mb-6 opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">No orders found</h2>
              <p className="text-base-content/60 mb-8">You haven't placed any orders yet. Start your journey today!</p>
              <button className="btn bg-[#f5be91] border-none text-black font-bold px-8 rounded-xl shadow-lg shadow-[#f5be91]/20">Explore Products</button>
            </div>
          ) : (
            orders.map(order => (
              <div
                key={order.orderid}
                className="bg-base-100 p-8 rounded-[32px] shadow-sm hover:shadow-md transition-all duration-300 border border-base-200 group overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#f5be91]/5 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:bg-[#f5be91]/10 transition-colors"></div>
                
                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 relative z-10">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-black uppercase tracking-widest text-[#f5be91]">Order ID</span>
                      <span className="text-xl font-bold font-mono">#{order.orderid}</span>
                      <div className={`badge badge-md font-bold px-4 py-3 rounded-lg ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-8">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-base-content/40 uppercase tracking-wider mb-1">Placed On</span>
                        <span className="font-bold text-lg">{new Date(order.createdat).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      
                      {order.username && (
                        <div className="flex flex-col border-l-2 border-base-200 pl-8">
                          <span className="text-xs font-bold text-base-content/40 uppercase tracking-wider mb-1">Customer</span>
                          <span className="font-bold text-lg">{order.username}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-start lg:items-end justify-center lg:text-right border-t lg:border-t-0 lg:border-l-2 border-base-200 pt-6 lg:pt-0 lg:pl-12">
                    <span className="text-xs font-bold text-base-content/40 uppercase tracking-wider mb-1">Total Amount</span>
                    <span className="text-4xl font-black text-[#f5be91]">${parseFloat(order.totalamount).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-base-200">
                  <div className="flex justify-end">
                    <button 
                      onClick={() => toggleOrderDetails(order.orderid)}
                      className={`btn btn-ghost ${expandedOrderId === order.orderid ? 'bg-[#f5be91]/10 text-[#f5be91]' : 'hover:bg-[#f5be91]/10 text-[#f5be91]'} font-bold rounded-xl transition-all`}
                    >
                      {expandedOrderId === order.orderid ? 'Hide Details' : 'View Details'}
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 ml-2 transition-transform duration-300 ${expandedOrderId === order.orderid ? 'rotate-180' : 'group-hover:translate-x-1'}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {expandedOrderId === order.orderid && (
                    <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-500">
                      <h4 className="text-sm font-black uppercase tracking-widest text-base-content/40 mb-6">Order Items</h4>
                      
                      {loadingProducts && !orderProducts[order.orderid] ? (
                        <div className="flex justify-center py-12">
                          <span className="loading loading-spinner loading-lg text-[#f5be91]"></span>
                        </div>
                      ) : (
                        <div className="grid gap-4">
                          {orderProducts[order.orderid]?.map((item, idx) => (
                            <div 
                              key={idx}
                              className="flex items-center gap-6 p-4 rounded-2xl bg-base-200/50 hover:bg-base-200 transition-colors border border-transparent hover:border-base-300 group/item"
                            >
                              <div className="w-20 h-20 rounded-xl overflow-hidden bg-white flex-shrink-0 border border-base-200 shadow-sm relative">
                                {item.imgUrl ? (
                                  <img 
                                    src={item.imgUrl} 
                                    alt={item.productname} 
                                    className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-base-300 text-base-content/20">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex-grow min-w-0">
                                <h5 className="font-bold text-lg truncate mb-1">{item.productname || `Product #${item.fk_productId}`}</h5>
                                <div className="flex items-center gap-4 text-sm font-medium text-base-content/60">
                                  <span>Qty: <span className="text-base-content font-bold">{item.quantity}</span></span>
                                  <span className="w-1 h-1 rounded-full bg-base-300"></span>
                                  <span>Price: <span className="text-base-content font-bold">${(parseFloat(item.price)/item.quantity).toFixed(2)}</span></span>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <span className="text-xs font-bold text-base-content/40 uppercase tracking-tight block mb-1">Subtotal</span>
                                <span className="text-xl font-black text-primary">${(parseFloat(item.price)).toFixed(2)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
        <div className="my-6 flex justify-center">
                  <PaginationComponent
                    pageNumber={pageNumber}
                    totalPages={orderState && orderState.pagination ? orderState.pagination.totalPages : 1}
                    onPageChange={(p) => setPageNumber(p)}
                  />
                </div>
    </div>
    );
}

