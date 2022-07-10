import React, { Component } from 'react';
import { getData } from '../apollo/getData';
import { connect } from 'react-redux';
import { addProduct } from '../redux/actions';
import PageProducts from '../components/PageProducts';

class TechPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    async componentDidMount() {
        const data = (await getData()).tech;
        this.setState(prev => ({
            ...prev,
            products: data
        }))
    }

    render() {
        const { products } = this.state;
        const { addProd, currency } = this.props;
        return (
            <PageProducts
                title='Tech'
                position='between'
                products={products}
                addProd={addProd}
                currency={currency}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        currency: state.currency
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addProd: (product) => dispatch(addProduct(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TechPage);