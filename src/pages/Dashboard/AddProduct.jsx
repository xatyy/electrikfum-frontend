import {React, useState, useRef} from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon, TrashIcon, CheckIcon } from '@heroicons/react/24/outline'
import * as Yup from 'yup'
import Notification from '../../components/Notification/Notification'
import Prompt from '../../components/Prompt/Prompt'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FilePreviewer from '../../components/Function/FilePreviewer'
import { makeRequrest } from '../../makeRequest'
import { useEffect } from 'react'


const productSchema = Yup.object().shape({
    title: Yup.string().required('Titlul nu poate fi gol'),
    price: Yup.number().positive('Numarul trebuie sa fie pozitiv').required('Pretul nu poate fi gol!'),
    stock: Yup.number().positive('Numarul trebuie sa fie pozitiv').integer('Trebuie sa fie un numar intreg').required('Stocul produsului nu poate fi gol!'),
    description: Yup.string().required('Descrierea nu poate fi goala!'),
    puffs: Yup.number().positive(),
    hasNic: Yup.boolean(),
    category: Yup.number().required('t'),
    sub_category: Yup.number().required('t'),
    brand: Yup.number().required('t'),
})


const AddProduct = () => {
    const [categories, setCategories] = useState()
    const [subCategories, setSubCategories] = useState()
    const [brand, setBrand] = useState()

    let catg = {}
    let brands = {}
        useEffect(() => {
          const cat = async () => {
              catg = await  makeRequrest.get(`/categories?populate=*`)
              brands = await  makeRequrest.get(`/brands`)
             setCategories(catg.data.data)
             setBrand(brands.data.data)
          }
        cat()
      }, [])


    const [catId, setCatId] = useState();
    const [productId, setProductId] = useState(0)
    const [productTitle, setProductTitle] = useState("")
    const [files, setFiles] = useState()

    const [imagePreview, setImagePreview] = useState(null);

    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('');

    const formOptions = { resolver: yupResolver(productSchema)}
    const { register, handleSubmit, formState } = useForm(formOptions)
    const { errors } = formState

    function timeout(delay){
        return new Promise(res => setTimeout(res, delay));
    }

    console.log(catId)

    const handleChange = ({currentTarget}) => {
        setProductTitle(currentTarget.value)
    }

    const handleChangeCat = ({currentTarget}) => {
        setCatId(currentTarget.value)
        console.log(catId)
    }

    const filePickerRef = useRef(null);

    const uploadImage = async (e) => {
        handleSubmit(onSubmit)
        e.preventDefault();
        const formData = new FormData()
        formData.append('files', files[0])
        makeRequrest.post("/upload",formData)
        .then((response)=>{
            const imageId = response.data[0].id
            makeRequrest.post(`/products/`,{
                data:{
                img:response.data[0]
            }}).then((response)=>{
                console.log(response)
            }).catch((error)=>{
                console.log(error)
            })
            console.log(response)
        }).catch((error)=>{
            console.log(error)
        })
    }

    function previewFile(e) {
        const reader = new FileReader();

        const selectedFile = e.target.files[0];

        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }

        reader.onload = (readerEvent) => {
            setImagePreview(readerEvent.target.result);
        };
    }

    function clearFiles() {
        setImagePreview(null);
    }


    async function createNotification(message){
        setShow(true)
        setMessage(message)
        await timeout(4000);
        setShow(false)
    }

    async function onSubmit(data) {
        console.log(JSON.stringify(data, null, 4))
        makeRequrest.post(`/products`,{
            data:{
            title: data.title,
            price: data.price,
            description: data.description,
            stock: data.stock,
            hasNic: data.hasNic,
            brand: data.brand,
            categories: data.category,
            sub_categories: data.sub_category,
            puffs: data.puffs
        }}).then((response)=>{
            console.log(response)
            window.location.replace(`http://localhost:3000/dashboard/products/${response.data.data.id}`)
        }).catch((error)=>{
            console.log(error)
        })
        
        return false
      } 


    
    return(
        <div className="productDetails transition-all ease-in">
             <div className="flex justify-start py-4 transition-all ease-in">
                  <Link to="../">
        <button
          type="button"
          className="bg-white py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <ChevronLeftIcon className="opacity-70" /> Inapoi
        </button>
        </Link>
      </div>
      <h3 className="text-lg font-medium py-6 leading-6 text-gray-900">{productTitle ? `${productTitle}`: "Adauga produs"}</h3>
             <div className="space-y-6">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 transition-[height] duration-1000 ease-linear">
        <div className="md:grid md:grid-cols-3 md:gap-6 transition-all ease-linear">
          <div className="md:col-span-1 space-y-2">
            <h3 className="text-lg font-medium leading-6 text-gray-900"></h3>
            <div className=" rounded-xl border-gray-300 border-[2px] flex justify-center bg-gray-200 h-[30rem] transition-all ease-linear duration-100 overflow-hidden"
                    
                    >
                        {imagePreview != null && <img className="h-[100%] w-auto " src={imagePreview} />}
                    </div>
            </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Titlu Produs <div className="invalid-feedback text-red-900">{errors.title?.message}</div>
                  </label>
                  <input
                    type="text"
                    name="title"
                    {...register('title')}
          
                    onChange={handleChange}
                    id="title"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Pret <div className="invalid-feedback text-red-900">{errors.price?.message}</div>
                  </label>
                  <input
                    type="text"
                    name="price"
                    {...register('price')}
                 
                   
                    id="price"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                    Stoc <div className="invalid-feedback text-red-900">{errors.stock?.message}</div>
                  </label>
                  <input
                    type="text"
                    name="stock"
                    {...register('stock')}
                   
                    
                    id="stock"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                   Descriere <div className="invalid-feedback text-red-900">{errors.description?.message}</div>
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    {...register('description')}
                  
                    
                    id="description"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                      </textarea>
                </div>

                

                <div className="col-span-3">
                  <label htmlFor="puffs" className="block text-sm font-medium text-gray-700">
                    Pufuri
                  </label>
                  <input
                    type="text"
                    name="puffs"
                  
                    {...register('puffs')}
                    
                    id="puffs"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
        Categorie <div className="invalid-feedback text-red-900">{errors.category?.message}</div>
      </label>
      <select
        
        {...register('category')}
        onChange={ handleChangeCat}
        id="category"
        name="category"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        defaultValue=""
      >
        <option value="" selected disabled hidden>Alege</option>
        {categories?.map((cat) => (
        <option  value={cat?.id}>{cat?.attributes.title}</option>
        ))}
      </select>
    </div>
    {catId ?
    <div>
      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
        Subcategorie <div className="invalid-feedback text-red-900">{errors.sub_categories?.message}</div>
      </label>
      <select
        disabled={!catId}
        id="subcat"
        name="subcat"
        {...register('sub_category')}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        defaultValue=""
      >
        <option value="" selected disabled hidden>Alege</option>
        {categories[catId-1]?.attributes.sub_categories.data?.map((cat) => (
        <option  value={cat?.id}>{cat?.attributes.title}</option>
        ))}
      </select>
    </div>
    : <></> }
    <div>
      <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
        Brand <div className="invalid-feedback text-red-900">{errors.brand?.message}</div>
      </label>
      <select
        id="brand"
        {...register('brand')}
        name="brand"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        defaultValue=""
      >
         <option value="" selected disabled hidden>Alege</option>
         {brand?.map((brand) => (
        <option  value={brand?.id}>{brand.attributes?.title}</option>
        ))}
      </select>
    </div>
                </div>
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="hasNic"
                        name="hasNic"
                        type="checkbox"
                        
                        {...register('hasNic')}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="isConfirmed" className="font-medium text-gray-700">
                        Produsul contine nicotina
                      </label>
                      <p className="text-gray-500">Cand este selectat, o avertizare va aparea pe pagina produsului.</p>
                    </div>
                </div>   

        
      

                <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="isShown"
                        name="isShown"
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="isShown" className="font-medium text-gray-700">
                        Produsul este afisat
                      </label>
                      <p className="text-gray-500">Cand este selectat, toata lumea poate comanda produsul.</p>
                    </div>
                </div>
              
              <div className="flex justify-end">
              <button
          type="submit"
          className="bg-green-700 flex justify items-center py-2 px-4 border border-green-300 rounded-lg shadow-sm text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <CheckIcon className="h-8" /> Adauga Produs
        </button>
            
        </div>
       
            </form>
          </div>
        </div>
      </div>
      </div>
      <div className="flex justify-end py-4">
               
        
        
      </div>
        </div>
    )
}

export default AddProduct;