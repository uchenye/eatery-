

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