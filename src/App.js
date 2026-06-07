
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import Navbar from "./components/layout/Navbar";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OderContext";
import "./styles/global.css";
import Footer from "./components/layout/Footer";




function App ()
{
    return (
        <OrderProvider>
            <CartProvider>
                <BrowserRouter>
                    <Navbar />
                    <main className="app-content">
                        <AppRoutes />
                    </main>
                    <Footer />
                </BrowserRouter>
            </CartProvider>
        </OrderProvider>
    );
}

export default App;