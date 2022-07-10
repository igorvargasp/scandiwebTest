import React, { Component } from 'react';
import parse from 'html-react-parser';
import './style.sass';

export default class ProductDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sizes: [],
            currentImage: '',
            isDisabled: true
        };
    };

    componentDidUpdate(prevProps) {
        if (Object.keys(prevProps.product).length !== 0
            && this.state.isDisabled === true) {
            this.checkAttributes();
        }
        if (this.state.currentImage === '') {
            this.setState(prev => ({
                ...prev,
                currentImage: this.props.images[0],
                sizes: this.props.product.attributes
            }))
            return true;
        }
    }

    checkAttributes() {
        let sizes = this.state.sizes;
        const sizesLength = sizes.length;
        let selectedCount = 0;
        sizes.map(size => {
            return size.items.map(item => item.selected && ++selectedCount)
        });
        if (sizesLength === selectedCount) {
            this.setState(prev => ({
                ...prev,
                isDisabled: false
            }))
        }
    }

    setSize(name, size, product) {
        product.sizes.map(el => {
            el.items.map(item => {
                if (item.value === size && name === el.name) {
                    item.selected = true;
                }
                if (name === el.name && item.value !== size) {
                    item.selected = false;
                }
                return item;
            })
            return el;
        });
        this.checkAttributes();
        this.setState(prev => ({
            ...prev,
            sizes: product.sizes,
        }))
    }

    getFinalProduct(product, sizes) {
        const finalProduct = JSON.parse(JSON.stringify(product));

        if (!product.hasOwnProperty('qtty')) {
            finalProduct.qtty = 1;
        }

        if (!product.hasOwnProperty('sizes')) {
            finalProduct.sizes = sizes.length > 0 && sizes;
        };

        return finalProduct;
    }

    filterPrice(prices, currency) {
        return prices.filter(el => el.currency.symbol === currency)
    }

    makeStyle(name, value, selected) {
        return {
            backgroundColor: name === 'Color' && value,
            transform: name === 'Color' && selected && "scale(0.8)",
            width: name === 'Capacity' && '60px',
        }
    }

    render() {
        const { currentImage, sizes, isDisabled } = this.state;
        const { product, images, currency, onAdd } = this.props;

        const { prices, name, brand, description, inStock } = product;

        const price = prices && this.filterPrice(prices, currency);

        const finalProduct = this.getFinalProduct(product, sizes);

        return (
            <>
                {product && (
                    <div className='product product__wrapper'>
                        <div className='product__images-small'>
                            {images && images.map((image, i) => (
                                <img
                                    key={i}
                                    src={image}
                                    style={{ border: currentImage === image ? "1px solid black" : "none" }}
                                    onClick={() => this.setState((prev) => ({
                                        ...prev,
                                        currentImage: image
                                    }))}
                                    alt='Product img'
                                />
                            ))}
                        </div>
                        <div className='product__images-big'>
                            <img
                                src={currentImage}
                                alt='Product img'
                            />
                        </div>
                        <div className='product__block'>
                            <h2 className='product__header'>{name}</h2>
                            <p className='product__subheader'>{brand}</p>
                            <div className='product__sizes'>
                                <div className='product__sizesWrapper'>
                                    {sizes && sizes.length === 0 && <p className='without'>Without attributes</p>}
                                    {
                                        sizes.length > 0 &&
                                        sizes.map(size => {
                                            return (
                                                <div key={Math.random() * 12}>
                                                    <h3 style={{ fontSize: '20px', margin: '10px 0' }}>{size.name}:</h3>
                                                    <div className='sizes__wrapper'>
                                                        {size.items.map(item => (
                                                            <div
                                                                key={item.value}
                                                                style={this.makeStyle(size.name, item.value, item.selected)}
                                                                className={`product__size ${item.selected ? 'size' : ''}`}
                                                                onClick={() => this.setSize(size.name, item.value, product)}
                                                            >
                                                                {size.name !== 'Color' && item.value}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className='product__price'>
                                <p><b>PRICE:</b></p>
                                <span>{price && price[0].currency.symbol}{price && price[0].amount}</span>
                            </div>
                            <button
                                disabled={!inStock || isDisabled}
                                className={`product__btn ${isDisabled && 'bg-gray'}`}
                                onClick={() => onAdd(finalProduct)}
                            >
                                {!inStock ? 'OUT OF STOCK' : 'Add to cart'}
                            </button>
                            <div className='product__descr'>
                                {parse(`${description}`)}
                            </div>
                        </div>
                    </div>
                )}
            </>
        )
    }
}