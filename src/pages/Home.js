import React from "react";
import { useNavigate } from "react-router-dom";
import { menuData } from "../data/menuData";
import MenuCard from "../components/menu/MenuCard";
import "../styles/home.css";
import { useCart } from "../context/CartContext";

export default function Home ()
{
    const navigate = useNavigate();
    const { cartCount } = useCart();

    const featuredMeals = menuData.slice( 0, 10 );

    return (
        <div className="home">
            {
                cartCount > 0 && (
                    <button
                        className="floating-checkout"
                        onClick={ () => navigate( "/cart" ) }
                    >
                        🛒 Proceed to Checkout ({ cartCount })
                    </button>
                )
            }
            {/* FEATURED */ }
            <section className="featured">
                <h2>Popular Meals</h2>

                <div className="meal-scroll ">
                    { featuredMeals.map( ( meal ) => (
                        < MenuCard key={ meal.id } item={ meal } />
                    ) ) }
                </div>
            </section>

            {/* HOW */ }
            <section className="how">
                <h2>How It Works</h2>

                <div className="steps">
                    <div className="step">
                        <span>1</span>
                        <p>Choose your food</p>
                    </div>

                    <div className="step">
                        <span>2</span>
                        <p>Place your order</p>
                    </div>

                    <div className="step">
                        <span>3</span>
                        <p>Pick up at restaurant</p>
                    </div>
                </div>
            </section>

            < section className="homepage-btn">
                <button onClick={ () => navigate( "/menu" ) } className="btn btn-primary">
                    View Menu
                </button>
            </section>

            {/* TRUST */ }
            <section className="trust">
                <p>📍 Located in SRS junction, Northbank </p>
                <p>⚡ Fast preparation</p>
                <p>🚫 No waiting time</p>
            </section>
        </div >
    );
}