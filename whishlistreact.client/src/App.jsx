import React, { ReactPropTypes, useEffect, useState } from 'react';
import './App.css';
import './model/Item'
import { FilterableProductTable } from './components/FilterableProductTable';

const PRODUCTS = [
    {category: "Photographie", price: "400 €", name: "Objectif Nikkor 85mm", rate: 4.8, link: "https://www.kamera-express.be/fr/nikon-af-s-85mm-f-1-8g-occasion-12428113"},
    {category: "Photographie", price: "215 €", name: "Objectif Nikkor 50mm", rate: 4.5, link: "https://www.amazon.fr/dp/B004Y1AYAC/ref=asc_df_B004Y1AYAC1639512000000/?tag=ledenicheur-amazon-fr-21&creative=22686&creativeASIN=B004Y1AYAC&linkCode=df0&smid=A1X6FK5RDHNB96&th=1"},
    {category: "Photographie", price: "155 €", name: "Objectif Nikkor 35mm", rate: 4.3, link: "https://www.vandenborre.be/fr/objectif-pour-appareil-photo-reflex-hybride/nikon-af-s-dx-nikkor-35mm-f-1-8g?gclid=Cj0KCQiA1sucBhDgARIsAFoytUsbU_atTsx4FbX4u-gkD4oA-1ZHYC7rv8N68dhcSByzHXNLnwPI8u0aAtPvEALw_wcB"},
    {category: "Photographie", price: "130 €", name: "Flash pour appareil photo millieu de gamme", rate: 4.5, link: "https://www.photogalerie.com/flash-speedlite-yongnuo-yn-568ex-iii-pour-nikon?gclid=CjwKCAjwoP6LBhBlEiwAvCcthBMBmEE3jH5iKWEGHmToAoww86tWUCJTp2EOvifsz3TqQ-3lTZ9n4xoCcvIQAvD_BwE"},
    {category: "Photographie", price: "40 €", name: "Flash pour appareil photo bas de gamme", rate: 4.2, link: "https://www.amazon.fr/Neewer®-Speedlite-Affichage-Numérique-Standard/dp/B010XCEABO/ref=as_li_ss_tl?__mk_fr_FR=ÅMÅŽÕÑ&keywords=flash+neewer&qid=1581247623&s=electronics&sr=1-12&linkCode=sl1&tag=httpprogresen-21&linkId=88359fb94ba6e30b2eac540cd99512d4&language=fr_FR"},
    {category: "Photographie", price: "30 € 70 €", name: "Filtres 67mm ou 52mm (si objecif 35mm) ou 58mm (si objectif 50mm)", rate: 3, link: "https://coolblue.be ou https://amazon.fr"},
    {category: "Alcool", price: "50 €", name: "Rhum Diplomatico", rate: 4, link: "Luxembourg moins cher"},
    {category: "Alcool", price: "10 à 50 €", name: "Vin rouge", rate: 3, link: "Cellier"},
    {category: "Alcool", price: "15 à 40 €", name: "Verre à bière/rhum", rate: 4, link: "https://amazon.fr ou Andrien"},
    {category: "Décoration", price: "30 €", name: "Déco mural avec une photo que j'ai réalisé", rate: 4.6, link: "https://www.myposter.be/fr/"},
    {category: "Décoration", price: "20 à 100 €", name: "Figurine d'un animé (liste: https://www.listy.fr/l/73342/kbkg7g )", rate: 4.1, link: "https://amazon.fr ou https://mangahako.com"},
    {category: "Décoration", price: "40 €", name: "Cadre displate (liste: https://www.listy.fr/l/73753/75zjcs )", rate: 4.6, link: "https://displate.com"},
    {category: "Habits", price: "50 à 110 €", name: "Chaussures (liste: https://www.listy.fr/l/75491/eo4y8w )", rate: 4, link: ""},
    {category: "Habits", price: "10 à 30 €", name: "Short et t-shirt de sport", rate: 3.8, link: ""},
    {category: "Activités", price: "25 à 50 €", name: "Karting entre amis", rate: 4.55, link: "Eupen"},
    {category: "Autres", price: "7 €", name: "Manga (liste: https://www.listy.fr/l/73338/peinrr )", rate: 4.7, link: "https://www.fnac.be ; Club ; La traversée BD et manga (vervier)"},
    {category: "Autres", price: "10 à 30 €", name: "Jeu de société", rate: 3.78, link: ""},
    {category: "Autres", price: "10 à 30 €", name: "Casse tête en bois", rate: 3, link: ""},
    {category: "Autres", price:"34€", name: "Coque de téléphone", rate: 4.5, link: "https://rhinoshield.fr/collections/artist-one-piece?device=samsung-galaxy-s22&type=solidsuit-android&page=0&limit=12&dcolor=Black&bcolor=black&prod=samsung-galaxy-s22-solidsuit-android-om74"},

];

export default function App(){

    return (
        <div>
            <FilterableProductTable products={PRODUCTS}/>
        </div>
    );
}