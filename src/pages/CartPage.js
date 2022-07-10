import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cart from '../components/Cart';
import CartElement from '../components/Cart/CartElement';
import { addProduct, removeProduct } from '../redux/actions';

class CartPage extends Component {
    render() {
        const { products, currency, onAdd, onRemove } = this.props;
        return (
            <Cart>
                {products.length === 0 && <p className='emptyCart'>Cart is empty</p>}
                {products.length > 0 && products.map(product => {
                    return (
                        <CartElement
                            key={(Math.random() + 1).toString(36).substring(7)}
                            onAdd={onAdd}
                            product={product}
                            currency={currency}
                            onRemove={onRemove}
                        />
                    )
                })}
            </Cart>
        )
    }
}

const mapStateToProps = state => {
    return {
        products: state.products,
        currency: state.currency
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAdd: (product, qtty = 0) => dispatch(addProduct(product, qtty)),
        onRemove: (product) => dispatch(removeProduct(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);