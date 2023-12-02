import React from 'react'

export const ProductCard = ({product}) => {

    let tablink = product.link.split(" ");
    let tabElement = [];
    for (let i = 0; i < tablink.length; i++) {
        if (tablink[i].indexOf("https://") >= 0)
        {
            var url = new URL(tablink[i]);
            var domainName = url.host;
            tabElement.push(<a href={tablink[i]} target="_blank">{domainName}</a>);
        }
        else
            tabElement.push(tablink[i])
    }
    let tabFinal = [];
    for (let i = 0; i < tabElement.length; i++) {
        const element = tabElement[i];
        tabFinal[i * 2] = element;
        tabFinal[(i * 2) + 1] = " ";
    }

    let tabName = product.name.split(" ");
    for (let i = 0; i < tabName.length; i++) {
        if (tabName[i].indexOf("https://") >= 0)
        {
            var url = new URL(tabName[i]);
            var domainName = url.hostname;
            tabName[i] = <a href={tabName[i]} target="_blank">{domainName}</a>;
        }
    }
    let tabNameFinal = [];
    for (let i = 0; i < tabName.length; i++) {
        const element = tabName[i];
        tabNameFinal[i * 2] = element;
        tabNameFinal[(i * 2) + 1] = " ";
    }

    const starPercentage = (product.rate / 5) * 100;
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
  
    return (
        <div className="card" style={{ width: 18 + "rem" }}>
            <div style={{overflow: 'hidden', height: 200, width: '100%'}}>
                <img src={product.image} className="cardImage card-img-top" alt={product.name}/>
            </div>
            <div className="card-body">
                <h5 className="card-title">{tabNameFinal}</h5>
                <p className="card-text"><b>Categorie: </b>{product.category}</p>
                <p className="card-text"><b>Prix: </b>{product.price}</p>
                <div className="card-text"><b>Note: </b>
                    <div className="stars-outer">
                        <div className="stars-inner" style={{ width: starPercentageRounded }}></div>
                    </div>
                </div>
                {tabFinal && <p className="card-text"><b>Lien: </b>{tabFinal}</p>}
            </div>
        </div>
    )
}
