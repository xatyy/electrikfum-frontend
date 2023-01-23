import { Outlet, Navigate } from 'react-router-dom'
import authCheck from '../services/authCheck'
const PrivateRoutes = () => {
    let auth = authCheck;
    return(
        auth ? <Outlet/> : <Navigate to="/login" />
    )
}

export default PrivateRoutes