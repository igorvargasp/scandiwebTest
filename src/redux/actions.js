export const addProduct = (product, qtty = 0) => {
    return {
        type: 'ADD_PRODUCT',
        payload: { product, qtty }
    }
}

export const removeProduct = (product) => {
    return {
        type: 'REMOVE_PRODUCT',
        payload: { product }
    }
}

export const currencyChange = symbol => {
    return {
        type: 'CHANGE_CURRENCY',
        payload: { symbol }
    }
}