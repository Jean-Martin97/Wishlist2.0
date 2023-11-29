import React from 'react';
import { ProductRow } from './ProductRow';

export function ProductTable({ products, activeSort }) {
    const rows= [];
    let lastCategory = null;

    if (activeSort.indexOf("Categorie") >= 0) {
        console.log(products)
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
        rows.push(<ProductRow key={product.name} products={product} />);
    });

    return <table className="table">
        <thead className="main-thead">
            <tr>
                <th className="col-4" style={{ borderRadius: "15px 0 0 0", minWidth: "120px" }}>Catégorie</th>
                <th className="col-4" style={{ minWidth: "190px" }}>Nom</th>
                <th>Prix</th>
                <th className="col-5" style={{ minWidth: "185px" }}>Note</th>
                <th className="col-1" style={{ borderRadius: "0 15px 0 0", maxWidth: "90px" }}>link</th>
            </tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
    </table>;
}
