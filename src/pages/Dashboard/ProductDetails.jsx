import {React, useState} from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon, TrashIcon } from '@heroicons/react/24/outline'
import * as Yup from 'yup'
import Notification from '../../components/Notification/Notification'
import Prompt from '../../components/Prompt/Prompt'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { makeRequrest } from '../../makeRequest'
import axios from 'axios'

const product = {
    title: "Elf bar 5% apple",
    price: 29.99,
    stock: 10,
    description: "Long long long long looooong description",
    puffs: 600,
    hasNic: true,
    category: "Tigari unica folosinta",
    isShown: true,
    img: "../../ELF1.png"
}

const productSchema = Yup.object().shape({
    title: Yup.string().required('Titlul nu poate fi gol'),
    price: Yup.number().positive().required('Pretul nu poate fi gol!'),
    stock: Yup.number().positive().integer().required('Stocul produsului nu poate fi gol!'),
    description: Yup.string().required('Descrierea nu poate fi goala!'),
    puffs: Yup.number().positive(),
    hasNic: Yup.boolean(),
    isShown: Yup.boolean(),
    category: Yup.string(),
})


const ProductDetails = () => {

    const [productData, setProductData] = useState()

const id = useParams().id;
const token = window.localStorage.getItem("auth")
const [files, setFiles] = useState()
let product = {}
    useEffect(() => {
      const users = async () => {
          product = await  makeRequrest.get(`/products/${id}?populate=*`)
         /* userme = await  axios.get(`http://79.114.48.133/api/users/me`,{
            headers: {
              'Authorization' : `Bearer ${token}`
            }
          })*/
         setProductData(product.data.data)
         setProductTitle(product.data.data.attributes.title)
      }
    users()
  }, [])
console.log(productData)
    const [editable, setEditable] = useState(false)
    const [editButtonMessage, setEditButtonMessage] = useState("Editeaza")

    const [productTitle, setProductTitle] = useState()

    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('');

    const formOptions = { resolver: yupResolver(productSchema)}
    const { register, handleSubmit, formState } = useForm(formOptions)
    const { errors } = formState

    function timeout(delay){
        return new Promise(res => setTimeout(res, delay));
    }

    const handleChange = ({currentTarget}) => {
        setProductTitle(currentTarget.value)
    }

    const uploadImage = async (e) => {
        handleSubmit(onSubmit)
        e.preventDefault();
        const formData = new FormData()
        formData.append('files', files[0])
        makeRequrest.post("/upload",formData)
        .then((response)=>{
            const imageId = response.data[0].id
            makeRequrest.put(`/products/${id}`,{
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

    async function createNotification(message){
        setShow(true)
        setMessage(message)
        await timeout(4000);
        setShow(false)
        window.location.reload(false)
    }

    async function onSubmit(data){
        console.log(data)
        await  makeRequrest.put(`/products/${id}`,{
            data:{
                title: data.title,
                price: data.price,
                stock: data.stock,
            }
          })
        handleEdit()
        createNotification(`Produsul a fost modificat!`)
        
        return false
      } 

    async function handleDelete(){
        await  axios.delete(`http://localhost:1337/api/products/${id}`,{
            headers: {
              'Authorization' : `Bearer ${token}`
            }})
            window.location.replace('../')
      }

    function handleEdit(){
        if (editable){
            setEditable(false);
            setEditButtonMessage("Editeaza");
        }else{
            setEditable(true);
            setEditButtonMessage("Opreste editarea")
        }
    }

    const editProduct = {editable};
    
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
      <h3 className="text-lg font-medium py-6 leading-6 text-gray-900">{productTitle ? `${productTitle}`: "Nume produs"}</h3>
             <div className="space-y-6">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 transition-[height] duration-1000 ease-linear">
        <div className="md:grid md:grid-cols-3 md:gap-6 transition-all ease-linear">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Informatii produs</h3>
            <p className="mt-1 text-sm text-gray-500">Vizualizeaza sau modifica produsul.</p>
            <img className="rounded-xl border-gray-200 border-[2px]" src={productData?.attributes.img.data ? process.env.REACT_APP_UPLOAD_URL + productData?.attributes.img?.data[0].attributes?.url : ""} />
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="flex justify-end text-indigo-600 hover:text-indigo-800 cursor-pointer font-semibold" onClick={() => handleEdit()}> {editButtonMessage} </div>
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
                    defaultValue={productData?.attributes?.title}
                    onChange={handleChange}
                    disabled={!editProduct.editable}
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
                    defaultValue={productData?.attributes?.price}
                    disabled={!editProduct.editable}
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
                    defaultValue={productData?.attributes?.stock}
                    disabled={!editProduct.editable}
                    id="stock"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                   Descriere Lunga <div className="invalid-feedback text-red-900">{errors.description?.message}</div>
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    {...register('description')}
                    defaultValue={productData?.attributes?.description}
                    disabled={!editProduct.editable}
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
                    defaultValue={productData?.attributes?.puffs}
                    {...register('puffs')}
                    disabled={!editProduct.editable}
                    id="puffs"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
                </div>
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="hasNic"
                        name="hasNic"
                        type="checkbox"
                        disabled={!editProduct.editable}
                        {...register('hasNic')}
                        defaultChecked={productData?.attributes?.hasNic}
                        defaultValue={productData?.attributes?.hasNic}
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

                <div className="col-span-3 w-1/3">
                  <label htmlFor="puffs" className="block text-sm font-medium text-gray-700">
                    Poza produs <div className="invalid-feedback text-red-900">{errors.img?.message}</div>
                  </label>
                  <input
                    type="file"
                    name="img"
                    onChange={(e) => setFiles(e.target.files)}
                    disabled={!editProduct.editable}
                    id="img"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:opacity-60 disabled:cursor-not-allowed
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-xl file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-800
                    hover:file:bg-blue-100
                    disabled:file:opacity-60 disabled:file:cursor-not-allowed disabled:hover:file:bg-blue-50 "
                  />
                
                            <button
                    onClick={uploadImage}
                    hidden={!editable}
                    className="py-2 mt-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all ease-linear"
                    >
                    Upload
                    </button>
        </div>

                <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="hasNic"
                        name="hasNic"
                        type="checkbox"
                        disabled={!editProduct.editable}
                        
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="isConfirmed" className="font-medium text-gray-700">
                        Produsul este afisat
                      </label>
                      <p className="text-gray-500">Cand este selectat, toata lumea poate comanda produsul.</p>
                    </div>
                </div>
              
              <div className="flex justify-end">
              <button
          type="submit"
          hidden={!editable}
          className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all ease-linear"
        >
          Salveaza
        </button>
        </div>
            </form>
          </div>
        </div>
      </div>
      </div>
      <div className="flex justify-end py-4">
                
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-700 flex items-center py-2 px-4 border border-red-300 rounded-lg shadow-sm text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <TrashIcon className="h-8" /> Sterge Produs
        </button>
    
        <Notification show={show} message={message} 
    onClose={() => setShow(false)}
    />
      </div>
        </div>
    )
}

export default ProductDetails;