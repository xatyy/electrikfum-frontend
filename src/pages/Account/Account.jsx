import {React, useState} from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import * as Yup from 'yup'
import Notification from '../../components/Notification/Notification'
import Prompt from '../../components/Prompt/Prompt'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import axios from 'axios'
import { makeRequrest } from '../../makeRequest'
const user = {firstName: "Mihai", lastName:"Popescu", email:"mihai_popescu@gmail.com", phone: "+40723435827", role: "Customer", address:"Aleea X", city:"Timisoara", county:"Timis", postal:"300464", isConfirmed: true, isBlocked:false}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const publicInformationSchema = Yup.object().shape({
    firstName: Yup.string().required('Prenumele nu poate fi gol!'),
    lastName: Yup.string().required('Numele nu poate fi gol!'),
    email: Yup.string().email().required('Adresa de email nu poate sa fie goala!'),
    phone: Yup.string().required('Nr de telefon nu poate fi gol!'),
    adress: Yup.string(),
    city: Yup.string(),
    county: Yup.string(),
    postal: Yup.string(),
})

const formScheme = Yup.object().shape({
    password: Yup.string()
    .required('Parola nu trebuie sa fie goala!')
    .min(8, 'Parola trebuie sa fie de minim 8 caractere.'),
    confirmPwd: Yup.string()
    .required('Parola nu trebuie sa fie goala!')
    .oneOf([Yup.ref('password')], 'Parolele nu sunt identice!'),
})

const dangerSchema = Yup.object().shape({
    role: Yup.string(),
    isBlocked: Yup.boolean(),
    isConfirmed: Yup.boolean()
})

