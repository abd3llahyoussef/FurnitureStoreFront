import React from 'react';
import { FaTrash, FaExclamationTriangle } from 'react-icons/fa';

export default function DeleteConfirmationModal({ 
    isOpen, 
    onClose, 
    onConfirm, 
    itemName, 
    title = "Confirm Deletion",
    message = "Are you sure you want to remove this item? This action cannot be undone.",
    confirmText = "Delete Item",
    cancelText = "Keep Item"
}) {
    if (!isOpen) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box bg-base-100/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-[2rem] max-w-md overflow-hidden p-0">
                <div className="relative h-2 w-full bg-gradient-to-r from-transparent via-error to-transparent animate-pulse"></div>
                
                <div className="p-8">
                    <div className="flex flex-col items-center text-center">
                        <div className="p-4 bg-error/10 rounded-full mb-6">
                            <FaExclamationTriangle className="text-error text-4xl" />
                        </div>
                        <h3 className="text-2xl font-black tracking-tight mb-2">
                            {title.split(' ')[0]} <span className="text-error">{title.split(' ').slice(1).join(' ')}</span>
                        </h3>
                        <p className="text-sm opacity-60 font-medium px-4">
                            {message.split(itemName)[0]}
                            <span className="font-bold text-base-content">{itemName}</span>
                            {message.split(itemName)[1]}
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 pt-8">
                        <button 
                            onClick={onConfirm}
                            className="btn btn-error text-white font-black uppercase tracking-widest text-xs h-14 rounded-2xl shadow-xl hover:shadow-error/20 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2"
                        >
                            <FaTrash className="text-sm" />
                            {confirmText}
                        </button>
                        <button 
                            className="btn btn-ghost rounded-2xl px-6 font-bold uppercase tracking-widest text-xs h-14" 
                            onClick={onClose}
                        >
                            {cancelText}
                        </button>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop bg-black/70 backdrop-blur-sm transition-all duration-500" onClick={onClose}></div>
        </div>
    );
}
