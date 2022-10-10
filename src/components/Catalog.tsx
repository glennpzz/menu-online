import React from "react";
import { Link } from "react-router-dom";
import { slugify } from "../helper/others";
import CatalogModel from "../models/CatalogModel";

interface SectionProps {
    catalog : CatalogModel;
    key : string;
}

const Section = (props: SectionProps) => {
    return (
        <div className="d-flex flex-row w-100 justify-content-start flex-wrap" key={props.key}>
            <div className="d-flex flex-row w-100 align-items-center justify-content-between px-2 py-2">
                <h2 className="bodytext1 flex-fill color-black600 mb-0"><b>{props.catalog.brand.toString()}</b> ({parseInt(props.catalog.total.toString()) >= 100 ? '99+' : props.catalog.total})</h2>
                <Link to={`/search/${props.catalog.brand}`} className="bodytext2 color-green500 mb-0 text-decoration-none">Lihat lainnya</Link>
            </div>
            {props.catalog.cars.map((car, i) => 
                <Link className="product-items w-50 flex-column" to={`/mobil/${car.id}-${slugify(car.model)}`} key={`car-${car.id}`}>
                    <div className="product-cover mb-2" style={{backgroundImage: `url('${car.image_cover}')`}}></div>
                    <p className="bodytext1 color-black800 semibold m-0 px-2">{car.model}</p>
                    <p className="bodytext2 color-black300 m-0 px-2">{car.year} | {car.color.length > 0 ? `${car.color.length} Warna` : 'Tidak Ada Warna'}</p>
                    <p className="bodytext2 semibold color-green500 m-0 py-1 px-2">{car.price}</p>
                </Link>
            )}
        </div>
    );
}

interface Props {
    catalog : Array<CatalogModel>
}

const Catalogs = (props: Props) => {
    var catalogs : Array<CatalogModel> = props.catalog;
    catalogs = catalogs.sort((a,b) => b.cars.length - a.cars.length)
    return (
        <>
        {catalogs.map((data, index) => <Section catalog={data} key={`catalog-${index}`}/>)}
        </>
    )
}

export default Catalogs;