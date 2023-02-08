import axios from "axios";

async function jwtData(){
    const token = window.localStorage.getItem("auth")
    if(token){
    const userRequest = axios.create({ baseURL: process.env.REACT_APP_API_URL,
        headers:{
            Authorization: "Bearer " + token,
        }
    })

    
    const response = await userRequest.get('users/me?populate=role')
    
    return response.data
    }
    else return null;

}
export default jwtData();