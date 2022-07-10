import { client } from "./client";
import { ALL_PRODUCTS } from './queries';

export const getData = async () => {
    let products, clothes, tech;
    await client
        .query({
            query: ALL_PRODUCTS
        })
        .then(({ data }) => {
            let finalData = JSON.parse(JSON.stringify(data));
            finalData = finalData.category.products.map(el => {
                el.attributes.map(attribute => {
                    attribute.items.map(item => {
                        item.selected = false;
                        return item;
                    })
                    return attribute;
                })
                el.sizes = el.attributes;
                return el;
            });
            products = finalData;
            clothes = finalData.filter(el => {
                return el.category === 'clothes'
            });
            tech = finalData.filter(el => {
                return el.category === 'tech'
            })
        })
    return {
        products,
        clothes,
        tech
    }
}