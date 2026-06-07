import { useEffect, useState } from "react";
import PendingOrders from "./PendingOrders";
import CompletedOrders from "./CompletedOrders";
import Revenue from "./Revenue";
import "../styles/admin.css";
import { getOrders } from "../utils/orderKey";

const AdminDashboard = () =>
{
    const [ tab, setTab ] = useState( "pending" );
    const [ open, setOpen ] = useState( false );
    const [ orders, setOrders ] = useState( [] );

    // 🔥 INITIAL LOAD
    useEffect( () =>
    {
        setOrders( getOrders() );
    }, [] );

    // 🔥 LIVE SYNC (important fix)
    useEffect( () =>
    {
        const interval = setInterval( () =>
        {
            setOrders( getOrders() );
        }, 1000 );

        return () => clearInterval( interval );
    }, [] );

    return (
        <div className="admin-layout">

            <div className="admin-topbar">
                <button onClick={ () => setOpen( true ) }>☰</button>
                <h3>Admin</h3>
            </div>

            { open && (
                <div className="admin-overlay" onClick={ () => setOpen( false ) } />
            ) }

            <aside className={ `admin-sidebar ${ open ? "show" : "" }` }>
                <button className="close-btn" onClick={ () => setOpen( false ) }>
                    ✕
                </button>

                <h2>Doomummy ⚙️</h2>

                <button
                    className={ tab === "pending" ? "active" : "" }
                    onClick={ () => { setTab( "pending" ); setOpen( false ); } }
                >
                    📦 Pending Orders
                </button>

                <button
                    className={ tab === "completed" ? "active" : "" }
                    onClick={ () => { setTab( "completed" ); setOpen( false ); } }
                >
                    ✅ Completed
                </button>

                <button
                    className={ tab === "revenue" ? "active" : "" }
                    onClick={ () => { setTab( "revenue" ); setOpen( false ); } }
                >
                    💰 Revenue
                </button>
            </aside>

            <main className="admin-main">
                { tab === "pending" && <PendingOrders orders={ orders } /> }
                { tab === "completed" && <CompletedOrders orders={ orders } /> }
                { tab === "revenue" && <Revenue orders={ orders } /> }
            </main>
        </div>
    );
};

export default AdminDashboard;