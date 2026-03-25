import React, { useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllUsers, deleteUser } from '../features/adminSlice';
import { FaTrash, FaShieldAlt, FaUserEdit } from 'react-icons/fa';
import { ProductContext } from "../features/productContext.jsx";
import PaginationComponent from '../features/PaginationComponent';
import DeleteConfirmationModal from './DeleteConfirmationModal';

export default function AdminUsers() {
    const dispatch = useDispatch();
    const { allUsers, isLoading,pagination } = useSelector((state) => state.admin);
    const { pageNumber, setPageNumber, pageSize } = useContext(ProductContext);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        dispatch(fetchAllUsers({ pageNumber, pageSize }));
    }, [dispatch,pageNumber,pageSize]);

    const handleDeleteClick = (email) => {
        setUserToDelete(email);
        console.log(email);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (userToDelete) {
            dispatch(deleteUser(userToDelete));
            setIsDeleteModalOpen(false);
            setUserToDelete(null);
        }
    };

    return (
        <div className="card bg-base-100 shadow-sm border border-base-300 overflow-hidden">
            <div className="p-6 border-b border-base-300 bg-base-100/50">
                <h4 className="card-title text-xl font-bold">User Database</h4>
                <p className="text-sm opacity-60 mt-0.5">Manage user accounts and their permissions.</p>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr className="bg-base-200/50 text-xs uppercase tracking-wider">
                            <th className="py-4 px-6 font-semibold">User</th>
                            <th className="py-4 px-6 font-semibold">Email</th>
                            <th className="py-4 px-6 font-semibold">Role</th>
                            <th className="py-4 px-6 font-semibold text-right">Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((user) => (
                            <tr key={user.userid} className="hover:bg-[#f5be91]/5 transition-colors group border-b border-base-200 last:border-0">
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-4">
                                        <div className="avatar placeholder">
                                            <div className="bg-primary-focus text-primary-content rounded-xl w-10">
                                                <span className="text-sm uppercase font-black">{user.username.slice(0, 2)}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm tracking-tight">{user.username}</span>
                                            <span className="text-[10px] opacity-40">UID: {user.userid}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-sm opacity-70 italic">{user.email}</td>
                                <td className="py-4 px-6">
                                    <div className={`badge badge-sm rounded px-3 font-bold flex gap-1.5 items-center ${user.fk_role === 1 ? 'bg-[#f5be91] shadow-sm' : 'badge-ghost opacity-60'}`}>
                                        {user.fk_role === 1 ? <FaShieldAlt className="text-[10px]" /> : null}
                                        {user.fk_role === 1 ? 'Admin' : 'Customer'}
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-right space-x-2">
                                    <button 
                                        onClick={() => handleDeleteClick(user.email)}
                                        disabled={user.fk_role === 1}
                                        className="btn btn-ghost btn-sm btn-square rounded-lg hover:bg-error/20 hover:text-error disabled:opacity-20"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className=" flex justify-center">
                      <PaginationComponent
                        pageNumber={pageNumber}
                        totalPages={(pagination && pagination.totalPages) || 1}
                        onPageChange={(p) => setPageNumber(p)}
                      />
                    </div>
                <DeleteConfirmationModal 
                    isOpen={isDeleteModalOpen} 
                    onClose={() => setIsDeleteModalOpen(false)} 
                    onConfirm={handleConfirmDelete} 
                    itemName={userToDelete}
                    title="Confirm Deletion"
                    message={`Are you sure you want to remove ${userToDelete}? This action cannot be undone.`}
                    confirmText="Delete Account"
                    cancelText="Keep User"
                />
        </div>
    );
}
