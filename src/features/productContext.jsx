import React, { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(6);

    return (
        <ProductContext.Provider value={{ pageNumber, setPageNumber, pageSize, setPageSize }}>
            {children}
        </ProductContext.Provider>
    );
};
