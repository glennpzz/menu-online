interface Car {
    id: string;
    model: string;
    brand: string;
    color: string[];
    fuel: string;
    year: string;
    price: string;
    image_cover: string;
    description: string;
    plate_number: string;
    status: string;
    kilometer: string;
}

export default interface CatalogModel {
    brand: string;
    total: number;
    cars: Car[];
}