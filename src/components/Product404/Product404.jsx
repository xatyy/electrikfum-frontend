import React from "react";

const Product404 = () =>{
    return(
        <>
        <h1 className="absolute left-1/2 top-1/2 text-6xl font-medium">404</h1>
        <h1 className="absolute left-1/3 top-1/3 text-center z-40 text-6xl font-medium">Acest produs nu a fost găsit!</h1>
        <div className="load bg-gradient-to-t  blur-sm">
        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol role="list" className="flex items-center space-x-4">
              <li key="loading">
                <div className="flex items-center">
                 <div className="w-10 h-2 bg-slate-200 rounded-xl"></div>
                  <svg
                    viewBox="0 0 6 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="h-5 w-auto text-gray-300"
                  >
                    <path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z" fill="currentColor" />
                  </svg>
                </div>
              </li>
              
            <li className="text-sm">
              <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
              <div className="w-10 h-2 bg-slate-200 rounded-xl"></div>
              </a>
            </li>
          </ol>
          
        </nav>
        <div className="mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 animate-pulse ">
          <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
            <div className="lg:col-start-8 lg:col-span-5">
              <div className="flex flex-col space-y-2 justify-between">
              <div className="w-1/4 h-4 bg-slate-200 rounded-xl"></div>
                 <div className="w-1/3 h-4 bg-slate-200 rounded-xl"></div>
              </div>
              {/* Reviews */}
             {/* <div className="mt-4">
                <h2 className="sr-only">Reviews</h2>
                <div className="flex items-center">
                  <p className="text-sm text-gray-700">
                    {product.rating}
                    <span className="sr-only"> out of 5 stars</span>
                  </p>
                  <div className="ml-1 flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
                    ·
                  </div>
                  <div className="ml-4 flex">
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      See all {product.reviewCount} reviews
                    </a>
                  </div>
                </div>
              </div> */}
            </div>

            {/* Image gallery */}
            <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3 lg:space-y-10">

              <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2">
               
              <div className='w-86 rounded-xl h-[30rem] bg-slate-200'>
                </div>
              </div>
              
            </div>
         
            <div className="mt-8 space-y-6 lg:col-span-5">
              
                

                {/* Size picker */}
                <div className=" flex">
                   
                  </div>
                
                  
                <button
                  type="submit"
                  
                
                  className="mt-4 w-full bg-indigo-200 border border-transparent rounded-md py-5 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              </button>
              <div className="w-full h-10 bg-slate-200 rounded-xl"></div>

                  <div className="w-auto h-32 bg-slate-100 rounded-xl">
                    <div className='font-medium p-4 space-y-2 text-slate-800'>
                      <div className='flex space-x-3 items-center '>
                        
                        <div className="w-4 h-4 bg-slate-200 rounded-md"></div>
                        <div className="w-full h-2 bg-slate-200 rounded-xl"></div>
                      </div>
                     <div className='flex-col space-y-2 text-sm items-center'>
                     <div className="w-full h-2 bg-slate-200 rounded-xl"></div>  
                     <div className="w-full h-2 bg-slate-200 rounded-xl"></div>
                     </div>
                    </div>
                  </div>
              

              {/* Product details */}
              <div className="mt-10 space-y-3">
              <div className="w-full h-3 bg-slate-200 rounded-xl"></div>
              <div className="w-1/2 h-3 bg-slate-200 rounded-xl"></div>
              <div className="w-1/3 h-3 bg-slate-200 rounded-xl"></div>
               
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="w-full h-3 bg-slate-200 rounded-xl"></div>

                <div className="mt-4 prose space-y-3 prose-sm text-gray-500">
                  
                  <div className="w-1/2 h-3 bg-slate-200 rounded-xl"></div>
              <div className="w-1/3 h-3 bg-slate-200 rounded-xl"></div>

                </div>
              </div>

              {/* Policies */}
              <section aria-labelledby="policies-heading" className="mt-10 space-y-2">
                <h2 id="policies-heading" className="sr-only">
                  Detalii
                </h2>

                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                
                </dl>
                <div className="w-auto h-28 rounded-xl bg-gradient-to-br from-green-50 to-green-100">
                    <div className='font-medium p-4 space-y-3  text-green-900'>
                      <div className='flex space-x-3 items-center '>
                      <div className="w-4 h-4 bg-green-900 opacity-20 rounded-md"></div>
                      <div className="w-full h-2 bg-green-900 opacity-20 rounded-md"></div>
                      </div>
                     <div className='flex-col space-y-3 text-sm items-center'>
                     <div className="w-full h-2 bg-green-900 opacity-20 rounded-md"></div>
                     <div className="w-1/2 h-2 bg-green-900 opacity-20 rounded-md"></div>
                     </div>
                    </div>
                  </div>

               

<div className="w-auto h-32 border-slate-100 border-4 rounded-xl">
  <div className='font-medium p-4 space-y-2 text-slate-800'>
    <div className='flex-col space-y-5 items-center justify-center '>
      
     
      <div className="w-full h-2 bg-slate-200 rounded-xl"></div>
   
  
   <div className="w-full h-2 bg-slate-200 rounded-xl"></div>  
   <div className="w-full h-2 bg-slate-200 rounded-xl"></div>
   </div>
  </div>
</div>

              </section>
            </div>
          </div>
        </div>
        </div>
        </>
    )
}

export default Product404;