const Account = () => {
    const [me, setMe] = useState()
    const token = window.localStorage.getItem("auth")


    let userme = {}
    useEffect(() => {
      const users = async () => {
          userme = await  axios.get(`http://localhost:1337/api/users/me`,{
            headers: {
              'Authorization' : `Bearer ${token}`
            }
          })
         setMe(userme.data)
      }
    users()
  }, [])


    const [show, setShow] = useState(false)
    const [showPrompt, setShowPrompt] = useState(false)
    const [editable, setEditable] = useState(false)
    const [message, setMessage] = useState('');
    const [adminTitle, setAdminTitle] = useState('');
    const [editButtonMessage, setEditButtonMessage] = useState("Editeaza")

    const formOptions = { resolver: yupResolver(formScheme)}
    const { register, handleSubmit, formState } = useForm(formOptions)
    const { errors } = formState

    const formOptions2 = { resolver: yupResolver(dangerSchema)}
    const { register: registerDanger, handleSubmit: handleSubmitDanger, formState: formStateDanger } = useForm(formOptions2)
    const { errors: err } = formStateDanger

    const formOptions3 = { resolver: yupResolver(publicInformationSchema)}
    const { register: registerInfo, handleSubmit: handleSubmitInfo, formState: formStateInfo } = useForm(formOptions3)
    const { errors: error } = formStateInfo

    
    function timeout(delay){
        return new Promise(res => setTimeout(res, delay));
    }

    async function createNotification(message){
        setShow(true)
        setMessage(message)
        await timeout(4000);
        setShow(false)
    }

    async function onSubmit(data) {
        console.log(JSON.stringify(data, null, 4))
        createNotification(`Parola pentru ${user.firstName} a fost modificata!`)
        return false
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

  
    async function handlePersonal(data) {
      handleEdit()
      await  makeRequrest.put(`/users/${me.id}`,{
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        street: data.street,
        city: data.city,
        county: data.county,
        postalCode: data.postalCode
      })
      createNotification(`Datele personale au fost modificate!`)
      window.location.reload(false)
      return false
    } 

    async function onChangeRole(data) {
        console.log(JSON.stringify(data, null, 4))
        const dangerAdminMessage = `Suneti siguri ca doriti sa modificati rolul? Promovarea neintentionata a utilizatorului ${user.firstName} ${user.lastName} din ${user.role} in ${data.role} permite unui utilizator normal sa aiba putere asupra acestui magazin. `
        const dangerAdminTitle = `Stai putin`
        if(user.role != data.role && data.role == "Administrator"){
            setShowPrompt(true)
            setMessage(dangerAdminMessage)
            setAdminTitle(dangerAdminTitle)
        }
        return false
      } 

    const editUser = {editable};
    return(
        <div className="account space-y-4">

             <div className="space-y-6 mr-10 ml-10">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Informatii personale</h3>
        </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="flex justify-end text-indigo-600 hover:text-indigo-800 cursor-pointer font-semibold" onClick={() => handleEdit()}> {editButtonMessage} </div>
            <form onSubmit={handleSubmitInfo(handlePersonal)} method="POST" className="space-y-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                    Prenume 
                    
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    {...registerInfo('firstName')}
                    defaultValue={me?.firstName}
                    disabled={!editUser.editable}
                    id="first-name"
                    autoComplete="given-name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                  <div className="block text-sm font-medium text-red-500 invalid-feedback">{error.firstName?.message}</div>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                    Nume 
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    {...registerInfo('lastName')}
                    defaultValue={me?.lastName}
                    disabled={!editUser.editable}
                    id="last-name"
                    autoComplete="family-name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                  <div className="block text-sm font-medium text-red-500 invalid-feedback">{error.lastName?.message}</div>
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                    Email 
                  </label>
                  <input
                    type="text"
                    name="email-address"
                    {...registerInfo('email')}
                    defaultValue={me?.email}
                    disabled={!editUser.editable}
                    id="email-address"
                    autoComplete="email"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                  <div className="block text-sm font-medium text-red-500 invalid-feedback">{error.email?.message}</div>
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                    Nr. Telefon 
                  </label>
                  <input
                    type="text"
                    name="phone"
                    {...registerInfo('phone')}
                    defaultValue={me?.phone}
                    disabled={!editUser.editable}
                    id="phone"
                    autoComplete="phone"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                  <div className="block text-sm font-medium text-red-500 invalid-feedback">{error.phone?.message}</div>
                </div>



                <div className="col-span-6">
                  <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                    Strada
                  </label>
                  <input
                    type="text"
                    name="street-address"
                    defaultValue={me?.street}
                    {...registerInfo('address')}
                    disabled={!editUser.editable}
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
                    {...registerInfo('city')}
                    defaultValue={me?.city}
                    disabled={!editUser.editable}
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
                    {...registerInfo('county')}
                    defaultValue={me?.county}
                    disabled={!editUser.editable}
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
                    {...registerInfo('postal')}
                    defaultValue={me?.postalCode}
                    disabled={!editUser.editable}
                    id="postal-code"
                    autoComplete="postal-code"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              <div className="flex justify-end">
              <button
          type="submit"
          hidden={!editable}
          className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Salveaza
        </button>
        </div>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 space-y-5">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Modifica parola </h3>
       </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" name="password" method="POST">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                    Parola noua 
                  </label>
                  <input
                  {...register('password')}
                    type="password"
                    name="password"
                    id="passwords"
                    
                    className={`form-control ${errors.password ? 'focus:ring-red-900 focus:border-red-900' : 'focus:ring-green-500 focus:border-green-500'} mt-1  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
                  />
                  <div className="block text-sm font-medium text-red-500 invalid-feedback">{errors.confirmPwd?.message}</div>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                    Repeta parola noua 
                  </label>
                  <input
                  {...register('confirmPwd')}
                    type="password"
                    name="confirmPwd"
                    id="confirmPwd"
                    
                    className={`form-control ${errors.confirmPwd ? 'focus:ring-red-900 focus:border-red-900' : 'focus:ring-green-500 focus:border-green-500'} mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
                  />
                   <div className="block text-sm font-medium text-red-500 invalid-feedback">{errors.confirmPwd?.message}</div>
                </div>
               
              </div>
              <div className="flex justify-end">
        <button
          type="submit"
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Salveaza
        </button>
        </div>
            </form>
            
          </div>
        </div>
        
      </div>

      <div className="bg-red-50 border-red-300 shadow border-[1px] px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Danger zone</h3>
            
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmitDanger(onChangeRole)} className="space-y-6"  method="POST">
            

                  
                <div className="flex justify-end">
        <button
          type="submit"
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Sterge Cont
        </button>
        </div>
            </form>
          </div>
        </div>
      </div>
      <Notification show={show} message={message} 
    onClose={() => setShow(false)}
    />
    <Prompt icon={"ShieldExclamationIcon"} open={showPrompt} message={message} title={adminTitle} onExit={() => setShowPrompt(false)} />
    </div>

        </div>

    )
}

export default Account;