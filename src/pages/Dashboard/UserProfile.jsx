import {React, useState} from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import * as Yup from 'yup'
import Notification from '../../components/Notification/Notification'
import Prompt from '../../components/Prompt/Prompt'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { makeRequrestAsUser } from '../../makeRequestAsUser'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const publicInformationSchema = Yup.object().shape({
    firstName: Yup.string().required('Prenumele nu poate fi gol!'),
    lastName: Yup.string().required('Numele nu poate fi gol!'),
    email: Yup.string().email().required('Adresa de email nu poate sa fie goala!'),
    phone: Yup.string().required('Nr de telefon nu poate fi gol!'),
    street: Yup.string(),
    city: Yup.string(),
    county: Yup.string(),
    postalCode: Yup.string(),
})


const dangerSchema = Yup.object().shape({
    role: Yup.string(),
    isBlocked: Yup.boolean(),
    isConfirmed: Yup.boolean()
})

const UserProfile = () => {

    const [userData, setUserData] = useState()
    const [me, setMe] = useState()
    const id = useParams().id;
    const token = window.localStorage.getItem("auth")

    let user = {}
    let userme = {}
    useEffect(() => {
      const users = async () => {
          user = await  makeRequrestAsUser.get(`/users/${id}?populate=role`)
          userme = await  axios.get(`https://api.electrikfum.ro/api/users/me`,{
            headers: {
              'Authorization' : `Bearer ${token}`
            }
          })
         setUserData(user.data)
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

    async function handleDelete(){
      if(me.id === userData.id){
        alert("Nu te poti sterge pe tine!")
      }else{
        await  axios.delete(`https://api.electrikfum.ro/api/users/${id}`,{
            headers: {
              'Authorization' : `Bearer ${token}`
            }})
      
    }
  }
  
    async function handleRoleChange(){
        setShowPrompt(false)
        await timeout(500);
        createNotification(`${user.firstName} a devenit administrator !`)
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
      await  makeRequrestAsUser.put(`/users/${id}`,{
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        street: data.street,
        city: data.city,
        county: data.county,
        postalCode: data.postalCode
      })
      createNotification(`Datele personale ale lui ${userData.firstName} au fost modificate!`)
      window.location.reload(false)
      return false
    } 

    const editUser = {editable};
    return(
        <div className="userprofile space-y-4">
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
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Informatii personale</h3>
            <p className="mt-1 text-sm text-gray-500">Vizualizeaza sau modifica informatiile personale ale clientului</p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="flex justify-end text-indigo-600 hover:text-indigo-800 cursor-pointer font-semibold" onClick={() => handleEdit()}> {editButtonMessage} </div>
            <form onSubmit={handleSubmitInfo(handlePersonal)} method="POST" className="space-y-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    Prenume <div className="invalid-feedback text-red-900">{error.firstName?.message}</div>
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    {...registerInfo('firstName')}
                    defaultValue={userData?.firstName}
                    disabled={!editUser.editable}
                    id="first-name"
                    autoComplete="given-name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Nume <div className="invalid-feedback text-red-900">{error.lastName?.message}</div>
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    {...registerInfo('lastName')}
                    defaultValue={userData?.lastName}
                    disabled={!editUser.editable}
                    id="last-name"
                    autoComplete="family-name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                    Email <div className="invalid-feedback text-red-900">{error.email?.message}</div>
                  </label>
                  <input
                    type="text"
                    name="email-address"
                    {...registerInfo('email')}
                    defaultValue={userData?.email}
                    disabled={!editUser.editable}
                    id="email-address"
                    autoComplete="email"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Nr. Telefon <div className="invalid-feedback text-red-900">{error.phone?.message}</div>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    {...registerInfo('phone')}
                    defaultValue={userData?.phone}
                    disabled={!editUser.editable}
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
                    name="street"
                    defaultValue={userData?.street}
                    {...registerInfo('street')}
                    disabled={!editUser.editable}
                    id="street"
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
                    defaultValue={userData?.city}
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
                    defaultValue={userData?.county}
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
                    {...registerInfo('postalCode')}
                    defaultValue={userData?.postalCode}
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

      
      <div className="bg-red-50 border-red-300 shadow border-[1px] px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Danger zone</h3>
            <p className="mt-1 text-sm text-gray-500">A se modifica cu mare atentie</p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
      
          </div>
        </div>
        <div className="flex justify-center">
        <button
          onClick={() => handleDelete()}
          className="ml-0 flex flex-row justify-center items-center  py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <TrashIcon className='h-10'/>
          Sterge cont
        </button>
        </div>
      </div>
      <Notification show={show} message={message} 
    onClose={() => setShow(false)}
    />
    <Prompt icon={"ShieldExclamationIcon"} open={showPrompt} message={message} title={adminTitle} onExit={() => setShowPrompt(false)} onExitYes={() => handleRoleChange()}/>
    </div>

        </div>

    )
}

export default UserProfile;