import React, {useEffect} from 'react'
import getJwtData from '../../services/getJwtData'
import { makeRequrestAsUser } from '../../makeRequestAsUser'
import clsx from "clsx"
import { NavLink, useLocation, Link } from "react-router-dom"
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  CalendarIcon,
  ChartBarIcon,
  ShoppingBagIcon,
  HomeIcon,
  BanknotesIcon,
  Bars3Icon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'






function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DashboardSidebar = ({children}) => {
  let userData = {};

  let orderCountNew = {};

const [test, setTest] = useState(true);
const [uorder, setUorder]= useState(0)
const [time, setTime] = useState(Date.now());





useEffect(() => {

  const fetch = async() => {
    let test = await makeRequrestAsUser.get('/orders/countUnhandled',{});
    setUorder(test.data);
  }
  const data = async () => {
    userData = await getJwtData;
    orderCountNew = await makeRequrestAsUser.get('/orders/countUnhandled',{})
    setUorder(orderCountNew.data);
    setTest(userData);
    
    const interval = setInterval(() => 
      
    fetch(),
  
      5000);
      
    
    return () => {
      clearInterval(interval);
    };
  }
data()
}, [])


    const [sidebarOpen, setSidebarOpen] = useState(false)
    const navigation = [
        { id:'0', name: 'Administrare magazin', href: '/dashboard', icon: HomeIcon, current: useLocation().pathname == "/dashboard" ? true : false},
        { id:'1', name: 'Comenzi', href: '../dashboard/orders', icon: BanknotesIcon, current: useLocation().pathname == "/dashboard/orders" ? true : false },
        { id:'2', name: 'Utilizatori', href: '../dashboard/users', icon: UsersIcon, current: useLocation().pathname == "/dashboard/users" ? true : false },
        { id:'3', name: 'Produse', href: '../dashboard/products', icon: ShoppingBagIcon, current: useLocation().pathname == "/dashboard/products" ? true : false },
      ]

    return(
        <div className="dashboardsidebar">
            <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
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
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src="../logo.svg"
                      alt="Workflow"
                    />
                  </div>
                  <nav className="mt-5 px-2 space-y-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                            'mr-4 flex-shrink-0 h-6 w-6'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                        {item.name === "Comenzi" && uorder > 0 ? 
                    <>
                    <div className='absolute ml-[14px] mb-5 h-3 w-3 bg-red-600 rounded-full animate-ping'></div>
                    <div className='absolute ml-[14px] mb-5 h-3 w-3 bg-red-600 rounded-full opacity-60'></div>

                    </>
                    : ""}
                      </a>
                    ))}
                  </nav>
                </div>
                <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                  <a href="#" className="flex-shrink-0 group block">
                    <div className="flex items-center">
                      <div>
                       
                      </div>
                      <div className="ml-3">
                      <Link to="/"> <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">{test.firstName} {test.lastName}</p> </Link>
                       <Link to="/"> <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">Inapoi la magazin</p> </Link>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <img
                  className="h-16 w-auto"
                  src="../../logo.svg"
                  alt=""
                />
              </div>
              <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                {navigation.map((item) => (
                  
                      <NavLink
                      to={item.href}
                      key={item.id}
                      
                      className={classNames(
                        item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                      )}
                      >


                    <item.icon
                      className={classNames(
                        item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                    {item.name === "Comenzi" && uorder > 0 ? 
                    <>
                    <div className='absolute ml-[14px] mb-5 h-3 w-3 bg-red-600 rounded-full animate-ping'></div>
                    <div className='absolute ml-[14px] mb-5 h-3 w-3 bg-red-600 rounded-full opacity-60'></div>

                    </>
                    : ""}
                  
                  </NavLink>
                ))}
              </nav>
              <p className='px-6 opacity-50 text-sm font-medium'>Electrikfum ver. 1.2.10.4.23</p>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <a href="#" className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div>
  
                  </div>
                  <div className="ml-3">
                  <Link to="/"> <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{test.firstName} {test.lastName}</p> </Link>
                    <Link to="/"> <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">Inapoi la magazin</p> </Link>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Panou de control</h1>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <main>
                    {children}
                </main>
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
        </div>
    )
}

export default DashboardSidebar;