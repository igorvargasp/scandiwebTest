import React, { Component } from 'react';
import CurrencyBlock from './CurrencyBlock';
import Logo from './Logo';
import Nav from './Nav';
import './style.sass';

export default class Header extends Component {
    render() {
        return (
            <div className='header'>
                <Nav />
                <Logo />
                <CurrencyBlock
                    show={this.props.show}
                    items={this.props.items}
                    changeCurrency={this.props.changeCurrency}
                />
            </div>
        )
    }
}