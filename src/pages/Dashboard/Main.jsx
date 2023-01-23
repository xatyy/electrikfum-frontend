import { UserCircleIcon } from '@heroicons/react/24/solid';
import React from 'react'
import ShopStats from "../../components/ShopStats/ShopStats"
import getJwtData from '../../services/getJwtData'
import { useState } from 'react'


const Main = () => {
    let userData = {};

    const [test, setTest] = useState(true);
  
    const data = async () => {
        userData = await getJwtData;
        setTest(userData);
    }
    data();
    return(
        <div className="main">
            <h2>Salut, {test.firstName}</h2>
            <ShopStats />
        </div>
    )
}

export default Main;