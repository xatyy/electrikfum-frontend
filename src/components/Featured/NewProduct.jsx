import ProductCard from '../ProductCard/ProductCard'
import useFetch from '../../hooks/useFetch';

const NewProduct = ({type}) => {

    const {data, loading, error} = useFetch(`/products?populate=*&[filters][type][$eq]=${type}`);

    return(
        <div className="newproducts">
             <div className="bg-white">
             <p className="text-2xl px-4 mx-auto sm:px-6 lg:max-w-6xl lg:px-8">Produse Bestseller</p>
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-6xl lg:px-8">
          <h2 className="sr-only">Produse Bestseller</h2>
          

          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
            {error ? "Something went wrong" : (loading
            ? "loading"
            : data?.map((product) => (
                <ProductCard product={product} key={product.id} />
            )))}
          </div>
        </div>
      </div>
        </div>
    )
}

export default NewProduct;