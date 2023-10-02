import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { makeRequrest } from '../../makeRequest';
import useFetch from '../../hooks/useFetch';
import {useSelector} from "react-redux"
import {resetCart} from "../../redux/cartReducer"
import {useDispatch} from "react-redux"

  
const CheckoutSuccess = () => {
    const dispatch = useDispatch()
    
    const [orderData, setOrderData] = useState({});

            const [query] = new URLSearchParams(window.location.search);
            const orderId = query[1];
        
           
        
            

            useEffect(()=>{
                async function handleOrder(){
                    try{
        
                        const res = await makeRequrest.get("/orders/findOrder?id=" + orderId,{
                        })

                        setOrderData(res.data[0]);
        
                    }catch(err){
                        console.log(err);
                    }
                }
                handleOrder()
              
            }, [])
    

            
            let products = orderData.products;

            const totalPrice = () => {
                let total = 0
                orderData?.products?.forEach((item) => {
                    total += item.quantity * item.price;
                });
                return (total);
            }

            products = "";

            let d = new Date(orderData.createdAt)
            let dd = new Date();

            if(d.getUTCDate() === dd.getUTCDate() && d.getUTCHours ===  dd.getUTCHours && orderData?.orderStatus !== "rejected"){
                dispatch(resetCart());
            }

            if(orderData?.orderStatus !== "rejected"){
    return(

        <div className="checkoutsuccess">
            <div className="bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-sm font-semibold uppercase tracking-wide text-indigo-600">COMANDĂ {orderData?.orderStatus == "placed" ? "Plasată" :""}
          {orderData?.orderStatus == "confirmed" ? "Confirmată" :""}
          {orderData?.orderStatus == "delivered" ? "Livrată" :""}
          {orderData?.orderStatus == "cancelled" ? "Anulată" :""}
          </h1>
          <p className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {orderData?.orderStatus == "pending" ? "Comanda ta este in așteptare" : "Comanda ta a fost" } {orderData?.orderStatus == "placed" ? "Plasată" :""}      {orderData?.orderStatus == "confirmed" ? "Confirmată" :""}
          {orderData?.orderStatus == "delivered" ? "Livrată" :""}
          {orderData?.orderStatus == "cancelled" ? "Anulată" :""}!</p>
          
          <p className="mt-2 text-base text-gray-500">{orderData?.orderStatus == "pending" ? `Comanda #${orderData.orderIdentifier} este în așteptare, veți primi un mail cu actualizarea comenzii.` : `Comanda #${orderData.orderIdentifier} a fost preluata si in curand va fii livrata la adresa ta!`}</p>

          <dl className="mt-12 text-sm font-medium"> 
            <dt className="text-gray-900"></dt>
            <dd className="text-indigo-600 mt-2"></dd>
          </dl>
        </div>

        <div className="mt-10 border-t border-gray-200">
          <h2 className="sr-only">Comanda ta</h2>

          <h3 className="sr-only">Produse</h3>
          {orderData?.products?.map((product) => (
            <div key={product.id} className="py-10 border-b border-gray-200 flex space-x-6">
              <img
                src={process.env.REACT_APP_UPLOAD_URL + product.img}
                className="flex-none w-auto h-20 object-center object-scale-down bg-gray-100 rounded-lg sm:w-40 sm:h-40"
              />
              <div className="flex-auto flex flex-col">
                <div>
                  <h4 className="font-medium text-gray-900">
                    <a href={product.href}>{product.title}</a>
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">{product.description}</p>
                </div>
                <div className="mt-6 flex-1 flex items-end">
                  <dl className="flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6">
                    <div className="flex">
                      <dt className="font-medium text-gray-900">Cantitate</dt>
                      <dd className="ml-2 text-gray-700">{product.quantity}</dd>
                    </div>
                    <div className="pl-4 flex sm:pl-6">
                      <dt className="font-medium text-gray-900">Pret</dt>
                      <dd className="ml-2 text-gray-700">{product?.price?.toFixed(2)}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          ))}

          <div className="sm:ml-40 sm:pl-6">
            <h3 className="sr-only">Informatiile tale</h3>

            <h4 className="sr-only">Adrese</h4>
            <dl className="grid grid-cols-2 gap-x-6 text-sm py-10">
              <div>
                <dt className="font-medium text-gray-900">Adresa Livrare</dt>
                <dd className="mt-2 text-gray-700">
                  <address className="not-italic">
                    <span className="block">{orderData?.street},</span>
                    <span className="block">{orderData?.city},</span>
                    <span className="block">{orderData?.county},</span>
                    <span className="block">{orderData?.postalCode},</span>
                  </address>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Detalii Contact</dt>
                <dd className="mt-2 text-gray-700">
                  <address className="not-italic">
                    <span className="block">{orderData.email}</span>
                    <span className="block">{orderData.phone}</span>
                  </address>
                </dd>
              </div>
            </dl>

            <h4 className="sr-only">Metoda de plata</h4>
            <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 text-sm py-10">
              <div>
                <dt className="font-medium text-gray-900">Metoda de plata</dt>
                <dd className="mt-2 text-gray-700">
                  <p>{orderData.orderType === "online" ? "Plata online cu cardul" : "Plata la livrare"}</p>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">AWB</dt>
                <dd className="mt-2 text-gray-700">
                  <p>{orderData?.trackingNumber}</p>
                </dd>
              </div>
            </dl>

            <h3 className="sr-only">Summary</h3>
           
            <dl className="space-y-6 border-t border-gray-200 text-sm pt-10">
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Subtotal</dt>
                <dd className="text-gray-700">{totalPrice().toFixed(2)} RON</dd>
              </div>
              <div className="flex justify-between">
                {/*<dt className="flex font-medium text-gray-900">
                  Discount
                  <span className="rounded-full bg-gray-200 text-xs text-gray-600 py-0.5 px-2 ml-2"></span>
                </dt>
                <dd className="text-gray-700">-0 RO</dd>*/}
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Livrare</dt>
                <dd className="text-gray-700">{orderData?.finalPrice < 250 ? "19.00 RON" : "0.00 RON"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Total</dt>
                <dd className="text-gray-900">{orderData?.finalPrice?.toFixed(2)} RON</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
        </div>
    )
    }else{
      return(
        <div className="checkoutsuccess">
      <div className="bg-white">
<div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
  <div className="max-w-xl">
    <h1 className="text-sm font-semibold uppercase tracking-wide text-indigo-600">COMANDĂ RESPINSĂ
    {orderData?.orderStatus == "confirmed" ? "Confirmată" :""}
    {orderData?.orderStatus == "delivered" ? "Livrată" :""}
    {orderData?.orderStatus == "cancelled" ? "Anulată" :""}
    </h1>
    <p className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">Comanda ta nu s-a realizat cu succes.</p>
    <p className="mt-2 text-base text-gray-500">Comanda #{orderData.orderIdentifier} a fost respinsă pe motiv de nereușirea plații online.</p>
    <p className="mt-2 text-base text-gray-500">Poți reîncerca realizarea comenzii.</p>
    <dl className="mt-12 text-sm font-medium"> 
      <dt className="text-gray-900"></dt>
      <dd className="text-indigo-600 mt-2"></dd>
    </dl>
  </div>


</div>
</div>
  </div>
      )
      
    }
}

export default CheckoutSuccess;