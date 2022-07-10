import React, { Component } from 'react';
import right from '../../assets/right.svg';
import left from '../../assets/left.svg';
import './style.sass';

export default class CartElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            currentImage: '',
            currentImageIndex: 0,
            sizes: [],
            qtty: 1
        };

        this.setSize = this.setSize.bind(this);
        this.counter = this.counter.bind(this);
        this.setCurrentImage = this.setCurrentImage.bind(this);
    }

    componentDidMount() {
        this.forceUpdate();
    }

    componentDidUpdate() {
        if (this.state.currentImage === '') {
            this.setState(prev => ({
                ...prev,
                qtty: this.props.product && this.props.product.qtty,
                images: this.props.product && this.props.product.gallery,
                currentImage: this.props.product && this.props.product.gallery[0],
                sizes: this.props.product && this.props.product.attributes
            }))
        }
        if (this.props.product) {
            if (this.props.product.qtty !== this.state.qtty) {
                this.setState(prev => ({
                    ...prev,
                    qtty: this.props.product.qtty,
                    sizes: this.props.product.sizes
                }))
            }
        }
    }

    counter(n) {
        if (n < 0) {
            return;
        }
        this.setState(prev => ({
            ...prev,
            qtty: n
        }))
    }

    setSize(name, size, sizes) {
        sizes.map(el => {
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

        this.setState(prev => ({
            ...prev,
            sizes: sizes
        }))
    }

    setCurrentImage(index) {
        const { images } = this.state;
        if (images.length > 0) {
            if (index < 0) {
                index = images.length - 1;
            }
            if (index > images.length - 1) {
                index = 0;
            }
            this.setState(prev => ({
                ...prev,
                currentImage: images[index],
                currentImageIndex: index
            }))
        }
    }

    getFinalProduct(product, sizes) {
        const finalProduct = JSON.parse(JSON.stringify(product));

        if (!product.hasOwnProperty('sizes')) {
            finalProduct.sizes = sizes;
        }

        return finalProduct;
    }

    makeStyle(name, small, selected, value) {
        return {
            backgroundColor: name === 'Color' && value,
            transform: name === 'Color' && selected && "scale(0.8)",
            width: name === 'Capacity' && !small && '60px',
            width: name === 'Capacity' && small && '50px'
        }
    }

    filterPrice(product, currency) {
        return product.prices.filter(el => el.currency.symbol === currency);
    }

    render() {
        const {
            currentImageIndex, sizes,
            currentImage, images, qtty
        } = this.state;
        const { small, product, currency, onAdd, onRemove } = this.props;
        const price = product && this.filterPrice(product, currency);

        const finalProduct = this.getFinalProduct(product, sizes)

        return (
            <>
                {!small && <hr className='line' />}
                {product && (<div className={`cart ${small && 'small'}`}>
                    <div className='cart__block1'>
                        <h3 className='cart__header'>{product.name}</h3>
                        <p className='cart__subheader'>{product.brand}</p>
                        <p className='cart__price'><b>{price[0].amount} {price[0].currency.symbol}</b></p>
                        <div >
                            {sizes.length === 0 && <p className='without'>Without attributes</p>}
                            {
                                sizes.length > 0 &&
                                sizes.map(attribute => {
                                    return (
                                        <div key={Math.random() * 12}>
                                            <h3 className='attribute'>{attribute.name !== 'Size' && attribute.name}</h3>
                                            <div className='sizes__wrapper'>
                                                {attribute.items.map(item => (
                                                    <div
                                                        key={item.value}
                                                        /*eslint no-dupe-keys: 0*/
                                                        style={this.makeStyle(attribute.name, small, item.selected, item.value)}
                                                        className={`product__size ${item.selected ? 'size' : ''}`}
                                                        onClick={() => this.setSize(attribute.name, item.value, sizes)}
                                                    >
                                                        {attribute.name !== 'Color' && item.value}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='cart__block2'>
                        <div className='counter'>
                            <div
                                className='product__size counter__item'
                                onClick={() => onAdd(finalProduct)}
                            >
                                &#43;
                            </div>
                            <p className='counter__number'>{qtty}</p>
                            <div
                                className={`product__size counter__item ${qtty === 0 && 'disabled'}`}
                                onClick={() => onRemove(finalProduct)}
                            >
                                &#45;
                            </div>
                        </div>
                        <div className='images'>
                            {
                                images.length > 1 && (
                                    <>
                                        <img
                                            className='left arrow'
                                            src={left.toString()}
                                            onClick={() => this.setCurrentImage(currentImageIndex - 1)}
                                            alt='left'
                                        />
                                        <img
                                            className='right arrow'
                                            src={right.toString()}
                                            onClick={() => this.setCurrentImage(currentImageIndex + 1)}
                                            alt='right'
                                        />
                                    </>
                                )
                            }
                            <img
                                className='item__image'
                                src={currentImage.toString()}
                                alt='cart item img'
                            />
                        </div>
                    </div>
                </div>
                )}
            </>
        )
    }
}