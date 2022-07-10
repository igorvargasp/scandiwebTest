import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getData } from '../apollo/getData';
import { addProduct } from '../redux/actions';
import PageProducts from '../components/PageProducts';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    async componentDidMount() {
        const data = (await getData()).products;
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
                title='All'
                position='around'
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);