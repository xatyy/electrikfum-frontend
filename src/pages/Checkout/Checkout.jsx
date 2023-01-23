import React, {useState} from 'react'
import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/24/outline'
import LogoWhite from '../../components/Logos/LogoWhite'
import {useSelector} from "react-redux"
import { removeItem } from "../../redux/cartReducer"
import {useDispatch} from "react-redux"
import { makeRequrest } from '../../makeRequest'
import requestProduct from "../../hooks/useFetch"
import {Navigate} from "react-router-dom"
import authCheck from '../../services/authCheck'


const Checkout = (props) => {

    const products = useSelector(state=>state.cart.products)
    const transport = 10
    const discount = 0
    const dispatch = useDispatch()
    let stock = [];
    let stockBlock = 0;


    const [url, setUrl] = useState("")
    const [data, setData] = useState("")
    const [env_key, setEnvKey] = useState("")
    const [request, setRequest] = useState("")

    const[email, setEmail] = useState("")
    const[customerFirstName, setCustomerFirstName] = useState("")
    const[customerLastName, setCustomerLastName] = useState("")
    const[street, setStreet] = useState("")
    const[city, setCity] = useState("")
    const[county, setCounty] = useState("")
    const[phone, setPhone] = useState("")
    const[postalCode, setPostalCode] = useState("")
    const[orderType, setOrderType] = useState("")
    

    function timeout(delay){
        return new Promise(res => setTimeout(res, delay));
    }

    const totalPrice = () => {
        let total = 0
        products.forEach((item) => {
            if(stock[item.id] > 0){
            total += item.quantity * item.price;
            }
            console.log(total)
        });
        return (total);
    }


    console.log(products)

     function checkStock(id){
        const {data, loading, error} = requestProduct(`/products/${id}?populate=*`)

        products.forEach((item)=>{
            if(data?.attributes.stock < item.quantity && data?.id === item.id){
                stockBlock = 1;
            }
        })

        console.log(stockBlock)
        
        return data?.attributes.stock

    }

    function travel(){
        window.location.replace('../')
    }

    function test(){
        products.forEach((item)=>(
            stock[item.id] = checkStock(item.id)
           ))
    }

    const finalPrice = () => {
        let total = totalPrice()

        total = total +transport-discount

        return total;
    }

    const totalQuantity = () => {
        let total = 0
        products.forEach((item) => {
            total += item.quantity
        })
        return total;
    }

    function setParams(e){
        console.log(e.data.url);
        setUrl(e.data.url);
        setData(e.data.data);
        setEnvKey(e.data.env_key);
       setRequest("POST");
    }

    const handlePayment = async () => {
        if(stockBlock){
            return;
        }
        try{

            if(orderType == "online"){
            const res = await makeRequrest.post("/orders",{
                email,
            customerFirstName,
            customerLastName,
            products,
            street,
            city,
            county,
            phone,
            postalCode,
            orderType,
            finalPrice: finalPrice(),
            })

            setParams(res);

            await timeout(1000);

            document.formProduct.submit();
        }else{
            const res = await makeRequrest.post("/orders/delivery",{
                email,
            customerFirstName,
            customerLastName,
            products,
            street,
            city,
            county,
            phone,
            postalCode,
            orderType,
            finalPrice: finalPrice()
            })

            console.log(res)
            let orderId = res.data

            window.location.href = `order?orderId=${orderId}`;
           
        }
           

        }catch(err){
            console.log(err);
        }
    }

    let price = 0;

    if(products[0]){
    return(
        <div className="checkout">
            { test()}

            <div className="bg-white">
      {/* Background color split screen for large screens */}
      <div className="hidden lg:block fixed top-0 left-0 w-1/2 h-full bg-white" aria-hidden="true" />
      <div className="hidden lg:block fixed top-0 right-0 w-1/2 h-full bg-indigo-900" aria-hidden="true" />

      <div className="relative grid grid-cols-1 gap-x-16 max-w-7xl mx-auto lg:px-8 lg:grid-cols-2 lg:pt-16">
        <h1 className="sr-only">Checkout</h1>
        

        <section
          aria-labelledby="summary-heading"
          className="bg-indigo-900 text-indigo-300 py-12 md:px-10 lg:max-w-lg lg:w-full lg:mx-auto lg:px-0 lg:pt-0 lg:pb-24 lg:bg-transparent lg:row-start-1 lg:col-start-2"
        >
          <div className="sticky top-0 max-w-2xl mx-auto px-4  lg:max-w-none lg:px-0">
            <h2 id="summary-heading" className="sr-only">
              Sumar comanda 
            </h2>

            <dl className="space-y-6">
                <div className="flex items-center font-satoshi">
                <div className="w-10">
                <LogoWhite />
                </div>
                ElectrikFum
                </div>
            <dt onClick={() => travel()} className="text-xs px-2 bg-indigo-300 text-indigo-900 rounded-xl w-[160px] flex font-medium lg:hidden space-y py-4"> <ArrowLeftIcon className="w-4" />Inapoi la cumparaturi</dt>
              <dt className="text-sm font-medium"> Total plata</dt>
              <dd className="mt-1 text-3xl font-extrabold text-white">{finalPrice().toFixed(2)} RON</dd>
            </dl>

            <ul role="list" className="text-sm font-medium divide-y divide-white divide-opacity-10">
              {
              products.map((product) => (
                  <>
                <li key={product.id}
                className="flex items-start py-6 space-x-4">
                    <div className="mt-12">
                    <TrashIcon onClick={() => {dispatch(removeItem(product.id))
                    window.location.reload()
                    }} className={stock[product.id] < product.quantity ? "w-5 cursor-pointer h-auto align-middle" : "hidden"} />
                    </div>
                  <div className={stock[product.id] < product.quantity ? "flex items-start py-6 space-x-4 px-2 opacity-70  transition-all ease-linear grayscale hover:grayscale-0 duration-75 border-red-400 w-full bg-indigo-900 rounded-xl border-2 border-spacing-x-10" : "flex w-full items-start py-6 space-x-4 "}> 
                  <img
                    src={process.env.REACT_APP_UPLOAD_URL + product.img}
                    className="flex-none w-auto h-20 rounded-md object-center object-cover"
                  />
                  <div className="flex-auto space-y-1">
                    <h3 className="text-white">{product.quantity} x {product.title}</h3>
                    <p>Pret per bucata {(product.price).toFixed(2)} RON</p>
                    {stock[product.id] < product.quantity ? "Acest produs nu mai este in disponibil!":""}
                  </div>
               
                  <p className="flex-none text-base font-medium text-white">{(product.quantity * product.price).toFixed(2)} RON</p>
                  </div>
                  
                </li>
             {stock[product.id] < product.quantity ? "Te rugam sa stergi produsul pentru a putea plasa comanda" : ""}
                </>
              ))
              }

            </ul>

            <dl className="text-sm font-medium space-y-6 border-t border-white border-opacity-10 pt-6">
              <div className="flex items-center justify-between">
                <dt>Subtotal</dt>
                <dd>{totalPrice().toFixed(2)} RON</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt>Transport</dt>
                <dd>{transport.toFixed(2)} RON</dd>
              </div>

              <div className={discount ? "flex items-center justify-between" : "hidden"}>
                <dt>Discount</dt>
                <dd>-{discount.toFixed(2)}RON</dd>
              </div>

              <div className="flex items-center justify-between border-t border-white border-opacity-10 text-white pt-6">
                <dt className="text-base">Total</dt>
                <dd className="text-base">{finalPrice().toFixed(2)}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section
          aria-labelledby="payment-and-shipping-heading"
          className="py-16 lg:max-w-lg lg:w-full lg:mx-auto lg:pt-0 lg:pb-24 lg:row-start-1 lg:col-start-1"
        >
          <h2 id="payment-and-shipping-heading" className="sr-only">
            Detalii plata si livrare
          </h2>

          <form method={request} name="formProduct" action={url}>
            <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
              <div>
              <dt onClick={() => travel()} className="text-sm cursor-pointer   text-indigo-900  rounded-xl w-[160px] hidden font-medium lg:flex space-y py-4"> <ArrowLeftIcon className="w-4" />Inapoi la cumparaturi</dt>
                <h3 id="contact-info-heading" className="text-lg font-medium text-gray-900">
                  Informatii contact
                </h3>

                <div className="mt-6">
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email-address"
                      name="email"
                      onChange={e => setEmail(e.target.value)}
                      autoComplete="email"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-900">Informatii personale</h3>

                <div className="mt-6 grid grid-cols-2 gap-y-6 gap-x-4 sm:grid-cols-3">
                <div className="col-span-2">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      Prenume
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="first-name"
                        onChange={e => setCustomerFirstName(e.target.value)}
                        name="customerFirstName"
                        autoComplete="first-name"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Nume
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="last-name"
                        onChange={e => setCustomerLastName(e.target.value)}
                        name="customerLastName"
                        autoComplete="family-name"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Nr. Telefon
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="phone"
                        onChange={e => setPhone(e.target.value)}
                        name="phone"
                        autoComplete="phone"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
        
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-900">Date livrare</h3>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                  <div className="sm:col-span-3">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Addresa
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="address"
                        onChange={e => setStreet(e.target.value)}
                        name="street"
                        autoComplete="street-address"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      Oras
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="city"
                        onChange={e => setCity(e.target.value)}
                        name="city"
                        autoComplete="address-level2"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                      Judet
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="region"
                        onChange={e => setCounty(e.target.value)}
                        name="county"
                        autoComplete="address-level1"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                      Cod Postal
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="postal-code"
                        onChange={e => setPostalCode(e.target.value)}
                        name="postalCode"
                        autoComplete="postal-code"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 ">
                <h3 className="text-lg font-medium text-gray-900">Metoda Plata</h3>
                <div className="justify-start space-x-10 inline-flex">
                <div className="mt-6 flex items-center">
                  <input
                    id="same-as-shipping"
                    name="orderType"
                    type="radio"
                    onChange={e => setOrderType(e.target.value)}
                    value="online"
                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="ml-2">
                    <label htmlFor="same-as-shipping" className="text-sm font-medium text-gray-900">
                      Online cu cardul
                    </label>
                  </div>
                </div>
                <div className="mt-6 flex items-center">
                  <input
                    id="same-as-shipping"
                    name="orderType"
                    type="radio"
                    onChange={e => setOrderType(e.target.value)}
                    value="delivery"
                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="ml-2">
                    <label htmlFor="orderType" className="text-sm font-medium text-gray-900">
                      Plata la livrare
                    </label>
                  </div>
                </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-900">Ai un cod voucher?</h3>

                <div className="flex  gap-x-4 sm:grid-cols-3">
                  <div className="sm:col-span-3">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Cod voucher
                    </label>
                    <div className="mt-1 flex space-x-4">
                      <input
                        type="text"
                        id="voucher"
                        name="voucher"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <button
                  type="submit"

                  className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >
                  Aplica
                </button> 
                    </div>
                  </div>
                
                 
                   
                  
                </div>
              </div>

              <div className="mt-10 flex justify-end pt-6 border-t border-gray-200">
             
              </div>
            </div>
            <input type="hidden" id="data" name="data" value={data} />
              <input type="hidden" id="env_key" name="env_key" value={env_key} />
          </form>
          <button
                 onClick={() => {
                   

                        handlePayment()
             
                
                }}
                  className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >
                  Plaseaza comanda 
                </button>

         

          
        </section>
      </div>
    </div>
        </div>
    )}
    else{
        return(
            <Navigate to="/" />
        )
    }
}

export default Checkout;