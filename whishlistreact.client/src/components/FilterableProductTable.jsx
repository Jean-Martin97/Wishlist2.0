import React from 'react';
import { ProductTable } from './ProductTable';
import { SearchBar } from './SearchBar';

export class FilterableProductTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeSort: 'Categorie'
        };
        this.handelActiveSortChange = this.handelActiveSortChange.bind(this);
    }

    handelActiveSortChange(activeSort) {
        this.setState({ activeSort });
    }

    render() {
        const { products } = this.props;
        return <React.Fragment>
            <SearchBar
                activeSort={this.state.activeSort}
                onActiveSortChange={this.handelActiveSortChange} />
            <ProductTable
                products={products}
                activeSort={this.state.activeSort} />
        </React.Fragment>;
    }
}
