import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/welcome.css";

const Welcome = () =>
{
    const navigate = useNavigate();

    return (
        <div className="welcome-page">
            <div className="welcome-container">
                <h2>
                    Welcome to <span className="brand">DOOMUMMY</span>{ " " }
                    <span className="kitchen">Kitchen 🍽️</span>
                </h2>

                <p>Order your favorite meals quickly and easily</p>

                <button
                    className="btn-primary"
                    onClick={ () => navigate( "/menu" ) }
                >
                    View Menu
                </button>
            </div>
        </div>
    );
};

export default Welcome;