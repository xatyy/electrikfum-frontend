import React from 'react'
import { Link } from 'react-router-dom'
import {ShoppingCartIcon } from '@heroicons/react/24/solid'
import {useDispatch} from "react-redux"
import {addToCart} from "../../redux/cartReducer"
import Notification from '../../components/Notification/Notification'
import { useState } from 'react'

const ProductCardSmall = ({product}) => {
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('');
   const dispatch = useDispatch()

   
   function timeout(delay){
    return new Promise(res => setTimeout(res, delay));
}


   async function createNotification(message){
    setShow(true)
    setMessage(message)
    await timeout(2500);
    setShow(false)

}

    return(
    <div
    key={product?.attributes.id}
    className=" relative bg-white border border-gray-200 rounded-2xl flex flex-col overflow-hidden"
  >
      <Link to={`/product/${product?.id}`}>
    <div className="aspect-w-3 aspect-h-2 bg-white sm:aspect-none sm:h-56">
      <img
      alt={product?.attributes.title}
        src={
            product?.attributes.img?.data ? process.env.REACT_APP_UPLOAD_URL + product?.attributes.img?.data[0].attributes?.url
            : process.env.REACT_APP_UPLOAD_URL + "/uploads/null_521f84f056.png"
        }
        className="w-full h-full object-center object-cover px-20  sm:w-auto sm:h-81 "
      />
    </div>
    </Link>
    <div className="flex-1 p-4 space-y-2 flex flex-col">
      <h3 className="text-md font-medium text-gray-900">
        
          
          {product?.attributes.title}
        
      </h3>
      <div className="flex-1 flex flex-col justify-end">
        <p className="text-base font-medium text-[#5f5f5f]">{product?.attributes.price.toFixed(2)} RON</p>
        
      </div>
      <div className="flex-1 flex justify-end ">
         <button
          className="disabled:opacity-40"
          type="submit"
          onClick={()=>dispatch(addToCart({
            id:product?.id,
            title:product?.attributes.title,
            price:product?.attributes.price,
            img:product?.attributes.img.data[0].attributes.url,
            quantity: 1,
          }),createNotification("Produsul a fost adăugat in coș!"))}
          disabled={product?.attributes.stock  ? "" : "true"}
         >
      <ShoppingCartIcon className="w-8 bg-[#1a1a1a] border-[#1a1a1a] hover:border-[#222222] hover:bg-[#222222] border-4 rounded-md text-white" />
         </button>
      </div>
      
    </div>
    <Notification show={show} message={message} 
    onClose={() => setShow(false)}
    />
  </div>
    )
}

export default ProductCardSmall;