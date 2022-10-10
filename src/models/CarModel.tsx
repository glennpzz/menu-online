interface Payments {
    id : string;
    label : string;
    dp : string;
    cicilan : string
}

export default interface CarModel {
    id : string;
    model : string;
    brand : string;
    color : string;
    fuel : string;
    year : string;
    price : string;
    image_cover : string;
    description : string;
    plat_number: string;
    status : string;
    banner : string[];
    kilometer : string;
    payments : Payments[];
}