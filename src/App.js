import { BrowserRouter, Route, Routes } from "react-router-dom";
import {useState} from "react";
import authCheck from "./services/authCheck"
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
import Profile from "./pages/Profile/Profile";
import Maintenance from "./pages/Maintenance/Maintenance"
import Register from "./pages/Register/Register";
import PrivateRoutes from "./core/PrivateRoute";
import AdminRoutes from "./core/AdminRoute";
import MyOrders from "./pages/MyOrders/MyOrders";
import { useEffect } from "react";
import { makeRequrest } from "./makeRequest";
import getInternalData from "./services/getInternalData";

function App() {
  const [maintenance, setMaintenance] = useState(false);
  const [authority, setAuthority] = useState(false);
  let flo = {};

   useEffect(() => {
    const config = async () => {
      flo = await makeRequrest.get(`/config`)
      setMaintenance(flo.data.data.attributes.maintenanceMode)
      const result = await getInternalData
      setAuthority(result)
    }
  config()
}, [])

console.log(authority)

  return(
    <>
    {maintenance == true && authority == false ? (

       <Maintenance/>
 
    )
    :(
    <div className="app">
      <BrowserRouter> 
        <Routes>
          <Route element ={<NFAdder />}>
            <Route path="/" element={<Home />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="products/:id" element={<Products />} />
            <Route element={<PrivateRoutes/>}>
              <Route path="account" element={<Account />} />
              <Route path="orders" element={<MyOrders />} />
            </Route>
            <Route path="order" element={<CheckoutSuccess />} />
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
