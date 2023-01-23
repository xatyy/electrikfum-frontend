import { Outlet, Navigate } from 'react-router-dom'
import authCheck from '../services/authCheck'
import getInternalData from '../services/getInternalData'
import { useState } from 'react'
const AdminRoutes = () => {
    let auth = authCheck;
   
  
    const [test, setTest] = useState(true);
    async function response(){
        const result = await getInternalData
        setTest(result)
    }
    response();
    
   
        
    

    return(
        auth && test ? <Outlet/> : <Navigate to="/" />
    )
}

export default AdminRoutes