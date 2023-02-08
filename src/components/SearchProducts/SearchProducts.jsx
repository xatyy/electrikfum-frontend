import React from "react";
import useFetch from "../../hooks/useFetch";
import ProductCardSmall from "../ProductCardSmall/ProductCardSmall";
import ProductCardSmallLoading from "../ProductCardSmallLoading/ProductCardSmallLoading";



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example ({search}) {



  const {data:prod, loading:prodload, error:proderr} = useFetch(`/products?populate=*&[filters][title][$containsi]=${search}`);

  return (
    <div className="categories bg-white">
      <div>
        {/* Mobile filter dialog */}
        {/*
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                
                  <form className="mt-4 border-t border-gray-200">
                    
                    

                    
                      <Disclosure as="div" key="1" className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">Subcategorie</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {data.map((item) => (
                                  <div key={item.id} className="flex items-center">
                                    <input
                                      id={item.id}
                                      name={item.id}
                                      type="checkbox"
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={item.id}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {item.attributes.title}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>

                      <Disclosure as="div" key="2" className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">Brand</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {brand.map((item) => (
                                  <div key={item.id} className="flex items-center">
                                    <input
                                      id={item.id}
                                      name={item.id}
                                      type="checkbox"
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={item.id}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {item.attributes.title}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>

                      <Disclosure as="div" key="3" className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">Contine nicotina</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                            
                            <div key="1" className="flex items-center">
                              <input
                                id="hasNic"
                                name="hasNic"                               
                                type="checkbox"
                                defaultChecked
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="hasNic"
                                className="ml-3 min-w-0 flex-1 text-gray-500"
                              >
                                Da
                              </label>
                            </div>

                            <div key="2" className="flex items-center">
                              <input
                                id="hasntNic"
                                name="hasntNic"                               
                                type="checkbox"
                                defaultChecked
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="hasntNic"
                                className="ml-3 min-w-0 flex-1 text-gray-500"
                              >
                                Nu
                              </label>
                            </div>

                            
                          
                          </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>

                    
                    
                    
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root> */}

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">

              {/* Filters */}
              {/*
              <form className="hidden lg:block">
                
                
                 
                  <Disclosure as="div" key={"1"} className="border-b border-gray-200 py-6">
                    
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">Sub Categorie</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                         <div className="space-y-4">
                            {data?.map((item) => (
                              <div key={item.id} className="flex items-center">
                                <input
                                  id={item.id}
                                  value={item.id}                               
                                  type="checkbox"
                                  onChange={handleChange}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={item.id}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {item.attributes.title}
                                </label>
                              </div>
                            ))}
                            </div>
                        </Disclosure.Panel>
                        
                      </>
                    )}
                  </Disclosure>

                  <Disclosure as="div" key={"2"} className="border-b border-gray-200 py-6">
                    
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">Brand</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                         <div className="space-y-4">
                            {brand?.map((item) => (
                              <div key={item.id} className="flex items-center">
                                <input
                                  id={item.id}
                                  onChange={handleBrandChange}
                                  value={item.id}                               
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={item.id}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {item.attributes.title}
                                </label>
                              </div>
                            ))}
                            </div>
                        </Disclosure.Panel>

                        
                        
                      </>
                    )}
                  </Disclosure>

                  <Disclosure as="div" key={"3"} className="border-b border-gray-200 py-6">
                    
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">Contine Nicotina</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                         <div className="space-y-4">
                            
                              <div key="1" className="flex items-center">
                                <input
                                  id="hasNic"
                                  name="hasNic"
                                                               
                                  type="checkbox"
                                  defaultChecked
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor="hasNic"
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  Da
                                </label>
                              </div>

                              <div key="2" className="flex items-center">
                                <input
                                  id="hasntNic"
                                  name="hasntNic"                               
                                  type="checkbox"
                                  defaultChecked
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor="hasntNic"
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  Nu
                                </label>
                              </div>

                              
                            
                            </div>
                        </Disclosure.Panel>

                        
                        
                      </>
                    )}
                  </Disclosure>

              </form>
                              */}

              {/* Product grid */}
              <div className="lg:col-span-4">
                {/* Replace with your content */}
                <div className="productslist">
             <div className="bg-white">
        <div className="max-w-2xl mx-auto py-2 px-4 sm:py-2 sm:px-6 lg:max-w-6xl lg:px-8">
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8">
            {proderr ? "Something went wrong" : (prodload
            ? <ProductCardSmallLoading />
            : prod?.map((product) => (
                <ProductCardSmall product={product} key={product.id} />
            )))}
            
          </div>
        </div>
      </div>
        </div>
                {/* /End replace */}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}