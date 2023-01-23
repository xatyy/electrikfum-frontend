import React, { useEffect } from 'react'
import {Routes, Route} from "react-router-dom"
import OrdersTable from '../../components/OrdersTable/OrdersTable'
import OrdersDetails from './OrdersDetails'
import { makeRequrest } from '../../makeRequest'
import { useState } from 'react'


const Orders = () => {

    
    return(
        <div className="users">
            <Routes>
                <Route path="/" element={<OrdersTable
 />
 
 } />
                <Route path="/:id" element={<OrdersDetails />} />
            </Routes>
        </div>
    )
}

export default Orders;