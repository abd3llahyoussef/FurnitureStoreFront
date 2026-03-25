import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct, getProducts } from '../features/productSlice';
import HandleChange from '../features/HandleChange';
import InputComponent from '../features/InputComponent';
import axios from 'axios';
import { FaPlus, FaEdit, FaImage } from 'react-icons/fa';

export default function AddProductModal({ isOpen, onClose, product = null }) {
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state.product);
    const { user } = useSelector((state) => state.user);
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        productname: '',
        description: '',
        price: '',
        quantity: '',
        fk_category: '',
        imgUrl: ''
    });

    const handleChange = HandleChange(setFormData);

    useEffect(() => {
        if (product) {
            setFormData({
                productname: product.productname || '',
                description: product.description || '',
                price: product.price || '',
                quantity: product.quantity || '',
                fk_category: product.fk_category || '',
                imgUrl: product.imgurl || ''
            });
        } else {
            setFormData({
                productname: '',
                description: '',
                price: '',
                quantity: '',
                fk_category: '',
                imgUrl: ''
            });
        }
    }, [product, isOpen]);

    useEffect(() => {
        if (isOpen && user?.token) {
            const fetchCategories = async () => {
                try {
                    const response = await axios.get('http://localhost:8080/categories/all', {
                        headers: { Authorization: `Bearer ${user.token}` }
                    });
                    setCategories(response.data);
                } catch (err) {
                    console.error('Failed to fetch categories', err);
                }
            };
            fetchCategories();
        }
    }, [isOpen, user?.token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            productname: formData.productname,
            description: formData.description,
            price: parseFloat(formData.price),
            quantity: parseInt(formData.quantity),
            fk_category: parseInt(formData.fk_category),
            imgUrl: formData.imgUrl
        };

        let resultAction;
        if (product) {
            resultAction = await dispatch(updateProduct({ ...payload, productid: product.productid }));
        } else {
            resultAction = await dispatch(createProduct(payload));
        }

        if (createProduct.fulfilled.match(resultAction) || updateProduct.fulfilled.match(resultAction)) {
            dispatch(getProducts({ pageNumber: 1, pageSize: 6 })); 
            onClose();
            if (!product) {
                setFormData({
                    productname: '',
                    description: '',
                    price: '',
                    quantity: '',
                    fk_category: '',
                    imgUrl: ''
                });
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box bg-base-100/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-[2rem] max-w-3xl overflow-hidden p-0">
                <div className="relative h-2 w-full bg-gradient-to-r from-transparent via-[#f5be91] to-transparent animate-pulse"></div>
                
                <div className="p-8">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h3 className="text-3xl font-black flex items-center gap-3 tracking-tight">
                                <div className="p-3 bg-[#f5be91]/10 rounded-2xl">
                                    {product ? <FaEdit className="text-[#f5be91] text-xl" /> : <FaPlus className="text-[#f5be91] text-xl" />}
                                </div>
                                <span>{product ? 'Edit' : 'Create'} <span className="text-[#f5be91]">Product</span></span>
                            </h3>
                            <p className="text-sm opacity-50 mt-2 font-medium">Add a new masterpiece to your furniture collection.</p>
                        </div>
                        <button 
                            className="btn btn-ghost btn-circle btn-sm hover:rotate-90 transition-transform duration-300" 
                            onClick={onClose}
                        >
                            ✕
                        </button>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column: Form Fields */}
                            <div className="space-y-5">
                                <div className="group">
                                    <InputComponent
                                        title={<span className="text-xs uppercase tracking-widest font-bold opacity-60">Product Name</span>}
                                        type="text"
                                        placeholder="E.g. Scandinavian Oak Dining Table"
                                        name="productname"
                                        value={formData.productname}
                                        onChange={handleChange}
                                        required
                                        className="input-lg border-2 focus:border-[#f5be91] transition-all duration-300 rounded-xl bg-base-200/50"
                                    />
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-xs uppercase tracking-widest font-bold opacity-60">Category</span>
                                    </label>
                                    <select 
                                        className="select select-bordered w-full bg-base-200 border-2 focus:border-[#f5be91] transition-all duration-300 rounded-xl select-md" 
                                        name="fk_category" 
                                        value={formData.fk_category} 
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>Select a category...</option>
                                        {categories.map((cat) => (
                                            <option key={cat.categoryid} value={cat.categoryid}>
                                                {cat.categoryname}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <InputComponent
                                        title={<span className="text-xs uppercase tracking-widest font-bold opacity-60">Price ($)</span>}
                                        type="number"
                                        placeholder="0.00"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                        className="border-2 focus:border-[#f5be91] transition-all duration-300 rounded-xl bg-base-200/50"
                                    />
                                    <InputComponent
                                        title={<span className="text-xs uppercase tracking-widest font-bold opacity-60">Quantity</span>}
                                        type="number"
                                        placeholder="0"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        required
                                        className="border-2 focus:border-[#f5be91] transition-all duration-300 rounded-xl bg-base-200/50"
                                    />
                                </div>
                            </div>

                            {/* Right Column: Image Preview & Description */}
                            <div className="space-y-5">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-xs uppercase tracking-widest font-bold opacity-60">Product Preview</span>
                                    </label>
                                    <div className="relative group overflow-hidden rounded-2xl border-2 border-dashed border-base-300 aspect-video bg-base-200/30 flex items-center justify-center transition-all duration-500 hover:border-[#f5be91]/50">
                                        {formData.imgUrl ? (
                                            <img 
                                                src={formData.imgUrl} 
                                                alt="Preview" 
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'https://via.placeholder.com/400x225?text=Invalid+Image+URL';
                                                }}
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center gap-3 opacity-30 group-hover:opacity-100 transition-opacity duration-300">
                                                <FaImage className="text-5xl" />
                                                <span className="text-xs font-bold uppercase tracking-widest">Awaiting Image URL</span>
                                            </div>
                                        )}
                                        <div className="absolute bottom-3 left-3 right-3">
                                            <input 
                                                type="url"
                                                placeholder="Paste image URL here..."
                                                name="imgUrl"
                                                value={formData.imgUrl}
                                                onChange={handleChange}
                                                className="input input-sm w-full bg-base-100/90 backdrop-blur-md border-0 rounded-lg shadow-xl text-xs"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-xs uppercase tracking-widest font-bold opacity-60">Description</span>
                                    </label>
                                    <textarea
                                        className="textarea textarea-bordered h-[116px] bg-base-200/50 border-2 focus:border-[#f5be91] transition-all duration-300 rounded-xl resize-none"
                                        placeholder="Describe the soul of this product..."
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="alert alert-error bg-error/10 border-error/20 text-error backdrop-blur-md shadow-inner py-3 px-5 rounded-2xl text-sm font-bold flex items-center gap-3 animate-head-shake">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="flex justify-end gap-4 pt-6 mt-4 border-t border-base-200">
                            <button 
                                type="button" 
                                className="btn btn-ghost rounded-2xl px-6 font-bold uppercase tracking-widest text-xs h-14" 
                                onClick={onClose}
                            >
                                Discard
                            </button>
                            <button 
                                type="submit" 
                                className={`btn border-0 text-black font-black uppercase tracking-[0.2em] text-xs h-14 px-10 rounded-2xl shadow-2xl transition-all duration-300 transform active:scale-95 ${
                                    isLoading 
                                    ? 'bg-base-300' 
                                    : 'bg-[#f5be91] hover:bg-[#e5ae81] hover:shadow-[#f5be91]/30 hover:-translate-y-1'
                                }`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    product ? 'Update Product' : 'Add Product'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="modal-backdrop bg-black/70 backdrop-blur-sm transition-all duration-500" onClick={onClose}></div>
        </div>
    );
}
