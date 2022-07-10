import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Nav extends Component {
    render() {
        return (
            <div className='links'>
                <div><NavLink to='/' className={({ isActive }) => isActive ? "active" : ""}>All</NavLink></div>
                <div><NavLink to='/tech' className={({ isActive }) => isActive ? "active" : ""}>Tech</NavLink></div>
                <div><NavLink to='/clothes' className={({ isActive }) => isActive ? "active" : ""}>Clothes</NavLink></div>
            </div>
        )
    }
}