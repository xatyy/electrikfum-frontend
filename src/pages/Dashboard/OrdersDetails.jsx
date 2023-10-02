import {React, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon, DocumentArrowDownIcon, ArrowLongRightIcon, TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import * as Yup from 'yup'
import Notification from '../../components/Notification/Notification'
import OrderProductsTable from '../../components/OrderProductsTable/OrderProductsTable'
import Prompt from '../../components/Prompt/Prompt'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { makeRequrest } from '../../makeRequest'
import { useParams } from 'react-router-dom'
import ReactPDF, { PDFDownloadLink } from '@react-pdf/renderer'
import PDF from '../PDF'
import { makeRequrestAsUser } from '../../makeRequestAsUser'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  

const OrdersDetails = () => {

    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('');

    const [trackingNumber, setTrackingNumber] = useState('')
    const [orderData, setOrderData] = useState({});
    const [view, setView] = useState(false);

    const id = useParams().id;

    function timeout(delay){
        return new Promise(res => setTimeout(res, delay));
    }
    const handleChange = ({currentTarget}) => {
      setTrackingNumber(currentTarget.value)
  }
    
    async function createNotification(message){
        setShow(true)
        setMessage(message)
        await timeout(4000);
        setShow(false)
    }

    async function confirmOrder(){
      console.log(orderData.email);
       await makeRequrest.put("/orders/update",{
        
           "id": orderData.id,
           "data":{
               "orderStatus" : "confirmed",
               "orderIdentifier" : orderData.orderIdentifier,
               "email" : orderData.email,
           }
       }).then(response =>{
        createNotification(`Comanda a fost confirmata!`)
        window.location.reload(false)
       })
      }
       
    async function cancelOrder(){
      await makeRequrest.put("/orders/update",{
          "id": orderData.id,
          "data":{
              "orderStatus" : "cancelled",
              "orderIdentifier" : orderData.orderIdentifier,
              "email" : orderData.email,
          }
      }).then(response =>{
       createNotification(`Comanda a fost anulată!`)
       window.location.reload(false)
      })
    }
    async function deliverOrder(){
        await makeRequrestAsUser.put("/orders/update",{
            "id": orderData.id,
            "data":{
                "orderStatus" : "delivered",
                "trackingNumber" : trackingNumber,
                "orderIdentifier" : orderData.orderIdentifier,
                "email" : orderData.email,
            }
        }).then(response =>{
         createNotification(`Comanda a fost livrata!`)
         window.location.reload(false)
        })
        
     }
 

    

    useEffect(()=>{
        async function handleOrder(){
            try{

                const res = await makeRequrest.get("/orders/findOrder?id=" + id,{
                })

                setOrderData(res.data[0]);
                setView(true);

            }catch(err){
                console.log(err);
            }
        }
        handleOrder()
      
    }, [])


    return(
       <div className="orderDetails">
           <div className="flex justify-start py-4">
                  <Link to="../">
        <button
          type="button"
          className="bg-white py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <ChevronLeftIcon className="opacity-70" /> Inapoi
        </button>
        </Link>
      </div>
             <div className="space-y-6">
                 <h3 className="text-lg font-medium leading-6 text-gray-900"> Comanda #{orderData?.orderIdentifier} </h3>
      <div className="bg-white space-y-6 shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900"> Detalii Client</h3>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
           <form method="" className="space-y-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    Prenume 
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    defaultValue={orderData?.customerFirstName}
                    disabled={true}
                    id="first-name"
                    autoComplete="given-name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Nume 
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    defaultValue={orderData?.customerLastName}
                    disabled={true}
                    id="last-name"
                    autoComplete="family-name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                    Email 
                  </label>
                  <input
                    type="text"
                    name="email-address"
                    defaultValue={orderData?.email}
                    disabled={true}
                    id="email-address"
                    autoComplete="email"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>


                <div className="col-span-6 sm:col-span-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Nr. Telefon
                  </label>
                  <input
                    type="text"
                    name="phone"
                    defaultValue={orderData?.phone}
                    disabled={true}
                    id="phone"
                    autoComplete="phone"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                

                <div className="col-span-6">
                  <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                    Strada
                  </label>
                  <input
                    type="text"
                    name="street-address"
                    defaultValue={orderData?.street}
                    disabled={true}
                    id="street-address"
                    autoComplete="street-address"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    Localitate
                  </label>
                  <input
                    type="text"
                    name="city"
                    defaultValue={orderData?.city}
                    disabled={true}
                    id="city"
                    autoComplete="address-level2"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:opacity-70 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                    Judet
                  </label>
                  <input
                    type="text"
                    name="region"
                    defaultValue={orderData?.county}
                    disabled={true}
                    id="region"
                    autoComplete="address-level1"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                    Cod postal
                  </label>
                  <input
                    type="text"
                    name="postal-code"
                    defaultValue={orderData?.postalCode}
                    disabled={true}
                    id="postal-code"
                    autoComplete="postal-code"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900"> Produse comandate </h3>
          </div>
         {view ? 
        <OrderProductsTable products = {orderData?.products} discount = {orderData?.usedVoucher} deliver = {19} total={orderData?.totalPrice}
        />
        : <p> LOADING </p>}
        TOTAL {orderData?.finalPrice?.toFixed(2)} RON
     

<div className="md:col-span-1 space-y-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 "> Detalii comanda </h3>

            <nav className="flex items-center justify-center" aria-label="Progress">
      <p className="text-sm font-medium">
         {orderData?.orderStatus === "placed" ? "Comanda plasata" : ""}
         {orderData?.orderStatus === "pending" ? "Comanda a fost plasată dar nu a trecut prin procesul de plată online." : ""}
         {orderData?.orderStatus === "rejected" ? "Metoda plata respinsa." : ""}
         {orderData?.orderStatus === "cancelled" ? "Comanda Anulata" : ""}
         {orderData?.orderStatus === "confirmed" ? "Comanda confirmata" : ""}
         {orderData?.orderStatus === "delivered" ? `Comanda livrata AWB: ${orderData?.trackingNumber}` : ""}{","}
         {orderData?.orderType === "online" && orderData?.orderStatus != "cancelled" && orderData?.orderStatus != "pending" && orderData?.orderStatus != "rejected" ? "Platita online cu cardul" : ""}
         {orderData?.orderType === "delivery" && orderData?.orderStatus != "cancelled" && orderData?.orderStatus != "pending" && orderData?.orderStatus != "rejected" ? "Plata se va face la livrare" : ""}

     
      </p>
      
      
    </nav>
   <p className="text-sm flex justify-end font-medium opacity-70 italic"> Ultima actualizare: {orderData?.updatedAt}</p>
    </div>
    <div className={orderData?.orderStatus === "confirmed" ? "flex justify-start" : "hidden"}>
    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                    AWB
                  </label>
                  <input
                    type="text"
                    name="tracking"
                    onChange={handleChange}
                    id="tracking"
                    autoComplete="tracking"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
        <button
         onClick={() => deliverOrder()}
          type="submit"
          className="ml-3 flex flex-col justify-center items-center  py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
            <ArrowLongRightIcon className='h-10'/>
          Trimite Comanda
        </button>
        
    </div>
    <div className={orderData?.orderStatus === "placed" ? "flex justify-start" : "hidden"}>
    <button
          type="submit"
          onClick={() => cancelOrder()}
          className="ml-0 flex flex-col justify-center items-center  py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <XMarkIcon className='h-10'/>
         
          Anuleaza comanda
        </button>
        <button
          onClick={() => confirmOrder()}
          className="ml-3 flex flex-col justify-center items-center  py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
            <CheckIcon className='h-10'/>
          Confirma comanda
        </button>
    </div>
      </div>
      
       </div>
       <Notification show={show} message={message} 
    onClose={() => setShow(false)}
    />
       </div>
    )
}

export default OrdersDetails;