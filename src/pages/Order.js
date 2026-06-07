import React, { useEffect, useState } from "react";
import { useOrders } from "../context/OderContext";
import "../styles/order.css";

const Orders = () =>
{
    const { orders: contextOrders } = useOrders();
    const [ orders, setOrders ] = useState( [] );

    useEffect( () =>
    {
        const localOrders =
            JSON.parse( localStorage.getItem( "doomummy_orders" ) ) || [];

        // merge both (context + localStorage)
        const merged = [ ...localOrders, ...contextOrders ];

        // remove duplicates (important)
        const unique = Array.from(
            new Map( merged.map( ( o ) => [ o.id, o ] ) ).values()
        );

        setOrders( unique );
    }, [ contextOrders ] );

    const getStatusColor = ( status ) =>
    {
        switch ( status )
        {
            case "Processing":
                return "orange";
            case "Preparing":
                return "blue";
            case "Out for Delivery":
                return "purple";
            case "Delivered":
                return "green";
            default:
                return "gray";
        }
    };

    return (
        <div className="orders-page">
            <h2>📦 My Orders</h2>

            { orders.length === 0 ? (
                <p className="empty">No orders yet</p>
            ) : (
                orders.map( ( order ) => (
                    <div key={ order.id } className="order-card">
                        <div className="order-top">
                            <h3>
                                Order #{ order.id.toString().slice( -5 ) }
                            </h3>

                            <span
                                className="status"
                                style={ {
                                    background: getStatusColor( order.status ),
                                } }
                            >
                                { order.status }
                            </span>
                        </div>

                        <div className="order-items">
                            { order.items?.map( ( item ) => (
                                <p key={ item.id }>
                                    { item.name } x { item.quantity }
                                </p>
                            ) ) }
                        </div>

                        <div className="order-bottom">
                            <strong>₦{ order.total }</strong>
                        </div>
                    </div>
                ) )
            ) }
        </div>
    );
};

export default Orders; 