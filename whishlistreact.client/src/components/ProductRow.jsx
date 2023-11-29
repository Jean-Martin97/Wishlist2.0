export function ProductRow({products}) {
    let tablink = products.link.split(" ");
    let tabElement = [];
    for (let i = 0; i < tablink.length; i++) {
        if (tablink[i].indexOf("https://") >= 0)
            tabElement.push(<a href={tablink[i]} target="_blank">{tablink[i]}</a>);
        else
            tabElement.push(tablink[i])
    }
    let tabFinal = [];
    for (let i = 0; i < tabElement.length; i++) {
        const element = tabElement[i];
        tabFinal[i * 2] = element;
        tabFinal[(i * 2) + 1] = " ";
    }

    let tabName = products.name.split(" ");
    for (let i = 0; i < tabName.length; i++) {
        if (tabName[i].indexOf("https://") >= 0)
            tabName[i] = <a href={tabName[i]} target="_blank">{tabName[i]}</a>;
    }
    let tabNameFinal = [];
    for (let i = 0; i < tabName.length; i++) {
        const element = tabName[i];
        tabNameFinal[i * 2] = element;
        tabNameFinal[(i * 2) + 1] = " ";
    }


    const starPercentage = (products.rate / 5) * 100;
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

    return <tr>
        <td>{products.category}</td>
        <td>{tabNameFinal}</td>
        <td>{products.price}</td>
        <td>
            <div className="stars-outer">
                <div className="stars-inner" style={{ width: starPercentageRounded }}></div>
            </div>
        </td>
        <td>{tabFinal}</td>
    </tr>;

}
