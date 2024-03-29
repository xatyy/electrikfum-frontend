import React, { useState } from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { makeRequrest } from '../../makeRequest'
import authCheck from '../../services/authCheck';
import Banner from '../../components/BannerAlert/BannerAlert'
import Banner1 from '../../components/BannerAnnouncement/BannerAnnouncement'
const formSchema = Yup.object().shape({
    email: Yup.string().email().required('Adresa de email nu poate sa fie goala!'),
    password: Yup.string()
    .required('Parola nu poate sa fie goala!')
    .min(8, 'Parola trebuie sa fie de minim 8 caractere.'),
  });


const LogIn = () => {

  const formOptions = { resolver: yupResolver(formSchema)}
  const { register, handleSubmit, formState } = useForm(formOptions)
  const { errors } = formState
  const [errorMessage, setErrorMessage] = useState("")

  async function onSubmit(data) {

    await makeRequrest.post('/auth/local',{
        identifier: data.email,
        password: data.password
    }).then(response => response.data)
    .then(data=>{
      window.localStorage.setItem("auth", data.jwt)
      window.location.replace("../")
    })
    .catch(error =>{
        let response = JSON.parse(error.response.request.response);
        setErrorMessage(response.error.message)
    });


    return false
  } 

  if(authCheck){
    window.location.replace("/");
}


    return(
        <div className="login">
                    {errorMessage ? 
          <Banner message={errorMessage} />
          : <></>
}
            <div className="min-h-full xl:h-[40rem] 2xl:h-[60rem] flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96 space-y">
            <div>
            </div>
            <div>
          
              <img
                className="h-12 w-auto"
                src="../logo.svg"
  
              />
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Logheaza-te </h2>
              <p className="mt-2 text-sm text-gray-600">
                Sau{' '}
                <a href="../register" className="font-medium text-indigo-600 hover:text-indigo-500">
                  creeaza-ti un cont!
                </a>
              </p>
            </div>

            <div className="mt-8">
              

              <div className="mt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
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
                    </div>
                    <div className="text-sm font-medium invalid-feedback text-red-900">{errors.email?.message}</div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        {...register('password')}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="text-sm font-medium invalid-feedback text-red-900">{errors.password?.message}</div>
                  </div>

                  <div className="flex items-center justify-between">
                    

                    <div className="text-sm">
                      <a href="../forgot" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Ti-ai uitat parola?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Logare
                    </button>
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

export default LogIn;