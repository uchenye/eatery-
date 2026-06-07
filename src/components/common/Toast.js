import React from "react";
import "../../styles/toast.css";

const Toast = ( { message, type = "success" } ) =>
{
    return (
        <div className={ `toast ${ type }` }>
            { message }
        </div>
    );
};

export default Toast;