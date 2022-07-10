import React, { Component } from 'react';

export default class CardsWrapper extends Component {
    setPosition(position) {
        let justifyContent = 'unset';

        if (position === 'around') {
            justifyContent = 'space-around'
        } if (position === 'between') {
            justifyContent = 'space-between';
        }

        return justifyContent;
    }

    render() {
        const justifyContent = this.setPosition(this.props.position);

        return (
            <div className='cardwrapper' style={{ justifyContent: justifyContent }}>
                {this.props.children}
            </div>
        )
    }
}