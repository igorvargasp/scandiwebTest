import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import image from '../../assets/logo.svg';

export default class Logo extends Component {
    render() {
        return (
            <div className='logo'>
                <Link to='/'>
                    <img
                        src={image}
                        alt='Logo'
                    />
                </Link>
            </div>
        )
    }
}