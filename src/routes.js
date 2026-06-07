import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Dashboard from "./admin/Dashboard";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Orders from "./pages/Order";



const AppRoutes = () =>
{
    return (
        <Routes>
            {/* CUSTOMER ROUTES */ }
            <Route path="/" element={ <Welcome /> } />
            <Route path="/homepage" element={ <Home /> } />
            <Route path="/menu" element={ <Menu /> } />
            <Route path="/cart" element={ <Cart /> } />
            <Route path="/checkout" element={ <Checkout /> } />
            <Route path="/orders" element={ <Orders /> } />

            {/* ADMIN ROUTES */ }
            <Route path="/admin/dashboard" element={ <Dashboard /> } />
        </Routes>
    );
};

export default AppRoutes;