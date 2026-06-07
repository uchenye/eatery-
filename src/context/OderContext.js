import React, { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export const useOrders = () => useContext( OrderContext );

export const OrderProvider = ( { children } ) =>
{
    const [ orders, setOrders ] = useState( [] );

    const addOrder = ( order ) =>
    {
        setOrders( ( prev ) => [ order, ...prev ] );
    };

    const updateOrderStatus = ( orderId, status ) =>
    {
        setOrders( ( prev ) =>
            prev.map( ( o ) =>
                o.id === orderId ? { ...o, status } : o
            )
        );
    };



    return (
        <OrderContext.Provider value={ { orders, addOrder, updateOrderStatus } }>
            { children }
        </OrderContext.Provider>
    );
};