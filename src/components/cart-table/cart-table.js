import React from 'react';
import {connect} from 'react-redux';
import {deleteFromCart, clearCart} from '../../actions';
import {Button} from 'reactstrap';
import WithRestoService from '../hoc';

import './cart-table.scss';

const CartTable = ({items, deleteFromCart, RestoService, clearCart}) => {
    if( items.length === 0){
        return (<div className="cart__title"> Ваша корзина пуста! </div>)
    }
    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {
                    items.map(item => {
                        const {title,price,url,id,qty} = item;
                        return (
                            <div key={id} className="cart__item">
                                <img className="cart__item-img" src={url} alt={title}></img>
                                <div className="cart__item-title">{title}</div>
                                <div className="cart__item-price">{price}$</div>
                                <div className="cart__item-price">&times;{qty}</div>
                                <div onClick={() => deleteFromCart(id)} className="cart__close">&times;</div>
                            </div>
                        )
                    })
                }                
            </div>
            <div className="text-center">
                <Button color="primary" size="lg" onClick={() => {RestoService.sendOrder(generateOrder(items))
                                                                    .then(res => {alert('Заказ отправлен!');
                                                                                  clearCart()}
                                                                    )
                                                                 }
                                                           }>
                    Отправить заказ
                </Button>
            </div>
        </>
    );
};

const generateOrder = (items) => {
    const newOrder = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            qty: item.qty
        }
    })
    return newOrder;
}

const mapStateToProps = ({items}) => {
    return {
        items
    }
};
const mapDispatchToProps = {
    deleteFromCart,
    clearCart
}

export default WithRestoService()(connect(mapStateToProps,mapDispatchToProps)(CartTable));