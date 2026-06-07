import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "../styles/checkout.css";
import Toast from "../components/common/Toast";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../context/OderContext";



const Checkout = () =>
{
    const { cartItems, getTotal, clearCart } = useCart(); const navigate = useNavigate();
    const { addOrder } = useOrders();
    const [ toast, setToast ] = useState( null );
    const [ processing, setProcessing ] = useState( false );
    const [ orderPlaced, setOrderPlaced ] = useState( false );
    const [ eta ] = useState( "30 - 45 mins" );

    const [ paymentMethod, setPaymentMethod ] = useState( "cash" );
    const [ showCardModal, setShowCardModal ] = useState( false );

    const [ card, setCard ] = useState( {
        number: "",
        name: "",
        expiry: "",
        cvv: "",
    } );

    const [ form, setForm ] = useState( {
        name: "",
        phone: "",
        address: "",
        type: "delivery",
    } );

    const handleChange = ( e ) =>
    {
        setForm( { ...form, [ e.target.name ]: e.target.value } );
    };

    const handleCardChange = ( e ) =>
    {
        setCard( { ...card, [ e.target.name ]: e.target.value } );
    };

    //    const formatOrderMessage = ( order ) =>
    //    {
    //        let itemsText = order.items
    //            .map(
    //                ( i ) =>
    //                    `• ${ i.name } x${ i.quantity } = ₦${ i.price * i.quantity }`
    //            )
    //            .join( "\n" );

    //        return `
    //🍽️ *NEW ORDER - DOOMUMMY KITCHEN*

    //👤 Name: ${ order.customer.name }
    //📞 Phone: ${ order.customer.phone }
    //📍 Address: ${ order.customer.address }
    //🚚 Type: ${ order.customer.type }

    //🧾 *Items:*
    //${ itemsText }

    //💰 *Total:* ₦${ order.total }
    //💳 Payment: ${ order.paymentMethod }

    //⏱️ ETA: ${ eta }
    //        `;
    //    };

    const fakePaymentFlow = ( order ) =>
    {
        setProcessing( true );

        setToast( {
            message: "Connecting to payment gateway...",
            type: "info",
        } );

        setTimeout( () =>
        {
            setToast( {
                message: "Verifying card details...",
                type: "info",
            } );
        }, 600 );

        setTimeout( () =>
        {
            setToast( {
                message: "Payment successful ✅",
                type: "success",
            } );
        }, 1200 );

        setTimeout( () =>
        {
            setProcessing( false );
            setOrderPlaced( true );

            // ✅ CREATE ORDER FIRST
            const newOrder = {
                id: Date.now(),
                customer: form,
                items: cartItems,
                total: getTotal(),
                paymentMethod,
                status: "Processing",
                createdAt: new Date().toISOString(),
            };

            // ✅ save to context
            addOrder( newOrder );

            // ✅ save to localStorage
            const existing =
                JSON.parse( localStorage.getItem( "doomummy_orders" ) ) || [];

            localStorage.setItem(
                "doomummy_orders",
                JSON.stringify( [ ...existing, newOrder ] )
            );

            setToast( {
                message: "Order placed successfully 🎉",
                type: "success",
            } );

            // clear cart
            clearCart();

            // go to orders page
            navigate( "/orders" );
        }, 1800 );
    };

    const handleSubmit = ( e ) =>
    {
        e.preventDefault();

        if ( cartItems.length === 0 ) return;

        const order = {
            customer: form,
            items: cartItems,
            total: getTotal(),
            paymentMethod,
        };

        if ( paymentMethod === "card" )
        {
            setShowCardModal( true );
            return;
        }

        fakePaymentFlow( order );
    };

    const handleCardPayment = () =>
    {
        setShowCardModal( false );

        const order = {
            customer: form,
            items: cartItems,
            total: getTotal(),
            paymentMethod: "card",
        };

        fakePaymentFlow( order );
    };

    if ( cartItems.length === 0 )
    {
        return (
            <div className="empty-checkout">
                <h2>🛒 Your cart is empty</h2>
                <p>Add delicious meals before checkout</p>
            </div>
        );
    }

    if ( orderPlaced )
    {
        return (
            <div className="success-page">
                <div className="success-card">
                    <div className="checkmark">✔</div>
                    <h2>Order Confirmed</h2>
                    <p className="muted">Your order is being prepared 🍲</p>
                    <div className="eta">⏱ ETA: { eta }</div>
                    <p className="muted">
                        We’ve sent your order to the kitchen 📲
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <h2>Checkout 📦</h2>

            {/* ORDER SUMMARY */ }
            <div className="summary">
                <h3>🧾 Order Summary</h3>

                <div className="summary-list">
                    { cartItems.map( ( item ) => (
                        <div key={ item.id } className="summary-card">
                            <div className="summary-left">
                                <h4>{ item.name }</h4>
                                <p>Qty: { item.quantity }</p>
                            </div>

                            <div className="summary-right">
                                ₦{ item.price * item.quantity }
                            </div>
                        </div>
                    ) ) }
                </div>

                <div className="summary-total">
                    <h3>Total</h3>
                    <h3>₦{ getTotal() }</h3>
                </div>
            </div>

            {/* FORM */ }
            <form onSubmit={ handleSubmit } className="checkout-form">
                <input name="name" placeholder="Full Name" onChange={ handleChange } required />
                <input name="phone" placeholder="Phone Number" onChange={ handleChange } required />
                <textarea name="address" placeholder="Delivery Address" onChange={ handleChange } />

                <select name="type" onChange={ handleChange }>
                    <option value="delivery">Delivery</option>
                    <option value="pickup">Pickup</option>
                </select>

                {/* PAYMENT */ }
                <div className="payment-method">
                    <h4>Payment Method</h4>

                    <label className="checkout-label">
                        <input
                            type="radio"
                            value="cash"
                            checked={ paymentMethod === "cash" }
                            onChange={ ( e ) => setPaymentMethod( e.target.value ) }
                        />
                        Pay on Delivery
                    </label>

                    <label className="checkout-label">
                        <input
                            type="radio"
                            value="card"
                            onChange={ ( e ) => setPaymentMethod( e.target.value ) }
                        />
                        Card (Demo)
                    </label>
                </div>

                <button className="btn btn-primary" type="submit" disabled={ processing }>
                    { processing ? "Processing..." : "Place Order" }
                </button>
            </form>

            {/* CARD MODAL */ }
            { showCardModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Enter Card Details</h3>

                        <input
                            name="number"
                            placeholder="Card Number"
                            onChange={ handleCardChange }
                        />

                        <input
                            name="name"
                            placeholder="Name on Card"
                            onChange={ handleCardChange }
                        />

                        <input
                            name="expiry"
                            placeholder="MM/YY"
                            onChange={ handleCardChange }
                        />

                        <input
                            name="cvv"
                            placeholder="CVV"
                            onChange={ handleCardChange }
                        />

                        <button
                            className="btn btn-primary"
                            onClick={ handleCardPayment }
                        >
                            Pay Now 💳
                        </button>

                        <button
                            className="btn btn-secondary"
                            onClick={ () => setShowCardModal( false ) }
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) }

            {/* TOAST */ }
            { toast && <Toast message={ toast.message } type={ toast.type } /> }
        </div>
    );
};

export default Checkout;