import { saveOrders } from "../utils/orderKey";

const PendingOrders = ( { orders } ) =>
{

    const updateStatus = ( id, newStatus ) =>
    {
        const updated = orders.map( order =>
            order.id === id
                ? { ...order, status: newStatus }
                : order
        );

        saveOrders( updated );
    };

    const pending = orders.filter(
        o => o.status !== "Completed"
    );

    return (
        <div className="orders-list">
            { pending.map( order => (
                <div key={ order.id } className="order-card">

                    <h4>{ order.customer.name }</h4>
                    <p>₦{ order.total }</p>

                    <p>Status: <b>{ order.status }</b></p>

                    <select
                        value={ order.status }
                        onChange={ ( e ) =>
                            updateStatus( order.id, e.target.value )
                        }
                    >
                        <option>Processing</option>
                        <option>Preparing</option>
                        <option>Out for Delivery</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                    </select>
                </div>
            ) ) }
        </div>
    );
};

export default PendingOrders;