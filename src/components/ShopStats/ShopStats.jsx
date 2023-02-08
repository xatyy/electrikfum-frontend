/* This example requires Tailwind CSS v2.0+ */
import { makeRequrest } from '../../makeRequest'
import { useState } from 'react'
import { useEffect } from 'react'
import { makeRequrestAsUser } from '../../makeRequestAsUser'


  export default function Example() {
    const [order, setOrder] = useState(0)
    const [user, setUser] = useState(0)
    const [product, setProduct]= useState(0)
    const [uorder, setUorder]= useState(0)
  
    async function fetchStats(){
      let orderCount = await makeRequrestAsUser.get('/orders/count',{})

      let orderCountNew = await  makeRequrestAsUser.get('/orders/countUnhandled',{})

     
      let userCount = await makeRequrestAsUser.get('/users/count')
   
      let productCount = await makeRequrestAsUser.get('/products/count')
   
      setOrder(orderCount.data);
      setUser(userCount.data)
      setProduct(productCount.data)
      setUorder(orderCountNew.data)
    }
  
    fetchStats();


    useEffect(() => {

        const interval = setInterval(() => 

        fetchStats(),
      
          5000);

        return () => {
          clearInterval(interval);
        };
    }, [])
    
    return (
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">Performanta Magazin</h3>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div key="1" className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Comenzi</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{order}</dd>
            </div>
            <div key="2" className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Utilizatori</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{user}</dd>
            </div>
            <div key="3" className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Produse</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{product}</dd>
            </div>
            <div key="4" className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6 ">
              <dt className="text-sm font-medium text-gray-500 truncate">Comenzi nelivrate</dt>
              <dd className={uorder ? 'absolute ml-5 mt-2 h-3 w-3 bg-red-600 rounded-full animate-ping' : ''}/>
              <dd className={uorder ? 'absolute ml-5 mt-2 h-3 w-3 bg-red-600 rounded-full opacity-60' : ''}/>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{uorder}</dd>
              
            </div>
        </dl>
      </div>
    )
  }
  