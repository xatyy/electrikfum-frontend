import React, { Component } from 'react'
import {Routes, Route, Navigate, useLocation, BrowserRouter} from "react-router-dom";
import DashboardSidebar from '../../components/DashboardSidebar/DashboardSidebar';
import Main from './Main';
import Orders from './Orders';
import Products from './Products';
import Users from './Users';
import getJwtData from '../../services/getJwtData';

const Dashboard = () => {

    return(
        <div className="dashboard">
            <DashboardSidebar>
            <Routes>
                <Route path="/" element={<Main/>} />
                <Route path="/orders/*" element={<Orders />} />
                <Route path="/products/*" element={<Products />} />
                <Route path="/users/*" element={<Users />} />
            </Routes>
            </DashboardSidebar>
        </div>
    )
}

export default Dashboard;