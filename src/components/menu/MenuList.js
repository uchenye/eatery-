import React from "react";
import MenuCard from "./MenuCard";
import "../../styles/menuList.css";

const MenuList = ( { items, onAddToCart } ) =>
{
    return (
        <div className="menu-list">
            { items.map( ( item ) => (
                <MenuCard
                    key={ item.id }
                    item={ item }
                    onAdd={ onAddToCart }
                />
            ) ) }
        </div>
    );
};

export default MenuList;