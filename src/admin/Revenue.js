const Revenue = ( { orders } ) =>
{

    const completed = orders.filter(
        o => o.status === "Completed"
    );

    const cancelled = orders.filter(
        o => o.status === "Cancelled"
    );

    const revenue = completed.reduce(
        ( sum, o ) => sum + o.total,
        0
    );

    return (
        <div className="revenue-card">
            <h2>Total Revenue</h2>
            <h1>₦{ revenue }</h1>

            <div className="revenue-meta">
                <p>Total Orders: { orders.length }</p>
                <p>Completed: { completed.length }</p>
                <p>Cancelled: { cancelled.length }</p>
            </div>
        </div>
    );
};

export default Revenue;