import React, { ReactPropTypes, useEffect, useState } from 'react';
import './App.css';
import './model/Item'
import { FilterableProductTable } from './components/FilterableProductTable';

export default function App(){
    const [listProduct, setListProduct] = useState();

    async function populateItems() {
        const result = await fetch('item');
        const data = await result.json();
        setListProduct(data);
    }
    useEffect(() => {
        populateItems();
    }, [])

    return (
        <div>
            {listProduct === undefined ? <p>Loading data...</p> : 
            <FilterableProductTable products={listProduct}/>
            }
        </div>
    );
}