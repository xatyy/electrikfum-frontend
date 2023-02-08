import ProductCardSmall from '../ProductCardSmall/ProductCardSmall'
import ProductCardSmallLoading from '../ProductCardSmallLoading/ProductCardSmallLoading';
import useFetch from '../../hooks/useFetch';
import React from "react";

const ProductsList = ({catId, sort, subCats, brand}) => {

    const {data, loading, error} = useFetch(`/products?populate=*${brand.map(
        (item) => `&[filters][brands][id][$eq]=${item}`
    )}&[filters][categories][id]=${catId}${subCats.map(
        (item) => `&[filters][sub_categories][id][$eq]=${item}`
    )}&sort=price:${sort}`);

    return(
      <div className="productslist">
      <div className="bg-white">
 <div className="max-w-2xl mx-auto py-2 px-4 sm:py-2 sm:px-6 lg:max-w-6xl lg:px-8">
   

   <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8">
     {error ? "Something went wrong" : (loading
     ? <ProductCardSmallLoading />
     : data?.map((product) => (
         <ProductCardSmall product={product} key={product.id} />
     )))}
     
   </div>
 </div>
</div>
 </div>
    )
}

export default ProductsList;