import React from "react";
import MajorAlert from "../components/MajorAlert/MajorAlert";
import Denied from "../pages/Denied/Denied";
import { useState } from "react";
import { Outlet } from "react-router-dom";



export default () => {

    function handleYes(){
        window.localStorage.setItem("18check", true);
        setShowPrompt(false)
    }
    function handleNo(){
        window.localStorage.setItem("18check", false);
        window.location.replace("https://tv.tralala.ro/")
    }
  
    const age = window.localStorage.getItem("18check");
    const [showPrompt, setShowPrompt] = useState(true)
{if(age == "true"){


            return(
            <Outlet />)
}
        else if(age == null){
        return(

            <>
            <MajorAlert icon={"ShieldExclamationIcon"} open={showPrompt} message={"Trebuie sa ai varsta de 18 ani pentru a putea accesa Electrikfum.ro"} title={"Ai 18 ani?"} onExit={() => handleNo()} onExitYes={() => handleYes()}/>
            <Outlet />
            </>)
        }
            else if(age == "false"){
                return(
                    <>
                    <Denied />
                    </>
                )
            }
            
}
    
}; 