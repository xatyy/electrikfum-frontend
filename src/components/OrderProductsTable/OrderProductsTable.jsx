import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { UserIcon } from '@heroicons/react/24/solid'

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);

    const sortedItems = useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a,b) => {
            if(a[sortConfig.key] < b[sortConfig.key]){
                return sortConfig.direction === 'ascending' ? -1: 1;
            }
            if(a[sortConfig.key] > b[sortConfig.key]){
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            return 0;
        });
        }
        return sortableItems;
    }, [items, sortConfig]);

const requestSort = (key) => {
    let direction = 'ascending';
    if(sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === 'ascending'){
            direction = 'descending';
        }
        setSortConfig({key, direction});
};
    return {items: sortedItems, requestSort, sortConfig};
}

const ProductsTable = (props) => {
    const {items, requestSort, sortConfig} = useSortableData(props.products)
    const getClassNamesFor = (name) => {
        if(!sortConfig){
        return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    return(
        <div className="productsTable">
             <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <p className="mt-2 text-sm text-gray-700">
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        </div>
      </div>
      <div className="mt-1 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-1">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    onClick={() => requestSort('title')}
                    >
                    Produs
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    onClick={() => requestSort('stock')}
                    >
                      Cantitate
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    onClick={() => requestSort('price')}
                    >
                      Pret
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    onClick={() => requestSort('price')}
                    >
                      Pret total per produs
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Vizualizeaza</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {items?.map((item) => (
                    <tr key={item.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{item.title}</div>
                            <div className="font-medium text-xs text-gray-500">Cod Produs: {item.productId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="text-gray-900">{item.quantity}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span 
                        className={classNames(
                             "inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800")}>
                          {item.price} RON
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.price * item.quantity} RON</td>
                    </tr>
                  ))}
                  <tr key={"0000"}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">Livrare</div>
                            <div className="font-medium text-xs text-gray-500"></div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="text-gray-900"></div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span 
                        className={classNames(
                             "inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800")}>
                          {props.deliver} RON
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"></td>
                    
                  </tr>
                  <tr className={props.discount ? "flex-row" : "hidden"} key={"0001"}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">Discount</div>
                            <div className="font-medium text-xs text-gray-500"></div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="text-gray-900"></div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span 
                        className={classNames(
                             "inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800")}>
                          - {props.discount} RON
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"></td>
                    
                  </tr>
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

export default ProductsTable;