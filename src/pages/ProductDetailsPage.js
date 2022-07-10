import React, { Component } from 'react';
import ProductDetail from '../components/ProductDetail';
import { getData } from '../apollo/getData';
import { withRouter } from '../utils/withRouter';
import { connect } from 'react-redux';
import { addProduct } from '../redux/actions';

class ProductDetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            sizes: []
        }
    }

    async componentDidMount() {
        const { id } = this.props.params;
        let prod = (await getData()).products.filter(el => {
            return el.id === id
        });
        this.setState(prev => ({
            ...prev,
            product: prod[0]
        }))
    }

    render() {
        const { product } = this.state;
        const { currency, addProd } = this.props;
        return product && (
            <ProductDetail
                onAdd={addProd}
                product={product}
                currency={currency}
                images={product.gallery}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductDetailsPage));