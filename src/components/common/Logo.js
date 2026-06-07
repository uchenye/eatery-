import React from "react";
import "../../styles/logo.css";
import { useNavigate } from "react-router-dom";

const Logo = () =>
{
    const navigate = useNavigate();

    return (
        <div className="logo" onClick={ () => navigate( "/homepage" ) }>
            <h1>🍔 DOOMUMMY</h1>
            <p>Kitchen</p>
        </div>
    );
};

export default Logo;