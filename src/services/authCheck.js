import jwtDecode from "jwt-decode";

function isAuth(){
    const token = window.localStorage.getItem("auth")

    if(token){
        const {exp} = jwtDecode(token)
        if(exp * 1000 > new Date().getTime()){
            return true
        }
        return false
    }
    return false
}

export default isAuth();