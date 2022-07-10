export const initialState = {
    products: [],
    currency: '$'
}

function checkParams(prevSizes, currentSizes) {
    let add = false;
    if (prevSizes.length === currentSizes.length) {
        prevSizes.map((size, index) => size.items.map((item, itemInd) => {
            if (item.value === currentSizes[index].items[itemInd].value) { // e.g XL === XL
                if (item.selected !== currentSizes[index].items[itemInd].selected) {
                    add = true;
                }
            } else {
                add = true;
            }
            return item;
        }))
    }
    else {
        add = true;
    }
    return add;
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            let newProd;
            const { product } = action.payload;
            let exist = state.products.filter(el => !checkParams(el.sizes, product.sizes));

            let add = true;
            state.products.map(prod => {
                if (!checkParams(product.sizes, prod.sizes)) {
                    prod.qtty += 1;
                    add = false;
                }
                return prod;
            })
            add ? newProd = [...state.products, product] : newProd = [...state.products];

            if (exist.length === 0) {
                newProd = [...state.products, product];
            }
            return {
                ...state,
                products: newProd
            };
        case 'REMOVE_PRODUCT':
            let newProduct;
            if (action.payload.product.qtty - 1 === 0) {
                if (window.confirm('Are you sure to remove cart item?')) {
                    newProduct = state.products.filter(prod => checkParams(prod.sizes, action.payload.product.sizes));
                } else {
                    newProduct = state.products.map(prod => {
                        if (!checkParams(prod.sizes, action.payload.product.sizes)) {
                            prod.qtty = 1;
                        }
                        return prod;
                    })
                }
            }
            if (action.payload.product.qtty > 1) {
                newProduct = state.products.map(prod => {
                    if (!checkParams(prod.sizes, action.payload.product.sizes)) {
                        prod.qtty--;
                    }
                    return prod;
                })
            }
            return {
                ...state,
                products: newProduct
            }
        case 'CHANGE_CURRENCY':
            return {
                ...state,
                currency: action.payload.symbol
            }
        default:
            return state;
    }
};