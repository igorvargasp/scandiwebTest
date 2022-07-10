import React, { Component } from 'react';
import './style.sass';

export default class PageHeader extends Component {
    render() {
        return (
            <h1 className='pageHeader'>{this.props.children}</h1>
        )
    }
}