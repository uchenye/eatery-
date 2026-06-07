import React from "react";
import "../../styles/category.css";
const categories = [ "All", "Rice", "Swallow", "Grill", "Drinks" ];

const CategoryFilter = ( { active, setActive } ) =>
{
    return (
        <div className="categories">
            { categories.map( ( cat ) => (
                <button
                    key={ cat }
                    className={ active === cat ? "active" : "" }
                    onClick={ () => setActive( cat ) }
                >
                    { cat }
                </button>
            ) ) }
        </div>
    );
};

export default CategoryFilter;