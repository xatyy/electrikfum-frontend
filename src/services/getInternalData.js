import jwtDecode from "jwt-decode";
import axios from "axios";

 async function getInternalData(){
    const token = window.localStorage.getItem("auth")
    const {id} = jwtDecode(token);

    const userRequest = axios.create({ baseURL: process.env.REACT_APP_API_URL,
        headers:{
            Authorization: "Bearer " + token,
        }
    })

    const response = await userRequest.get('users/me?populate=role')
    
    return(response.data.role.id === 3)


}
export default getInternalData();