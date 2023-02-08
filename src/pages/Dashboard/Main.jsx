import { UserCircleIcon } from '@heroicons/react/24/solid';
import React from 'react'
import ShopStats from "../../components/ShopStats/ShopStats"
import getJwtData from '../../services/getJwtData'
import { useState } from 'react'
import { makeRequrestAsUser } from '../../makeRequestAsUser';
import { useEffect } from 'react';

const Main = () => {
    let userData = {};

    const [test, setTest] = useState(true);
    const [maintenance, setMaintenance] = useState(false);

    useEffect(()=>{
      async function handleConfig(){
          try{

              const res = await makeRequrestAsUser.get("/config",{
              })

              setMaintenance(res.data.data.attributes.maintenanceMode)

          }catch(err){
              console.log(err);
          }
      }
      handleConfig()
    
  }, [])

 async function handleMaintenance(){
    if(maintenance){
       await makeRequrestAsUser.put("/config",{
        "data": {
          "maintenanceMode" : false,
        }}).then(response =>{
          window.location.reload(false)
         })
    }else{
      await makeRequrestAsUser.put("/config",{
        "data": {
          "maintenanceMode" : true,
        }}).then(response =>{
          window.location.reload(false)
         })
 }
}
  
    const data = async () => {
        userData = await getJwtData;
        setTest(userData);
    }
    data();
    return(
        <div className="main space-y-2 py-4">
            <div className='flex items-center space-x-3'>
            <img className='h-10 w-auto' src="/wave.png"/>
            <h2 className='font-medium text-xl'>Salut, {test.firstName}</h2>
            </div>
            <ShopStats />
            <div className="flex items-start py-10">
                    <div className="flex items-center h-5">
                      <input
                        id="maintenance"
                        name="maintenance"
                        onClick={() => handleMaintenance()}
                        checked={maintenance}
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="maintenance" className="font-medium text-gray-700">
                        Mod mentenanta
                      </label>
                      <p className="text-gray-500">Blocheaza accesul utilizatorilor pentru lucrari de mentenanta.</p>
                    </div>
                </div>   
        </div>
    )
}

export default Main;