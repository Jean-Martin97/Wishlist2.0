import React from 'react';

export class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.handelActiveSortChange = this.handelActiveSortChange.bind(this);
    }

    handelActiveSortChange(e) {
        this.props.onActiveSortChange(e.target.value);
    }

    render() {
        const activeSort = this.props;
        return <div className="form-floating" style={{ margin: "25px" }}>
            <select defaultValue="Categorie" id="selectFilter" className="form-select" aria-label="Default select example" onChange={this.handelActiveSortChange}>
                <option value="Categorie">Catégorie</option>
                <option value="Nom">Nom</option>
                <option value="Prix-croissant">Prix croissant</option>
                <option value="Prix-decroissant">Prix décroissant</option>
                <option value="Rate">Note</option>
            </select>
            <label htmlFor="selectFilter">Trier par</label>
        </div>;
    }
}
