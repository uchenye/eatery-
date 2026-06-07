//import React from "react";
//import { useCart } from "../../context/CartContext";
//import "../../styles/menuCard.css";
//const MenuCard = ( { item } ) =>
//{
//    const { addToCart } = useCart();

//    return (
//        <div className="menu-card">
//            <img src={ item.image } alt={ item.name } />

//            <div className="menu-info">
//                <h3>{ item.name }</h3>
//                <div className="menu-btn">
//                    <p className="price">₦{ item.price }</p>
//                    <button className="btn btn-primary" onClick={ () => addToCart( item ) }>
//                        Add to Cart
//                    </button>
//                </div>

//            </div>
//        </div>
//    );
//};

//export default MenuCard;


import React from "react";
import { useCart } from "../../context/CartContext";
import "../../styles/menuCard.css";

const MenuCard = ( { item, onAdd } ) =>
{
    const { addToCart } = useCart();

    const handleAdd = () =>
    {
        addToCart( item );
        onAdd?.( item );
    };

    return (
        <div className="menu-card">
            <img src={ item.image } alt={ item.name } />

            <div className="menu-info">
                <h3>{ item.name }</h3>

                <div className="menu-btn">
                    <p className="price">₦{ item.price }</p>

                    <button onClick={ handleAdd } className="btn btn-primary">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuCard;