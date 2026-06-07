//import { useOrders } from "../context/OderContext";

//const CompletedOrders = () =>
//{
//    const { orders } = useOrders();

//    const completed = orders.filter(
//        ( o ) => o.status === "Completed" || o.status === "Cancelled"
//    );

//    if ( completed.length === 0 )
//    {
//        return <p>No completed orders yet</p>;
//    }

//    return (
//        <div className="orders-list">
//            { completed.map( ( order ) => (
//                <div key={ order.id } className="order-card">
//                    <h4>Order #{ order.id }</h4>
//                    <p>{ order.customer.name }</p>
//                    <p>₦{ order.total }</p>
//                    <p>Status: { order.status }</p>
//                </div>
//            ) ) }
//        </div>
//    );
//};






const CompletedOrders = ( { orders } ) =>
{
    const completed = orders.filter( o => o.status === "Completed" );

    return (
        <div>
            { completed.map( order => (
                <div key={ order.id }>
                    <h4>{ order.customer.name }</h4>
                    <p>₦{ order.total }</p>
                </div>
            ) ) }
        </div>
    );
};
export default CompletedOrders;