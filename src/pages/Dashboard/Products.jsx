import React from 'react'
import ProductsTable from '../../components/ProductsTable/ProductsTable';
import ProductDetails from './ProductDetails'
import AddProduct from './AddProduct';
import {Routes, Route} from "react-router-dom"

const Products = () => {
    return(
        <div className="products">
        <Routes>
            <Route path="/" element={<ProductsTable products ={[ 
           {
            id:1,
            productId: 723,
            title: "Elf Bar 2% Red Watermelon",
            stock: 10,
            price: 30,
            category: "Tigari unica folosinta",
            },
            {
            id: 2,
            productId:84,
            title: "Elf Bar 5% Apple",
            stock: 20,
            price: 29.99,
            category: "Tigari unica folosinta",
            },
        ]} />} />
            <Route path="/:id" element={<ProductDetails />} />
            <Route path="/addProduct" element={<AddProduct />} />
        </Routes>
    </div>
    )
}

export default Products;