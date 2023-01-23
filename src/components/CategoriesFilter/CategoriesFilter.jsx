import React from "react";
import { useParams } from "react-router-dom";
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import NewProduct from "../Featured/NewProduct";
import Products from "../../pages/Products/Products";
import useFetch from "../../hooks/useFetch";
import ProductCard from "../ProductCard/ProductCard";
import ProductsList from "../ProductsList/ProductsList";
import ProductCardSmallLoading from "../ProductCardSmallLoading/ProductCardSmallLoading";

const sortOptions = [
    { name: 'Relevante', href: '#', current: true },
  { name: 'Pret Crescator', href: '#', current: false },
  { name: 'Pret Descrescator', href: '#', current: false },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example ({type}) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const catId = parseInt(useParams().id);
  const [sort, setSort] = useState("desc");
  const [selectedSubCats, setSelectedSubCats] = useState([])
  const [selectedBrand, setSelectedBrand] = useState([])


  const {data, loading, error} = useFetch(`/sub-categories?[filters][categories][id][$eq]=${catId}`);
  const {data:brand, loading:brandLoading, error:brandError} = useFetch(`/brands?populate=*`);
  const {data:categ, loading:categload, error:categerr} = useFetch(`/categories?populate=*&[filters][id][$eq]=${catId}`);
  
  

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(
      isChecked
      ? [...selectedSubCats, value]
      : selectedSubCats.filter((item) => item !== value)
    );
  };

  const handleBrandChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedBrand(
      isChecked
      ? [...selectedBrand, value]
      : selectedBrand.filter((item) => item !== value)
    );
  };

  console.log(selectedBrand)
  console.log(selectedSubCats)

  return (
    <div className="categories bg-white">
      <div>
        {/* Mobile filter dialog */}
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

                  {/* Filters */}
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
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between  pt-12 pb-6">
            <div className="flex-col">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">{categ ? categ[0]?.attributes?.title : ""}</h1>
            <h1 className="text-md font-bold tracking-tight text-gray-900">{categ? categ[0]?.attributes?.description : ""}</h1>                       
            </div>
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sorteaza
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filtre</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

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
                <ProductsList catId={catId} sort={sort} subCats={selectedSubCats} brand={selectedBrand} />
                {/* /End replace */}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}