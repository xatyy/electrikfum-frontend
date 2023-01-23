import React from 'react'

const Promo = () => {
    return(
        <div className="promo">
            <div className="bg-white">
      <div className="lg:p-20 pt-32 overflow-hidden sm:pt-14">
        <div className="w-30 bg-[#3D3D3D] lg:rounded-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative pt-48 pb-16 sm:pb-24">
              <div>
                <h2 id="sale-heading" className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                  Vezi gama Elf Bar!
                  <br />
                  BESTSELLER PUFF BAR
                </h2>
                <div className="mt-6 text-base">
                  <a href="/products/3" className="font-semibold text-white">
                    Cumpără acum<span aria-hidden="true"> &rarr;</span>
                  </a>
                </div>
              </div>

              <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 md:-top-48 md:right-48 md:translate-x-0">
                <div className="ml-32 flex space-x-6 min-w-max sm:ml-3 lg:space-x-8">
                  <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                    <div className="flex-shrink-0">
                      <img
                        className=" w-64 mt-24 h-auto object-cover md:h-[40rem] md:w-auto"
                        src="./elfbar.png"
                        alt=""
                      />
                    </div>

                   
                  </div>
                  
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        </div>
    )
}

export default Promo;