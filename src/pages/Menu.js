//import React, { useState } from "react";
//import { menuData } from "../data/menuData";
//import MenuCard from "../components/menu/MenuCard";
//import CategoryFilter from "../components/menu/CategoryFilter";
//import "../styles/menuPage.css";

//const Menu = () =>
//{
//    const [ activeCategory, setActiveCategory ] = useState( "All" );
//    const [ search, setSearch ] = useState( "" );

//    const filtered = menuData.filter( ( item ) =>
//    {
//        const searchTerm = search.toLowerCase();

//        return (
//            ( activeCategory === "All" || item.category === activeCategory ) &&
//            (
//                item.name.toLowerCase().includes( searchTerm ) ||
//                item.category.toLowerCase().includes( searchTerm )
//            )
//        );
//    } );

//    return (
//        <div className="menu-page">
//            <h2>Our Menu 🍽️</h2>

//            {/* SEARCH */ }
//            <input
//                type="text"
//                placeholder="Search food..."
//                value={ search }
//                onChange={ ( e ) => setSearch( e.target.value ) }
//            />

//            {/* CATEGORY */ }
//            <CategoryFilter
//                active={ activeCategory }
//                setActive={ setActiveCategory }
//            />

//            {/* MENU LIST */ }
//            <div className="menu-grid">
//                { filtered.length === 0 ? (
//                    <p className="empty-state">
//                        No food found 😢 <br />
//                        Try "rice", "chicken", or "drink"
//                    </p>
//                ) : (
//                    filtered.map( ( item ) => (
//                        <MenuCard key={ item.id } item={ item } />
//                    ) )
//                ) }
//            </div>
//        </div>
//    );
//};

//export default Menu;



import React, { useState } from "react";
import { menuData } from "../data/menuData";
import MenuCard from "../components/menu/MenuCard";
import CategoryFilter from "../components/menu/CategoryFilter";
import Toast from "../components/common/Toast";
import { useNavigate } from "react-router-dom";
import "../styles/menuPage.css";
import { useCart } from "../context/CartContext";



const Menu = () =>
{
    const [ activeCategory, setActiveCategory ] = useState( "All" );
    const [ search, setSearch ] = useState( "" );
    const navigate = useNavigate();

    const [ toast, setToast ] = useState( null );
    const { cartCount } = useCart();
    const filtered = menuData.filter( ( item ) =>
    {
        const searchTerm = search.toLowerCase();

        return (
            ( activeCategory === "All" || item.category === activeCategory ) &&
            ( item.name.toLowerCase().includes( searchTerm ) ||
                item.category.toLowerCase().includes( searchTerm ) )
        );
    } );

    const handleAddToCart = ( item ) =>
    {
        setToast( {
            message: `${ item.name } added to cart 🛒`,
            type: "success",
        } );

        // auto hide toast
        setTimeout( () => setToast( null ), 2500 );

        // optional: suggest cart action after delay
        setTimeout( () =>
        {
            setToast( {
                message: "Go to cart to complete your order 👉",
                type: "info",
            } );
        }, 1200 );

        setTimeout( () => setToast( null ), 4000 );
    };

    return (
        <div className="menu-page">
            <h2>Our Menu 🍽️</h2>

            <input
                type="text"
                placeholder="Search food..."
                value={ search }
                onChange={ ( e ) => setSearch( e.target.value ) }
            />

            <CategoryFilter
                active={ activeCategory }
                setActive={ setActiveCategory }
            />
            {
                cartCount > 0 && (
                    <button
                        className="floating-checkout"
                        onClick={ () => navigate( "/cart" ) }
                    >
                        🛒 Proceed to Checkout ({ cartCount })
                    </button>
                )
            }
            <div className="menu-grid">
                { filtered.map( ( item ) => (
                    <MenuCard
                        key={ item.id }
                        item={ item }
                        onAdd={ handleAddToCart }
                    />
                ) ) }
            </div>

            {/* TOAST */ }
            { toast && <Toast message={ toast.message } type={ toast.type } /> }
        </div>
    );
};

export default Menu;