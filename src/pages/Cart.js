import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/cart.css";

const Cart = () =>
{
    const {
        cartItems,
        addToCart,
        decreaseQty,
        removeFromCart,
        getTotal
    } = useCart();

    const navigate = useNavigate();

    return (
        <div className="cart-page">
            <h2>Your Cart 🛒</h2>

            { cartItems.length === 0 ? (
                <div className="empty-state">
                    <h3>🛒 Your cart is empty</h3>
                    <p>Go to menu and add delicious meals</p>
                </div>
            ) : (
                <>
                    {/* ITEMS */ }
                    <div className="cart-list">
                        { cartItems.map( ( item ) => (
                            <div key={ item.id } className="cart-item-card">
                                <div className="cart-info">
                                    <h4>{ item.name }</h4>
                                    <p>₦{ item.price } × { item.quantity }</p>
                                    <small>Subtotal: ₦{ item.price * item.quantity }</small>
                                </div>

                                <div className="qty-controls">
                                    <button onClick={ () => decreaseQty( item.id ) }>-</button>
                                    <span>{ item.quantity }</span>
                                    <button onClick={ () => addToCart( item ) }>+</button>
                                </div>

                                <button
                                    className="remove"
                                    onClick={ () => removeFromCart( item.id ) }
                                >
                                    ✕
                                </button>
                            </div>
                        ) ) }
                    </div>

                    {/* TOTAL + CHECKOUT */ }
                    <div className="cart-total">
                        <h3>Total: ₦{ getTotal() }</h3>

                        <button
                            className="btn btn-primary checkout-btn"
                            onClick={ () => navigate( "/checkout" ) }
                        >
                            Proceed to Checkout →
                        </button>
                    </div>
                </>
            ) }
            <button
                className="btn btn-primary checkout-btn"
                onClick={ () => navigate( "/menu" ) }
            >
                Food Menu
            </button>
        </div>
    );
};

export default Cart;