//import React, { useState } from "react";
//import { Link, useNavigate } from "react-router-dom";
//import "../../styles/navbar.css";
//import Logo from "../common/Logo";

//const Navbar = () =>
//{
//    const [ open, setOpen ] = useState( false );
//    const navigate = useNavigate();

//    const handleNav = ( path ) =>
//    {

//        navigate( path );

//        setOpen( false );
//        console.log( "i was clicked", path );

//    };

//    return (
//        <div className="navbar">
//            <Logo />

//            {/* Hamburger */ }
//            <div className="hamburger" onClick={ () => setOpen( !open ) }>
//                <span></span>
//                <span></span>
//                <span></span>
//            </div>

//            {/* Nav Links */ }
//            <div className={ `nav-links ${ open ? "active" : "" }` }>
//                <Link to="/menu" onClick={ () => setOpen( false ) }>Menu</Link>
//                <Link to="/cart" onClick={ () => setOpen( false ) }>Cart</Link>
//                <Link to="/admin/dashboard" onClick={ () => setOpen( false ) }>Admin</Link>
//            </div>
//        </div>
//    );
//};

//export default Navbar;



import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "../../styles/navbar.css";
import Logo from "../common/Logo";

const Navbar = () =>
{
    const [ open, setOpen ] = useState( false );
    const { cartCount } = useCart();

    return (
        <div className="navbar">
            <Logo />

            <div className="hamburger" onClick={ () => setOpen( !open ) }>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className={ `nav-links ${ open ? "active" : "" }` }>
                <Link to="/menu" onClick={ () => setOpen( false ) }>Menu</Link>

                <Link to="/cart" onClick={ () => setOpen( false ) } className="cart-link">
                    Cart

                    { cartCount > 0 && (
                        <span className="cart-badge">{ cartCount }</span>
                    ) }
                </Link>

                <Link to="/admin/dashboard" onClick={ () => setOpen( false ) }>Admin</Link>
            </div>
        </div>
    );
};

export default Navbar;