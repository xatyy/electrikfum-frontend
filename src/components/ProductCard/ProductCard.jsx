import React from 'react'
import { Link } from 'react-router-dom'
import {ShoppingCartIcon } from '@heroicons/react/24/solid'

const ProductCard = ({product}) => {

    return(
    <div
    key={product?.attributes.id}
    className=" relative bg-white border border-gray-200 rounded-2xl flex flex-col overflow-hidden"
  >
      <a href={`/product/${product?.id}`}>
    <div className="aspect-w-3 aspect-h-4 bg-[#f7f7f7] sm:aspect-none sm:h-96">
      <img
        src={
            product?.attributes.img?.data ? process.env.REACT_APP_UPLOAD_URL + product?.attributes.img?.data[0].attributes?.url
            : process.env.REACT_APP_UPLOAD_URL + "/uploads/null_521f84f056.png"
        }
        alt=""
        className="w-full h-full object-center object-cover px-20  sm:w-auto sm:h-81 "
      />
    </div>
    </a>
    <div className="flex-1 p-4 space-y-2 flex flex-col">
      <h3 className="text-md font-medium text-gray-900">
        
          
          {product?.attributes.title}
        
      </h3>
      <div className="flex-1 flex flex-col justify-end">
        <p className="text-base font-medium text-[#5f5f5f]">{product?.attributes.price} RON</p>
        
      </div>
      <div className="flex-1 flex justify-end">
          <Link to={`/product/${product?.id}`}>
      <ShoppingCartIcon className="w-8 bg-[#1a1a1a] border-[#1a1a1a] hover:border-[#222222] hover:bg-[#222222] border-4 rounded-md text-white" />
        </Link>
      </div>
      
    </div>
  </div>
    )
}

export default ProductCard;