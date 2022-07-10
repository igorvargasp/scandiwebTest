import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import image from '../../assets/add.png';
import './style.sass';

export default class Card extends Component {
    render() {
        const {
            isOutOfStock, title, price, currency,
            mainImage, id, margin, product
        } = this.props;

        return (
            <Link to={`/product-details/${id}`}>
                <div className='card'
                    style={{ opacity: isOutOfStock ? 0.6 : 1, marginRight: margin ? "120px" : "0" }}
                >
                    <div className='outOfStock'>
                        <img
                            className='card__image'
                            src={mainImage}
                            alt='Card img'
                        />
                        {isOutOfStock && <p className='out'>OUT OF STOCK</p>}
                    </div>
                    <img
                        src={image}
                        alt='cart'
                        className={`${!isOutOfStock ? "show" : "hide"} add`}
                    // as we can't add product without attributes
                    // this should be a link to PDP page
                    />
                    <p className='card__header'>{title} {product.brand}</p>
                    <b className='card__price'>{currency}{price}</b>
                </div>
            </Link>
        )
    }
}