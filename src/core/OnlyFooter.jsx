import React from "react";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";

export default () => {
    return(
        <>
        <Outlet />
        <Footer />
        </>
    );
};