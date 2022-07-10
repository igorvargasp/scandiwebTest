import React, { Component } from 'react';
import Container from '../Container';
import PageHeader from '../PageHeader';
import CardsWrapper from '../Card/CardsWrapper';
import Card from '../Card';

export default class PageProducts extends Component {
    render() {
        const { addProd, currency, products, position, title } = this.props;
        return (
            <Container>
                <PageHeader>
                    {title}
                </PageHeader>

                <CardsWrapper position={position}>
                    {products.length > 0 && products.map((product, i) => {
                        const price = product.prices.filter(el => el.currency.symbol === currency);
                        return (
                            <Card
                                key={i}
                                id={product.id}
                                onAdd={addProd}
                                product={product}
                                title={product.name}
                                mainImage={product.gallery[0]}
                                price={price[0].amount}
                                currency={price[0].currency.symbol}
                                isOutOfStock={!product.inStock}
                            />
                        )
                    })}
                </CardsWrapper>
            </Container>
        )
    }
}