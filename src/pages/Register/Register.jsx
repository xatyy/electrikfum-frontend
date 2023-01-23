import React, { useState } from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { makeRequrest } from '../../makeRequest'
import authCheck from '../../services/authCheck';

const formSchema = Yup.object().shape({
    firstName: Yup.string().required('Prenumele nu poate fi gol!'),
    lastName: Yup.string().required('Numele nu poate fi gol!'),
    email: Yup.string().email().required('Adresa de email nu poate sa fie goala!'),
    phone: Yup.string().required('Nr de telefon nu poate fi gol!'),
    password: Yup.string()
    .required('Parola nu poate sa fie goala!')
    .min(8, 'Parola trebuie sa fie de minim 8 caractere.'),
    confirmPwd: Yup.string()
    .required('Parola nu poate sa fie goala!')
    .oneOf([Yup.ref('password')], 'Parolele nu sunt identice!'),
    tandc: Yup.boolean().oneOf([true], 'Trebuie sa acceptati pentru a putea folosi serviciile noastre!'),
    gpdr: Yup.boolean().oneOf([true], 'Trebuie sa acceptati pentru a putea folosi serviciile noastre!'),
});




const Register = () => {

    const formOptions = { resolver: yupResolver(formSchema)}
    const { register, handleSubmit, formState } = useForm(formOptions)
    const { errors } = formState
    const [errorMessage, setErrorMessage] = useState("")

    async function onSubmit(data) {
        console.log(data);

        await makeRequrest.post('/auth/local/register',{
            username: data.email,
            email: data.email,
            phone: data.phone,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password
        }).then(response =>{
            console.log("Reusit!")
            console.log(response.data);
            window.location.href = "/login";
        }).catch(error =>{
            let response = JSON.parse(error.response.request.response);
            setErrorMessage(response.error.message)
        });

       

        return false
      } 

      if(authCheck){
          window.location.replace("/");
      }


    return(
        <div className="register">
            <div className="min-h-full xl:h-[60rem] 2xl:h-[60rem] flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
                <a href="../"> 
              <img
                className="h-12 w-auto"
                src="../logo.svg"
                
                />
                </a>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Inregistreaza-te </h2>
              <p className="mt-2 text-sm text-gray-600">
                Ai deja cont?{' '}
                <a href="../login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Logheaza-te aici!
                </a>
              </p>
            </div>

            <div className="mt-8">
              

              <div className="mt-6">
                <form onSubmit={handleSubmit(onSubmit)} name="register" className="space-y-6">
                <div className="grid grid-cols-6 gap-6">
                <div className="col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium  text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                      Prenume  
                    </label>
                    <div className="mt-1">
                      <input
                        id="first-name"
                        name="first-name"
                        type="text"
                        autoComplete="first-name"
                        {...register('firstName')}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <div className="text-sm font-medium invalid-feedback text-red-900">{errors.firstName?.message}</div>
                    </div>
                  </div>

                  <div className="col-span-3">
                    <label htmlFor="email" className="block  text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                      Nume  
                    </label>
                    <div className="mt-1">
                      <input
                        id="last-name"
                        name="last-name"
                        type="text"
                        autoComplete="family-name"
                        {...register('lastName')}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <div className="invalid-feedback text-sm font-medium text-red-900">{errors.lastName?.message}</div>
                    </div>
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                      Nr. Telefon  
                    </label>
                    <div className="mt-1 flex">
                      <input
                        id="phone"
                        name="phone"
                        type="phone"
                        autoComplete="phone"
                        {...register('phone')}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      
                    </div>
                    <div className="invalid-feedback text-sm font-medium text-red-900">{errors.phone?.message}</div>
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                      Email {errorMessage} 
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        {...register('email')}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <div className="invalid-feedback text-sm font-medium text-red-900">{errors.email?.message}</div>
                    </div>
                  </div>

                  <div className="space-y-1 col-span-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                      Parola 
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        {...register('password')}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                       <div className="invalid-feedback text-sm font-medium text-red-900">{errors.password?.message}</div>
                    </div>
                  </div>

                  <div className="space-y-1 col-span-6">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                      Confirma Parola  
                    </label>
                    <div className="mt-1">
                      <input
                        id="confirmPassword"
                        name="confirmpassword"
                        type="password"
                        autoComplete="new-password"
                        {...register('confirmPwd')}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <div className="invalid-feedback text-sm font-medium text-red-900">{errors.confirmPwd?.message}</div>
                    </div>
                  </div>
                  </div>
                  <div className="space-y-4">
                    

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        name="terms"
                        defaultChecked={false}
                        {...register('tandc')}
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                        Sunt de acord cu <span className="text-indigo-600">termenii si conditiile</span>
                        
                      </label>
                      <div className="invalid-feedback text-sm font-medium text-red-900">{errors.tandc?.message}</div>
                 </div>
                  </div>   

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="gpdr"
                        name="gpdr"
                        defaultChecked={false}
                        {...register('gpdr')}
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="gpdr" className="font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                        Sunt de acord cu <span className="text-indigo-600">Politica GPDR</span>
                        
                      </label>
                      <div className="invalid-feedback text-sm font-medium text-red-900">{errors.gpdr?.message}</div>
                 </div>
                  </div>   



                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Inregistrare
                    </button>
                    <p className="mt-2 text-xs text-gray-600">
                    *Inregistrandu-ma pe acest site declar ca am varsta minima legala pentru a cumpara produse cu nicotina.
               
              </p>
                  </div>
                  
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="./wallpaper-min.jpeg"
            alt=""
          />
        </div>
      </div>
        </div>
    )
}

export default Register;