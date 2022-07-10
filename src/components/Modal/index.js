import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct, removeProduct } from '../../redux/actions';
import CartElement from "../Cart/CartElement";
import "./style.sass";

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalCount: 0
        }
    }

    checkout(products, currency) {
        let totalPrice = 0;
        let checkout_obj = [];
        if (products.length > 0) {
            products.map(el => {
                el.prices.map(price => {
                    if (currency === price.currency.symbol) {
                        totalPrice += price.amount * el.qtty;
                    }
                    return price
                })
                const { name, brand, qtty, sizes } = el;
                checkout_obj = [
                    ...checkout_obj,
                    {
                        name, brand, qtty, sizes
                    }
                ]
                return el;
            })
            totalPrice = totalPrice.toFixed(2);
            checkout_obj.push({ totalPrice, currency: this.props.currency })
        };
        return {
            checkout_obj,
            totalPrice
        }
    };

    productsCount(products) {
        let count = 0;
        products.map(product => count += product.qtty);
        return count;
    }


    render() {
        const { onClose, show, products, currency, onAdd, onRemove } = this.props;
        const { checkout_obj, totalPrice } = this.checkout(products, currency);
        const totalCount = this.productsCount(products);

        return (
            <div className="overlay" onClick={onClose} style={{ display: show ? "block" : "none" }}>
                <div className="modal" style={{ opacity: show ? 1 : 0 }}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h4 className="modal-title">My Bag</h4>
                            <span>, {totalCount} item{totalCount > 1 && 's'}</span>
                        </div>
                        <div className="modal-body">
                            {products && products.map(product => {
                                return (
                                    <CartElement
                                        small
                                        onAdd={onAdd}
                                        key={(Math.random() + 1).toString(36).substring(7)}
                                        product={product}
                                        currency={currency}
                                        onRemove={onRemove}
                                    />
                                )
                            })}
                        </div>
                        <div className="modal-footer">
                            <div className="text__wrapper">
                                <h4>Total:</h4>
                                <p>{currency} {totalPrice}</p>
                            </div>
                            <div className="btn__wrapper">
                                <Link to='/cart'>
                                    <button onClick={onClose} className="view__btn">
                                        view bag
                                    </button>
                                </Link>
                                <button onClick={() => {
                                    window.alert('see console for checkout');
                                    console.log("CHECKOUT", checkout_obj);
                                }} className="checkout__btn">
                                    checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        products: state.products,
        currency: state.currency
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAdd: (product) => dispatch(addProduct(product)),
        onRemove: (product) => dispatch(removeProduct(product))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);