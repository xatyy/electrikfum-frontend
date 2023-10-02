/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { PhoneIcon } from '@heroicons/react/24/solid'
import AccountDropDown from '../AccountDropDown/AccountDropDown'
import ShoppingCart from '../ShoppingCart/ShoppingCart'
import { makeRequrest } from '../../makeRequest'
import { useEffect } from 'react'
import BannerAlert from '../BannerAlert/BannerAlert'
import Banner from '../BannerAnnouncement/BannerAnnouncement'
import { Link } from "react-router-dom"


const navigation = {
  categories: [
  ],
  pages: [
    { name: 'ELF BAR 2%', href: '../products/1' },
    { name: 'ELF BAR CIGALIKE 2%', href: '../products/2' },
    { name: 'PUFF BAR OOPS! FĂRĂ NICOTINĂ', href: '../products/3' },
    { name: 'PUFF BAR OOPS! AIR 2%', href: '../products/4' },
    { name: 'PUFF BAR LOST MARY BM 600 2%', href: '../products/5' },
    { name: 'PUFF BAR OOPS! MESH 2%', href: '../products/6' },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [open, setOpen] = useState(false)
  const [maintenance, setMaintenance] = useState(false);
  const [openSearch, setOpenSearch] = useState(false)
  let flo = {};

   useEffect(() => {
    const config = async () => {
      flo = await makeRequrest.get(`/config`)
      setMaintenance(flo.data.data.attributes.maintenanceMode)
    }
  config()
}, [])

function handleSearch(){
  if(openSearch){
    setOpenSearch(!openSearch)
  }else{
    setOpenSearch(!openSearch)
  }
}




  return (
    <div className="bg-white ">
 
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Links */}
              <Tab.Group as="div" className="mt-2">
                <div className="">
                  <Tab.List className="-mb-px flex px-4 space-x-8">
                    {navigation.categories.map((category) => (
                      <Tab
                        key={category.name}
                        className={({ selected }) =>
                          classNames(
                            selected ? 'text-indigo-600 border-indigo-600' : 'text-gray-900 border-transparent',
                            'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                          )
                        }
                      >
                        {category.name}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  {navigation.categories.map((category, categoryIdx) => (
                    <Tab.Panel key={category.name} className="px-4 pt-10 pb-6 space-y-12">
                      <div className="grid grid-cols-1 items-start gap-y-10 gap-x-6">
                        <div className="grid grid-cols-1 gap-y-10 gap-x-6">
                          <div>
                            <p id={`mobile-featured-heading-${categoryIdx}`} className="font-medium text-gray-900">
                              Featured
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`mobile-featured-heading-${categoryIdx}`}
                              className="mt-6 space-y-6"
                            >
                              {category.featured.map((item) => (
                                <li key={item.name} className="flex">
                                  <a href={item.href} className="text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p id="mobile-categories-heading" className="font-medium text-gray-900">
                              Categories
                            </p>
                            <ul role="list" aria-labelledby="mobile-categories-heading" className="mt-6 space-y-6">
                              {category.categories.map((item) => (
                                <li key={item.name} className="flex">
                                  <a href={item.href} className="text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-y-10 gap-x-6">
                          <div>
                            <p id="mobile-collection-heading" className="font-medium text-gray-900">
                              Collection
                            </p>
                            <ul role="list" aria-labelledby="mobile-collection-heading" className="mt-6 space-y-6">
                              {category.collection.map((item) => (
                                <li key={item.name} className="flex">
                                  <a href={item.href} className="text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <p id="mobile-brand-heading" className="font-medium text-gray-900">
                              Brands
                            </p>
                            <ul role="list" aria-labelledby="mobile-brand-heading" className="mt-6 space-y-6">
                              {category.brands.map((item) => (
                                <li key={item.name} className="flex">
                                  <a href={item.href} className="text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <a href={page.href} className="-m-2 p-2 block font-medium text-gray-900">
                      {page.name}
                    </a>
                  </div>
                ))}
              </div>

             
        
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <header className="relative">
        <nav aria-label="Top">
          {/* Top navigation */}
          <div className="bg-neutral-900">
            <div className="max-w-7xl mx-auto h-10 px-4 flex items-center justify-between sm:px-6 lg:px-8">
              {/* Currency selector */}
              <div className="lg:flex-1">
                <p className="text-white font-satoshi text-xs"> Magazin de tigari electronice | 18+</p>              
              </div>
              <p className="flex-1 text-center text-sm font-medium text-white lg:flex-none">
             {maintenance ?'⚠️ MOD MENTENANȚĂ ACCES RESTRICȚIONAT // INTERNAL ACCESS ONLY ⚠' : ''}
              </p>

              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-2">
              <p className="text-white font-medium">Distribuție: </p>
                <PhoneIcon className="text-white w-5 h-5" />
                <p className="text-white font-medium">+40 720 981 443</p>
              </div>
            </div>
          </div>

          {/* Secondary navigation */}
          <div className="bg-white border-b  border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="">
                <div className="h-32 flex items-center justify-between">
                  {/* Logo (lg+) */}
                  <div className="hidden lg:flex lg:flex-1 lg:items-center">
                    <a href="../../../../">
                      <img
                        className="h-24 w-full"
                        src="../../logo.svg"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="hidden mx-[15rem] lg:flex justify-center ">                 
                    <label className="block">
                    <span className="sr-only">Search</span>
                    <span className="relative inset-y-0 top-8 flex flex-col items-end px-3 pl-2">
                        <MagnifyingGlassIcon className="w-6 h-6" aria-hidden="false" />
                    </span>
                    <form action='/search'>
                    <input className=" placeholder:text-slate-400 block bg-white w-[23rem] border border-slate-300 rounded-xl py-2  pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 transition-colors ease-in-out duration-500 focus:ring-1 sm:text-sm" placeholder="Caută..." type="text" name=" "/>
                    </form>
                    </label>
                  </div>
                  {/* Mobile menu and search (lg-) */}
                  <div className="flex-1 flex items-center lg:hidden">
                    <button
                      type="button"
                      className="-ml-2 bg-white p-2 rounded-md text-gray-400"
                      onClick={() => setOpen(true)}
                    >
                      <span className="sr-only">Open menu</span>
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Search */}
                    <a onClick={handleSearch} className="ml-2 p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Search</span>
                      
                      <MagnifyingGlassIcon className="w-6 h-6" aria-hidden="true" />
                    </a>
                    
                  </div>

                  {/* Logo (lg-) */}
                  <a href="../../../../" className="lg:hidden">
                    <img
                      src="../logosmall.svg"
                      alt=""
                      className="h-8 w-auto"
                    />
                    
                  </a>
                            
                  <div className="flex-1 flex items-center justify-end">
                    
                    <div className="flex items-center lg:ml-8">
                      
                      <div className="flex space-x-8">
                    
                        <div className="hidden lg:flex">
                          <div onClick={handleSearch} className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Favorite</span>
                            
                          </div>
                          
                        </div>

                        <div className="flex">
                          <AccountDropDown />
                        </div>
                      </div>

                      <span className="mx-4 h-6 w-px bg-gray-200 lg:mx-6" aria-hidden="true" />

                      <div className="flow-root">
                        <ShoppingCart />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={!openSearch ? "hidden" : "flex justify-center py-4 xl:hidden"}>
          <input className=" placeholder:text-slate-400 flex  items-ce bg-white w-[23rem] border border-slate-300 rounded-xl py-2  pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 transition-colors ease-in-out duration-500 focus:ring-1 sm:text-sm" placeholder="Caută..." type="text" name=" "/>

          </div>
                   
          {/* Third navigation */}
          <div className="hidden lg:flex sticky top-10 -z-0 bg-white border-b border-gray-200">
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="">
                <div className="h-16 flex items-center justify-between">

                  <div className="hidden h-full lg:flex">
                    {/* Mega menus */}
                    <Popover.Group className="ml-8 z-10">
                      <div className="h-full flex justify-center space-x-8">
                        {navigation.categories.map((category, categoryIdx) => (
                          <Popover key={category.name} className="flex">
                            {({ open }) => (
                              <>
                                <div className="relative flex">
                                  <Popover.Button
                                    className={classNames(
                                      open
                                        ? 'border-indigo-600 text-indigo-600'
                                        : 'border-transparent text-gray-700 hover:text-gray-800',
                                      'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
                                    )}
                                  >
                                    {category.name}
                                  </Popover.Button>
                                </div>

                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-200"
                                  enterFrom="opacity-0"
                                  enterTo="opacity-100"
                                  leave="transition ease-in duration-150"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Popover.Panel className="absolute top-full inset-x-0 text-gray-500 sm:text-sm">
                                    {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                    <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                    <div className="relative bg-white">
                                      <div className="max-w-7xl mx-auto px-8">
                                        <div className="grid grid-cols-2 items-start gap-y-10 gap-x-8 pt-10 pb-12">
                                          <div className="grid grid-cols-2 gap-y-10 gap-x-8">
                                            <div>
                                              <p
                                                id={`desktop-featured-heading-${categoryIdx}`}
                                                className="font-medium text-gray-900"
                                              >
                                                Featured
                                              </p>
                                              <ul
                                                role="list"
                                                aria-labelledby={`desktop-featured-heading-${categoryIdx}`}
                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                              >
                                                {category.featured.map((item) => (
                                                  <li key={item.name} className="flex">
                                                    <a href={item.href} className="hover:text-gray-800">
                                                      {item.name}
                                                    </a>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                            <div>
                                              <p id="desktop-categories-heading" className="font-medium text-gray-900">
                                                Categories
                                              </p>
                                              <ul
                                                role="list"
                                                aria-labelledby="desktop-categories-heading"
                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                              >
                                                {category.categories.map((item) => (
                                                  <li key={item.name} className="flex">
                                                    <a href={item.href} className="hover:text-gray-800">
                                                      {item.name}
                                                    </a>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          </div>
                                          <div className="grid grid-cols-2 gap-y-10 gap-x-8">
                                            <div>
                                              <p id="desktop-collection-heading" className="font-medium text-gray-900">
                                                Collection
                                              </p>
                                              <ul
                                                role="list"
                                                aria-labelledby="desktop-collection-heading"
                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                              >
                                                {category.collection.map((item) => (
                                                  <li key={item.name} className="flex">
                                                    <a href={item.href} className="hover:text-gray-800">
                                                      {item.name}
                                                    </a>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>

                                            <div>
                                              <p id="desktop-brand-heading" className="font-medium text-gray-900">
                                                Brands
                                              </p>
                                              <ul
                                                role="list"
                                                aria-labelledby="desktop-brand-heading"
                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                              >
                                                {category.brands.map((item) => (
                                                  <li key={item.name} className="flex">
                                                    <a href={item.href} className="hover:text-gray-800">
                                                      {item.name}
                                                    </a>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Popover.Panel>
                                </Transition>
                              </>
                            )}
                          </Popover>
                        ))}

                        {navigation.pages.map((page) => (
                          <Link to={page.href}
                            key={page.name}
                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 hover:bg-neutral-200 border-transparent ease-out transition-colors border-2 "
                          >
                            {page.name}
                          </Link>
                        ))}
                      </div>
                    </Popover.Group>
                  </div>         
                  
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
