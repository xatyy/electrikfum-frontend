import { Fragment, useState } from 'react'
import { ShoppingBagIcon, XMarkIcon  } from '@heroicons/react/24/outline'
import { Popover, Dialog, Transition } from '@headlessui/react'
import {useSelector} from "react-redux"
import {resetCart} from "../../redux/cartReducer"
import {useDispatch} from "react-redux"

export default function ShoppingCart() {

    const products = useSelector(state=>state.cart.products)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)

    const totalPrice = () => {
        let total = 0
        products.forEach((item) => {
            total += item.quantity * item.price;
        });
        return total.toFixed(2);
    }

    
    const totalQuantity = () => {
        let total = 0
        products.forEach((item) => {
            total += item.quantity
        })
        return total;
    }

return(
    <>
    <Popover className="ml-4 hidden lg:flex text-sm lg:relative  lg:ml-8 z-50">
    <Popover.Button className="group -m-2 p-2 flex items-center">
      <ShoppingBagIcon
        className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
        aria-hidden="true"
      />
      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{totalQuantity() >= 500 ? "?!?!?!" : totalQuantity()}</span>
      <span className="sr-only">items in cart, view bag</span>
    </Popover.Button>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Popover.Panel className="absolute top-16 inset-x-0 mt-px pb-6 bg-white shadow-lg sm:px-2 lg:top-full lg:left-auto lg:right-0 lg:mt-3 lg:-mr-1.5 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5">
        <h2 className="sr-only">Shopping Cart</h2>

        <form className="max-w-2xl mx-auto px-4">
          <ul role="list" className="divide-y divide-gray-200">
            {products?.map((product) => (
              <li key={product.id} className="py-6 flex items-center">
                <img
                  src={process.env.REACT_APP_UPLOAD_URL + product.img}
                  className="flex-none w-auto h-16 rounded-md border border-gray-200"
                />
                <div className="ml-4 flex-auto">
                  <h3 className="font-medium text-gray-900">
                    <a href={product.href}>{product.quantity} x {product.title}</a>
                  </h3>
                  <p className={"text-gray-500"}>{product.price} RON</p>
                </div>
              </li>
            ))}
          </ul>
            
          <p className={totalQuantity() > 0 ? "text-gray-500 py-2" : "hidden"}> Pret total: {totalPrice()} RON</p>
          <a
            href="../../checkout"
            className={totalQuantity() > 0 ? "w-full bg-indigo-600 border border-transparent rounded-md shadow-sm mt-4 py-2 px-24 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500" : "hidden"}
          >
            Checkout
          </a>

          <p className={totalQuantity() > 0 ?"mt-6 text-center":"hidden"}>
            <span onClick={() => dispatch(resetCart())}
            
            className="text-sm font-medium text-red-600 hover:text-red-500">
              Goleste cosul
            </span>
          </p>

          <p className={totalQuantity() > 0 ? "hidden":"mt-6 text-center"}>
            <span
            className="text-sm font-medium text-gray-600 ">
              Cosul tau este gol! 
            </span>
          </p>
        </form>
      </Popover.Panel>
    </Transition>
  </Popover>

<div className="lg:hidden z-50 flex">
  <ShoppingBagIcon
        className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
        aria-hidden="true" onClick={() => {setOpen(true)}}
      />
      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{totalQuantity() >= 200 ? "?!?!?!" : totalQuantity()}</span>
      <span className="sr-only">items in cart, view bag</span>
      </div>
<Transition.Root show={open} as={Fragment}>
<Dialog as="div" className="relative z-50" onClose={setOpen}>
  <Transition.Child
    as={Fragment}
    enter="ease-in-out duration-500"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="ease-in-out duration-500"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
  </Transition.Child>

  <div className="fixed inset-0 overflow-hidden">
    <div className="absolute inset-0 overflow-hidden">
      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-in-out duration-500 sm:duration-700"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-500 sm:duration-700"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
              <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                  <div className="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {products?.map((product) => (
                        <li key={product.id} className="flex py-6">
                          <div className="h-24 w-auto flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={process.env.REACT_APP_UPLOAD_URL + product.img}
                              alt={product.imageAlt}
                              className="h-full w-auto items-center mx-auto"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href={product.href}>{product.title}</a>
                                </h3>
                                <p className="ml-4">{product.price}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p className="text-gray-500">Qty {product.quantity}</p>

                              <div className="flex">
                                <button
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Sterge
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>{totalPrice()} RON</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">Transportul si taxele vor fii calculate la checkout.</p>
                <div className="mt-6">
                  <a
                    href="../../checkout"
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Checkout
                  </a>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => setOpen(false)}
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  </div>
</Dialog>
</Transition.Root>
</>
)}