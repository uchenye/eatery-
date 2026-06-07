export const sendToWhatsApp = ( order ) =>
{
    if ( !order || !order.items ) return;

    const itemsText = order.items
        .map(
            ( i ) =>
                `• ${ i.name } x${ i.quantity } = ₦${ i.price * i.quantity }`
        )
        .join( "\n" );

    const message = `
🍽️ *NEW ORDER - DOOMUMMY KITCHEN*

👤 Name: ${ order.customer?.name || "N/A" }
📞 Phone: ${ order.customer?.phone || "N/A" }
📍 Address: ${ order.customer?.address || "N/A" }

🧾 Items:
${ itemsText }

💰 Total: ₦${ order.total }
💳 Payment: ${ order.paymentMethod }
`;

    const phone = "234XXXXXXXXXX"; // your restaurant number
    const url = `https://wa.me/${ phone }?text=${ encodeURIComponent( message ) }`;

    window.open( url, "_blank" );
};