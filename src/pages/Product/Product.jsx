import React from 'react'
import { useState } from 'react'
import { CheckBadgeIcon, CheckIcon, StarIcon, TruckIcon } from '@heroicons/react/24/solid'
import { CurrencyDollarIcon, GlobeAltIcon, FireIcon } from '@heroicons/react/24/outline'
import {FaRecycle} from 'react-icons/fa'
import useFetch from "../../hooks/useFetch"
import {useParams} from "react-router-dom"
import {useDispatch} from "react-redux"
import {addToCart} from "../../redux/cartReducer"
import ProductLoading from '../../components/ProductLoading/ProductLoading'
import Product404 from '../../components/Product404/Product404'
import Notification from '../../components/Notification/Notification'
import { useEffect } from 'react'

const product = {
    name: 'Elfbar 2% Țigară Electronică Apple Peach',
    price: '30.00',
    rating: 2.1,
    reviewCount: 512,
    stock: 11,
    href: 'https://google.com',
    hasNic: true,
    puffs: 600,
    breadcrumbs: [
      { id: 1, name: 'Tigari unica folosinta', href: '#' },
      { id: 2, name: 'ELF Bar 2%', href: '#' },
    ],
    images: [
      {
        id: 1,
        imageSrc: '../ELf3.png',
        imageAlt: "Elf Bar albastru",
        primary: true,
      }
    ],
    description: `
      <p>Elf Bar 600 – Dispozitivul de unică folosință Elf Bar 600 vine cu un design portabil și dimensiuni compacte. Dispozitivul Elf Bar 600 acceptă aproximativ 600 de pufuri, cu bateria mare încorporată de 550 mAh și lichid pre-umplut de 2 ml cu o concentrație de 2% nicotină (20mg), care aduce o aromă uluitoare.</p>
     `,
    brand: "Elf Bar",
  }
  const policies = [
    { name: '600 puffs', icon: FireIcon, description: 'Pana la 600 de utilizari!' },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


const Product = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  
  const id = useParams().id;
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const {data, loading, error} = useFetch(`/products/${id}?populate=*`)



  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('');
   function timeout(delay){
    return new Promise(res => setTimeout(res, delay));
}


   async function createNotification(message){
    setShow(true)
    setMessage(message)
    await timeout(2500);
    setShow(false)
   }

  console.log(data)

    return(
        <div className="product">
               
            <div className="bg-white">
      <div className="pt-6 pb-16 sm:pb-24 transition-all">
      {error ?  <Product404 /> : (loading ? <ProductLoading /> : 
      <>
        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol role="list" className="flex items-center space-x-4">
              <li key={data?.attributes.categories.data[0].id}>
                <div className="flex items-center">
                  <a href={`../products/${data?.attributes.categories.data[0].id}`} className="mr-4 text-sm font-medium text-gray-900">
                    {data?.attributes?.categories?.data[0].attributes?.title}
                  </a>
                  <svg
                    viewBox="0 0 6 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="h-5 w-auto text-gray-300"
                  >
                    <path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z" fill="currentColor" />
                  </svg>
                </div>
              </li>
              
            <li className="text-sm">
              <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {data?.attributes.title}
              </a>
            </li>
          </ol>
          
        </nav>
        <div className="mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
            <div className="lg:col-start-8 lg:col-span-5">
              <div className="flex flex-col space-y-2 justify-between">
                <h1 className="text-xl font-medium text-gray-500">{data?.attributes.title}</h1>
                <p className="text-2xl font-medium text-gray-900">{data?.attributes.price} RON </p>
              </div>
              {/* Reviews */}
             {/* <div className="mt-4">
                <h2 className="sr-only">Reviews</h2>
                <div className="flex items-center">
                  <p className="text-sm text-gray-700">
                    {product.rating}
                    <span className="sr-only"> out of 5 stars</span>
                  </p>
                  <div className="ml-1 flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
                    ·
                  </div>
                  <div className="ml-4 flex">
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      See all {product.reviewCount} reviews
                    </a>
                  </div>
                </div>
              </div> */}
            </div>

            {/* Image gallery */}
            <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-4 lg:space-y-3">
              <h2 className="sr-only">Images</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2">
               
                  <img
                    key={"4"}
                    src={process.env.REACT_APP_UPLOAD_URL + data?.attributes.img?.data[0].attributes?.url}
                    className={classNames(
                       'lg:col-span-1 items-center lg:ml-24 rounded-xl lg:row-span-1 w-full'
                    )}
                  />
    
              </div>

              <div className={classNames(
                   data?.attributes.hasNic ? "border-black border-[4px] rounded-xl max-w-sm lg:max-w-screen-2xl mx-auto w-full h-auto text-2xl flex justify-center font-arimo text-center" : "hidden"
                   )}>
                       <p className="lg:w-1/2 w-3/4 mx-auto">
                    Acest produs conține nicotină.
                    Nicotina generează un grad ridicat de dependență.
                    </p>
                </div>

             
               
              
              
            </div>
         
            <div className="mt-8 space-y-6 lg:col-span-5">
              
                

                {/* Size picker */}
                <div className=" flex">
                    <p className={classNames( data?.attributes.stock <= 10 && data?.attributes.stock  ? "text-sm font-medium text-red-900" : "hidden")}>
                    Grăbește-te! Au mai rămas {data?.attributes.stock } in stoc!
                    </p>
                  </div>
                  { data?.attributes.stock ?
                  <div className="w-auto rounded-xl h-10 bg-green-100">
                    <div className="p-2 font-medium opacity-40 text-green-900 flex ">
                      <CheckIcon className="w-6 h-6" />
                        Produsul este in stoc!
                    </div>
                  </div>
                  :
                  <></>
                    }
                  
                <button
                  type="submit"
                  onClick={()=>dispatch(addToCart({
                    id:data?.id,
                    title:data?.attributes.title,
                    price:data?.attributes.price,
                    img:data?.attributes.img.data[0].attributes.url,
                    quantity,
                  }),createNotification("Produsul a fost adăugat in coș!"))}
                  disabled={data?.attributes.stock  ? "" : "true"}
                  className={classNames( data?.attributes.stock  ? "mt-2 w-full bg-indigo-600 border border-transparent rounded-xl py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" : 
                  "mt-2 w-full bg-neutral-200 border border-transparent rounded-xl py-3 px-8 flex items-center justify-center text-base font-medium text-neutral-700 disabled cursor-not-allowed opacity-70")}
                  
                >
                  {data?.attributes.stock  ? "Adaugă în coș" : "Ne cerem scuze, produsul nu mai este în stoc."}
                </button>
                <div className={data?.attributes.stock ? "quantity space-x-10 font-medium items-center inline-flex":"hidden"}>
                      <button
                      onClick={() => setQuantity((prev) => prev === data?.attributes.stock ? prev : prev+1)}
                      className={quantity === data?.attributes.stock ? "w-10 h-10  text-white rounded-xl bg-indigo-600  opacity-60 cursor-not-allowed" : "w-10 h-10 text-white rounded-xl bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"}>
                        +
                      </button>
                      <div>
                      {quantity}
                      </div>
                      <button 
                      onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}
                      className="w-10 h-10  text-white rounded-xl bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        -
                      </button>
                  </div>

                  <div className="w-auto h-32 bg-slate-100 rounded-xl">
                    <div className='font-medium p-4  text-slate-800'>
                      <div className='flex space-x-3 items-center '>
                        
                      <TruckIcon className='w-10 h-10 ' />
                     <p>Livrare oriunde în țară</p> 
                      </div>
                     <div className='flex-col space-y-[0.5px] text-sm items-center'>
                    <p>Taxă de livrare - 11 RON pentru comenzi până la 250 RON.</p>  
                    <p>Livrare gratuită la comenzi de peste 250 RON!</p> 
                     </div>
                    </div>
                  </div>
              

              {/* Product details */}
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Descriere</h2>

                <div
                  className="mt-4 prose prose-sm text-gray-500"
                  dangerouslySetInnerHTML={{ __html: data?.attributes?.description }}
                />
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-sm font-medium text-gray-900">Informatii</h2>

                <div className="mt-4 prose prose-sm text-gray-500">
                  <ul role="list">
                      <li key={"5"}>Brand: {data?.attributes?.brand?.data?.attributes?.title}</li>
                      <li key={"6"}>Puff-uri: {data?.attributes.puffs}</li>
                  </ul>
                </div>
              </div>

              {/* Policies */}
              <section aria-labelledby="policies-heading" className="mt-10 space-y-2">
                <h2 id="policies-heading" className="sr-only">
                  Detalii
                </h2>

                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {/*{policies.map((policy) => (
                    <div key={policy.name} className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                      <dt>
                        <policy.icon className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <span className="mt-4 text-sm font-medium text-gray-900">{policy.name}</span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-500">{policy.description}</dd>
                    </div>
                  ))} */}
                </dl>
                <div className="w-auto h-32 rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-100">
                    <div className='font-medium p-4  text-yellow-900'>
                      <div className='flex space-x-3 items-center '>
                      <CheckBadgeIcon className='w-8 h-8 '/>
                     <p>Produs original</p> 
                      </div>
                     <div className='flex-col space-y-[0.5px] text-sm items-center'>
                    <p>Asigurăm calitatea si originalitatea produselor pe care le foloșești.</p>  
                    <p>Pe cutia produsului (ex. Elf Bar) se regăsește un cod QR pentru validarea autenticității</p> 
                     </div>
                    </div>
                  </div>
                  <div className="w-auto h-28 rounded-xl bg-gradient-to-br from-green-50 to-green-100">
                    
                    <div className='font-medium p-4  text-green-900'>
                      <div className='flex space-x-3 items-center '>
                      <FaRecycle className='w-8 h-8 '/>
                     <p>Protejează mediul înconjurator</p> 
                      </div>
                     <div className='flex-col space-y-[0.5px] text-sm items-center'>
                    <p>Aruncă în mod responsabil produsele de unică folosință / disposable</p>  
                    <p>în locuri destinate reciclării bateriilor!</p> 
                     </div>
                    </div>
                  </div>
               {/* <div className={classNames(
                   data?.attributes.hasNic ? "border-black border-[4px] rounded-xl max-w-sm lg:max-w-screen-2xl mx-auto w-full h-auto text-2xl flex justify-center font-arimo text-center" : "hidden"
                   )}>
                       <p className="lg:w-1/2 w-3/4 mx-auto">
                    Acest produs conține nicotină.
                    Nicotina generează un grad ridicat de dependență.
                    </p>
                </div> */}
              </section>
            </div>
          </div>
        </div>
        </>
           )}
        </div>
    
   
    </div>
    <Notification show={show} message={message} 
    onClose={() => setShow(false)}
    />
        </div>
        
    )
}

export default Product;