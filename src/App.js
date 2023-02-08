import { BrowserRouter, Route, Routes } from "react-router-dom";
import {useState} from "react";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Products from "./pages/Products/Products";
import Account from "./pages/Account/Account";
import Checkout from "./pages/Checkout/Checkout";
import CheckoutSuccess from "./pages/Checkout/CheckoutSuccess";
import LogIn from "./pages/LogIn/LogIn";
import "./index.css";
import NFAdder from "./core/NFAdder";
import Blank from "./core/Blank";
import OnlyFooter from "./core/OnlyFooter";
import Dashboard from "./pages/Dashboard/Dashboard";
import Maintenance from "./pages/Maintenance/Maintenance"
import Register from "./pages/Register/Register";
import PrivateRoutes from "./core/PrivateRoute";
import AdminRoutes from "./core/AdminRoute";
import MyOrders from "./pages/MyOrders/MyOrders";
import { useEffect } from "react";
import { makeRequrest } from "./makeRequest";
import getInternalData from "./services/getInternalData";
import Confirm from "./pages/Confirm/Confirm"
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ChangePassword from './pages/ChangePassword/ChangePassword';
import Search from "./pages/Search/Search";
import FAQ from "./components/FAQ/FAQ"
import TAC from "./components/TAC/TAC"
import GPDR from "./components/GPDR/GPDR"
import DeliveryInfo from "./components/DeliveryInfo/DeliveryInfo"
import AgeCheck from "./core/AgeCheck";
function App() {

  const [maintenance, setMaintenance] = useState(false);
  const [authority, setAuthority] = useState(false);
  let site_config = {};

   useEffect(() => {
    const config = async () => {
      site_config = await makeRequrest.get(`/config`)
      setMaintenance(site_config.data.data.attributes.maintenanceMode)
      const result = await getInternalData
      setAuthority(result)
    }
  config()
}, [])




  return(
    <>
    {maintenance == true && authority == false ? (

       <Maintenance/>
 
    )
    :(
    <div className="app">
      <BrowserRouter> 
        <Routes>
          <Route element = {<AgeCheck />}>
          <Route element ={<NFAdder />}>
            <Route path="/" element={<Home />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="products/:id" element={<Products />} />
            <Route path="confirm" element={<Confirm />} />
            <Route path="search" element={<Search />} />
            <Route path="changepassword" element={<ChangePassword />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="tac" element={<TAC />} />
            <Route path="gpdr" element={<GPDR />} />
            <Route path="delivery" element={<DeliveryInfo />} />
            <Route element={<PrivateRoutes/>}>
              <Route path="account" element={<Account />} />
              <Route path="orders" element={<MyOrders />} />
            </Route>
            <Route path="order" element={<CheckoutSuccess />} />
          </Route>
          </Route>
          <Route element={<Blank />} >
          <Route path="checkout" element={<Checkout />} />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
            <Route element={<AdminRoutes/>}>
              <Route path="/dashboard/*" element={<Dashboard />} />
            </Route>
          </Route>
          <Route element={<OnlyFooter />}>
          <Route path="login" element={<LogIn />} />
          <Route path="forgot" element={<ForgotPassword />} />
          <Route path="register" element={<Register />} />
          </Route>
      </Routes>
      </BrowserRouter>
    </div>
    )}
    </>
  );
}

export default App;
