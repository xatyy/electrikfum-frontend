import {React, useState} from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import * as Yup from 'yup'
import Notification from '../../components/Notification/Notification'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import axios from 'axios'
import { makeRequrest } from '../../makeRequest'
import { makeRequrestAsUser } from '../../makeRequestAsUser'
const user = {firstName: "Mihai", lastName:"Popescu", email:"mihai_popescu@gmail.com", phone: "+40723435827", role: "Customer", address:"Aleea X", city:"Timisoara", county:"Timis", postal:"300464", isConfirmed: true, isBlocked:false}



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}




const formScheme = Yup.object().shape({
    password: Yup.string()
    .required('Parola nu trebuie sa fie goala!')
    .min(8, 'Parola trebuie sa fie de minim 8 caractere.'),
    confirmPwd: Yup.string()
    .required('Parola nu trebuie sa fie goala!')
    .oneOf([Yup.ref('password')], 'Parolele nu sunt identice!'),
})



const ChangePassword = () => {
   
    const [query] = new URLSearchParams(window.location.search);
    const resetCode = query[1] ?? 0;

    const [show, setShow] = useState(false)
    const [showPrompt, setShowPrompt] = useState(false)
    const [editable, setEditable] = useState(false)
    const [message, setMessage] = useState('');
    const [adminTitle, setAdminTitle] = useState('');
    const [editButtonMessage, setEditButtonMessage] = useState("Editeaza")
    const [errorMessage, setErrorMessage] = useState('')

    const formOptions = { resolver: yupResolver(formScheme)}
    const { register, handleSubmit, formState } = useForm(formOptions)
    const { errors } = formState

   


    function timeout(delay){
        return new Promise(res => setTimeout(res, delay));
    }

    async function createNotification(message){
        setShow(true)
        setMessage(message)
        await timeout(4000);
        setShow(false)
    }


      async function handlePasswordChange(data){
        axios.post(process.env.REACT_APP_API_URL + '/auth/reset-password', {
            code: resetCode,
            password: data.password,
            passwordConfirmation: data.confirmPwd,
        }).then(response => {
            createNotification(`Parola a fost modificata!`)
            window.location.replace("/");
        }).catch(error => {
            console.log('An eror occured', error.response);
        });
      }

    return(
        <div className="account py-12 space-y-4">
             <div className="space-y-6 mr-10 ml-10">   
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 space-y-5">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Modifică parola </h3>
            <h3 className="text-md font-medium leading-6 text-gray-900"></h3>
       </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit(handlePasswordChange)} className="space-y-6" name="password" method="POST">
              <div className="grid grid-cols-6 gap-6"> 
              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    Parola nouă
                  </label>
                  <input
                    type="password"
                    name="password"
                    {...register('password')}
                    id="password"
                    autoComplete="new-password"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:opacity-70 disabled:cursor-not-allowed"
                  />
                  <div className="block text-sm font-medium text-red-500 invalid-feedback">{errors.password?.message}</div>
                </div>
                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                    Repetă parola nouă
                  </label>
                  <input
                    type="password"
                    name="confirm_password"
                    {...register('confirmPwd')}
                    id="confirm_password"
                    autoComplete="new-password"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                   <div className="block text-sm font-medium text-red-500 invalid-feedback">{errors.confirmPwd?.message}</div>
                </div>
              </div>
              <div className="flex justify-end">
        <button
          type="submit"
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Modifică
        </button>
        </div>
            </form>
          </div>
        </div>
      </div>    
      <Notification show={show} message={message} 
    onClose={() => setShow(false)}
    />
    </div>

        </div>

    )
}

export default ChangePassword;