import React from 'react';
import {Link} from 'react-router-dom';
import './menu-list-item.scss';

const MenuListItem = ({menuItem, onAddToCart}) => {
    const {title, url, category, price} = menuItem;
    return (
        <li className="menu__item">
            <Link to={`/${menuItem.id}`}>
                <div className="menu__title">{title}</div>
            </Link>    
            <img className="menu__img" src={url} alt={title}></img>
            <img src={process.env.PUBLIC_URL+"/"+category+".svg"} width="70" height="70" alt={category} align="right"></img>
            <div className="menu__category">Category: <span>{category}</span></div>           
            <div className="menu__price">Price: <span>{price}$</span></div>
            <button onClick={() => onAddToCart()} className="menu__btn">Add to cart</button>            
        </li>
    )
}

export default MenuListItem;