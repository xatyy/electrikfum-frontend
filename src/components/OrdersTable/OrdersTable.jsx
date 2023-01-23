import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserIcon } from '@heroicons/react/24/solid'
import { makeRequrest } from '../../makeRequest'
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


  export default function OrdersTable() {

    let orderData = {};
    let count = 0;

    const [items, setItems] = useState();
    const [offset, setOffset] = useState(0)
    const [orderCount, setOrderCount] = useState(0)
  
    useEffect(() => {
        const order = async () => {
            orderData = await  makeRequrest.get(`/orders/fetch?offset=${offset}`)
            count = await  makeRequrest.get(`/orders/count`)
           setItems(orderData.data);
           setOrderCount(count.data)
        }
      order()
    }, [offset])


   
    console.log(offset)
    
    return(
        <div className="ordersTable">
             <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Orders</h1>
          <p className="mt-2 text-sm text-gray-700">
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                   
                    >
                      Nr. Comanda
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                
                    >
                      Client
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                   
                    >
                      Status Comanda
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    
                    >
                      Valoare
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Vizualizeaza</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {items?.map((item) => (
                    <tr key={item?.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{item?.orderIdentifier}</div>
                            <div className="font-medium text-xs text-gray-500">Nr. {item?.id}</div>
                          </div>
                          
                        </div>
                        
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="text-gray-900">{item?.customerFirstName} {item?.customerLastName}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span 
                        className={classNames(
                             item?.orderStatus == "confirmed" ? "inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"

                        : "inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800")}>
                          {item?.orderStatus}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item?.value} RON</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link to={"../../orders/" + item?.orderIdentifier} className="text-indigo-600 hover:text-indigo-900">
                          Vizualizeaza<span className="sr-only">,  comanda </span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
    
                <tfoot className="bg-white px-4 py-3 flex-wrap-reverse items-center border-t  border-gray-200 sm:px-6">
        <tr>
            <td> <div className="hidden justify-end py-3  sm:block">
        <p className="text-sm px-2 text-gray-700">
          Se arata de la <span className="font-medium">{offset + 1 }</span> pana la <span className="font-medium">{offset + 10 < orderCount ? offset + 10 : orderCount}</span> din{' '}
          <span className="font-medium">{orderCount}</span> rezultate
        </p>
      </div></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
               
      <div className="flex-1 flex justify-end sm:justify-end">
        <button
          onClick={() =>{ 
            if(offset > 0)
            setOffset(offset-10)}}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Inapoi
        </button>
        <button
            onClick={() =>{ 
                if(offset < Math.floor(orderCount / 10)*10)
                setOffset(offset+10)}}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Urmator
        </button>
      </div>
      </td>
      </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
        </div>
    )
}
