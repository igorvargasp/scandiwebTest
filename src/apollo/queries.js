import { gql } from "@apollo/client";

export const ALL_PRODUCTS = gql`
    query {
        category {
            products {
                id
                name
                inStock
                category
                brand
                gallery
                description
                attributes {
                    name
                    type
                    items {
                        value
                    }
                }
                prices {
                    currency {
                        label
                        symbol
                    }
                    amount
                }
            }
        }
    }
`