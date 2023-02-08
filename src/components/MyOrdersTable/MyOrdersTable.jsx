import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserIcon } from '@heroicons/react/24/solid'
import { makeRequrest } from '../../makeRequest'
import jwtDecode from 'jwt-decode'
import { makeRequrestAsUser } from '../../makeRequestAsUser'
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


  export default function OrdersTable() {

    let orderData = {};
    let count = 0;

    const token = window.localStorage.getItem("auth")
    const {id} = jwtDecode(token)

    const [items, setItems] = useState();
  
    useEffect(() => {
        const order = async () => {
            orderData = await  makeRequrestAsUser.get(`/orders/fetchMy?id=${id}`)
           setItems(orderData.data);
        }
      order()
    }, [])


   
  
    
    return(
        <div className="ordersTable">
             <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Comenzile mele</h1>
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
                          </div>
                          
                        </div>
                        
                      </td>
                      
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span 
                        className={classNames(
                          item?.orderStatus == "confirmed" ? "inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
                          : "",
                          item?.orderStatus == "placed" ? "inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800"
                          : "",
                          item?.orderStatus == "cancelled" ? "inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800"
                          : "",
                          item?.orderStatus == "delivered" ? "inline-flex rounded-sm bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800"
                          : "")}>
                          {item?.orderStatus == "placed" ? "Comandă Plasată" : ""}
                          {item?.orderStatus == "cancelled" ? "Comandă Anulată" : ""}
                          {item?.orderStatus == "confirmed" ? "Comandă Confirmată" : ""}
                          {item?.orderStatus == "delivered" ? "LIVRAT" : ""}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item?.finalPrice.toFixed(2)} RON</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link to={"../../order/?orderId=" + item?.orderIdentifier} className="text-indigo-600 hover:text-indigo-900">
                          Vizualizeaza<span className="sr-only">,  comanda </span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
        </div>
    )
}
