import React from 'react'
import Slider from "../../components/Slider/Slider";
import Promo from "../../components/Promo/Promo";
import NewProduct from '../../components/Featured/NewProduct';
import Bestseller from '../../components/Featured/Bestseller';
import authCheck from '../../services/authCheck';
import getJwtData from '../../services/getJwtData'
import Perks from '../../components/Perks/Perks';

const Home = () => {

    let userData = {};
  
    const data = async () => {
        userData = await getJwtData;
        console.log(userData)
    }
  
    if(authCheck){
        data();
    }
    return(
        <div className="home font-satoshi select-none">
            <Slider />
            <h1 className="text-4xl px-10 text-bold lg: py-8 lg:px-24">Bun venit pe Electrikfum!</h1>
            <p className="lg:max-w-6xl lg: px-24 lg: py-8">Alege orice tip de tigara electronica si beneficiaza de “fumuri” de calitate. Toate produsele noastre sunt de calitate superioare. Prin tigara electronica de la electrikfum ai garantia unor produse de nivel premium, la preturi de distribuitor unic. Te invitam sa descoperi kiturile de tigari electronice dar si cele mai bune accesorii si consumabile de pe piata.


Alege sa comanzi online. Viziteaza-ne constant si descopera ofertele lunare. Garantat vei beneficia de cele mai bune preturi la tigara electronica.
Alege garantia calitatii – Alege Elecrtikfum!

</p>
            <Promo />
            <NewProduct type="bestseller"/>
            <Perks />
        </div>
    )
}

export default Home;