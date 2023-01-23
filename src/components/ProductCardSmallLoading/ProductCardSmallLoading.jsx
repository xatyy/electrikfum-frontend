import React from 'react'
import { Link } from 'react-router-dom'
import {ShoppingCartIcon } from '@heroicons/react/24/solid'

const ProductCardSmallLoading = ({product}) => {

    return(
    <div
    key="loader"
    className=" relative bg-white border border-gray-200 rounded-2xl flex flex-col overflow-hidden "
  >
    <div className="animate-pulse">
      <a href={`/product/${product?.id}`}>
    <div className="aspect-w-3 aspect-h-2 bg-white sm:aspect-none sm:h-56">
      <div className="bg-slate-200 h-full w-full"></div>
    </div>
    </a>
    <div className="flex-1 p-4 space-y-8 flex flex-col">
      
        
          
      <div className="bg-slate-200 h-5 w-48 rounded-md"></div>
        
    
      <div className="flex-1 flex flex-col justify-end">
        <div className="bg-slate-200 h-2 w-32 rounded-md"></div>
        
      </div>
      <div className="flex-1 flex justify-end">
      <div className="bg-slate-200 h-8 w-8 rounded-md"></div>
      </div>
      </div>
    </div>
  </div>
    )
}

export default ProductCardSmallLoading;