import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, deleteProduct } from '../features/productSlice';
import { FaPlus, FaEdit, FaTrash, FaImage } from 'react-icons/fa';
import { ProductContext } from "../features/productContext.jsx";
import PaginationComponent from '../features/PaginationComponent';
import AddProductModal from './AddProductModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

export default function AdminProducts() {
    const dispatch = useDispatch();
    const { products, isLoading, pagination } = useSelector((state) => state.product);
    const { pageNumber, setPageNumber, pageSize } = useContext(ProductContext);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [productToEdit, setProductToEdit] = React.useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
    const [productToDelete, setProductToDelete] = React.useState(null);
    

    useEffect(() => {
        dispatch(getProducts({ pageNumber, pageSize }));
    }, [dispatch, pageNumber, pageSize]);

    const handleEditClick = (product) => {
        setProductToEdit(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setProductToEdit(null);
    };

    const handleConfirmDelete = () => {
        if (productToDelete) {
            dispatch(deleteProduct(productToDelete.productid));
            setIsDeleteModalOpen(false);
            setProductToDelete(null);
        }
    };


    return (
        <>
        <div className="card flex flex-col bg-base-100 shadow-sm border border-base-300 overflow-hidden">
            <div className="p-6 border-b border-base-300 flex justify-between items-center bg-base-100/50">
                <div>
                    <h4 className="card-title text-xl font-bold">Product Inventory</h4>
                    <p className="text-sm opacity-60 mt-0.5">Add, edit, or remove products from your catalog.</p>
                </div>
                <button 
                    className="btn btn-primary bg-[#f5be91] text-black border-[#f5be91] btn-md rounded-xl shadow-lg shadow-[#f5be91]/20 gap-2"
                    onClick={() => setIsModalOpen(true)}
                >
                    <FaPlus /> 
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-base-200/50 text-xs uppercase tracking-wider">
                            <th className="py-4 px-6 font-semibold">Img</th>
                            <th className="py-4 px-6 font-semibold">Product Name</th>
                            <th className="py-4 px-6 font-semibold">Category</th>
                            <th className="py-4 px-6 font-semibold">Price</th>
                            <th className="py-4 px-6 font-semibold">Qty</th>
                            <th className="py-4 px-6 font-semibold text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && Array.isArray(products.products) && products.products.map((product) => (
                            <tr key={product.productid} className="hover:bg-[#f5be91]/5 transition-colors border-b border-base-200 last:border-0 group">
                                <td className="py-4 px-6">
                                    <div className="mask mask-squircle w-12 h-12 bg-base-200 flex items-center justify-center overflow-hidden border border-base-300 shadow-sm">
                                        {product.imgurl ? (
                                            <img src={product.imgurl} alt={product.productname} className="object-cover w-full h-full" />
                                        ) : (
                                            <FaImage className="opacity-20" />
                                        )}
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-sm group-hover:text-[#f5be91] transition-colors">{product.productname}</span>
                                        <span className="text-xs opacity-50 line-clamp-1 max-w-[200px]">{product.description}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 italic text-xs">{product.categoryname}</td>
                                <td className="py-4 px-6 font-bold text-sm">${product.price}</td>
                                <td className="py-4 px-6">
                                    <span className={`badge badge-sm font-bold rounded-md ${product.quantity > 5 ? 'badge-ghost opacity-70' : 'badge-error'}`}>
                                        {product.quantity}
                                    </span>
                                </td>
                                <td className="py-6 px-6 text-right space-x-1.5 flex justify-center">
                                    <button 
                                        onClick={() => handleEditClick(product)}
                                        className="btn btn-ghost btn-sm btn-square rounded-lg hover:bg-info/20 hover:text-info"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteClick(product)}
                                        className="btn btn-ghost btn-sm btn-square rounded-lg hover:bg-error/20 hover:text-error"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             
        </div>
        <div className=" flex justify-center">
                      <PaginationComponent
                        pageNumber={pageNumber}
                        totalPages={(products && products.pagination && products.pagination.totalPages) || 1}
                        onPageChange={(p) => setPageNumber(p)}
                      />
                    </div>
                        <AddProductModal 
                            isOpen={isModalOpen} 
                            onClose={handleCloseModal} 
                            product={productToEdit} 
                        />
                        <DeleteConfirmationModal 
                            isOpen={isDeleteModalOpen} 
                            onClose={() => setIsDeleteModalOpen(false)} 
                            onConfirm={handleConfirmDelete} 
                            itemName={productToDelete?.productname}
                            title="Confirm Deletion"
                            message={`Are you sure you want to remove ${productToDelete?.productname}? This action cannot be undone.`}
                            confirmText="Delete Product"
                            cancelText="Keep Product"
                        />
        </>
    );
}
