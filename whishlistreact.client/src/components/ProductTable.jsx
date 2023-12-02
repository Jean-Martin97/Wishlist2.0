import React from 'react';
import { ProductRow } from './ProductRow';
import { ProductCard } from './ProductCard';

export function ProductTable({ products, activeSort }) {
    const rows= [];

    if (activeSort.indexOf("Categorie") >= 0) {
        const sorted = products.sort((a, b) => a.category.toLowerCase() > b.category.toLowerCase() ? 1 : -1
        );
        products = sorted;
    }

    if (activeSort.indexOf("Prix-croissant") >= 0) {
        const sorted = products.sort((a, b) => {
            let aPrice = a.price.split(" ");
            let bPrice = b.price.split(" ");
            return parseInt(aPrice[0]) > parseInt(bPrice[0]) ? 1 : -1;
        });
        products = sorted;
    }

    if (activeSort.indexOf("Prix-decroissant") >= 0) {
        const sorted = products.sort((a, b) => {
            let aPrice = a.price.split(" ");
            let bPrice = b.price.split(" ");
            return parseInt(aPrice[0]) < parseInt(bPrice[0]) ? 1 : -1;
        });
        products = sorted;
    }

    if (activeSort.indexOf("Rate") >= 0) {
        const sorted = products.sort((a, b) => a.rate < b.rate ? 1 : -1
        );
        products = sorted;
    }

    if (activeSort.indexOf("Nom") >= 0) {
        const sorted = products.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        );
        products = sorted;
    }

    products.forEach(product => {
        rows.push(<ProductCard key={product.name} product={product} />);
    });

    return (
        <div className="productTable">
            {rows}
        </div>
    )
}
