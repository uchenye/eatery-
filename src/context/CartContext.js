import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext( CartContext );

export const CartProvider = ( { children } ) =>
{
    const [ cartItems, setCartItems ] = useState( [] );

    // ADD ITEM
    const addToCart = ( item ) =>
    {
        setCartItems( ( prev ) =>
        {
            const existing = prev.find( ( i ) => i.id === item.id );

            if ( existing )
            {
                return prev.map( ( i ) =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }

            return [ ...prev, { ...item, quantity: 1 } ];
        } );
    };

    // REMOVE ITEM
    const removeFromCart = ( id ) =>
    {
        setCartItems( ( prev ) =>
            prev.filter( ( item ) => item.id !== id )
        );
    };

    // DECREASE QUANTITY
    const decreaseQty = ( id ) =>
    {
        setCartItems( ( prev ) =>
            prev
                .map( ( item ) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter( ( item ) => item.quantity > 0 )
        );
    };

    // TOTAL PRICE
    const getTotal = () =>
    {
        return cartItems.reduce(
            ( sum, item ) => sum + item.price * item.quantity,
            0
        );
    };

    const cartCount = cartItems.reduce( ( sum, item ) => sum + item.quantity, 0 );

    const clearCart = () =>
    {
        setCartItems( [] );
    };
    return (
        <CartContext.Provider
            value={ {
                cartItems,
                addToCart,
                removeFromCart,
                decreaseQty,
                getTotal,
                cartCount,
                clearCart
            } }
        >
            { children }
        </CartContext.Provider>
    );
};