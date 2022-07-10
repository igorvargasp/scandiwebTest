import React, { Component } from 'react';
import image from '../../assets/cart.svg';
import Select from './Select';

export default class CurrencyBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: '$'
        };
    }

    shouldComponentUpdate(props, nextState) {
        return nextState.selectedValue !== this.state.selectedValue
            || props.items !== this.props.items;
    }


    render() {
        const { items, changeCurrency } = this.props;
        return (
            <div className='currency'>
                <div className='currency__block'>
                    <Select changeCurrency={changeCurrency} />
                </div>
                <div className='currency__numbers' onClick={this.props.show}>
                    <span className='number'>{items}</span>
                    <img
                        src={image}
                        alt='cart'
                    />
                </div>
            </div>
        )
    }
}