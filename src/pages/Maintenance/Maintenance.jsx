import React from 'react'
import Footer from '../../components/Footer/Footer';



const Maintenance = () => {

    
    return(
        <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      <div className="bg-white min-h-full px-4 py-32 sm:px-6 sm:py-32 md:grid md:place-items-center lg:px-8">
        <div className="max-w-max mx-auto">
          <main className="sm:flex">
            <p className="text-4xl font-extrabold text-indigo-600 sm:text-5xl">403</p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Acces respins</h1>
                <p className="mt-1 text-base text-gray-500">Electrikfum.ro este în mentenanță, iar accesul este restricționat.</p>
              </div>
              
            </div>
          </main>
        </div>
        
      </div>
      <Footer/>
    </>
    )
}

export default Maintenance;