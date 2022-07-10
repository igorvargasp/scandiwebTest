import React, { Component } from "react";
import './style.sass';
import up from '../../../assets/up.svg';
import down from '../../../assets/down.svg';

const options = ["$ USD", "£ EUR", "¥ JPY", "₽ RUB", "A$ AUD"];

export default class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            selectedOption: "$",
            image: down
        };

        this.toggling = this.toggling.bind(this);
        this.onOptionClicked = this.onOptionClicked.bind(this);
    }

    toggling() {
        this.setState(prev => ({
            ...prev,
            isOpen: !this.state.isOpen,
            image: !this.state.isOpen ? up : down
        }));
    }

    onOptionClicked(value) {
        this.setState(prev => ({
            ...prev,
            isOpen: false,
            image: down,
            selectedOption: value
        }))
        this.props.changeCurrency(value.split(' ')[0]);
    };

    render() {
        return (
            <div className="Main">
                <div className="DropDownContainer">
                    <div className="DropDownHeader" onClick={this.toggling}>
                        {this.state.selectedOption || "$"}<img className="up" src={this.state.image} alt="arrow" />
                    </div>
                    {this.state.isOpen && (
                        <div className="DropDownListContainer">
                            <ul className="DropDownList">
                                {options.map(option => (
                                    <li className="ListItem"
                                        onClick={() => this.onOptionClicked(option)}
                                        key={(Math.random() + 1).toString(36).substring(7)}>
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div >
        );
    }
}