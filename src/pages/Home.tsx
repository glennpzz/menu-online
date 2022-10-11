import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios, {dataproduct} from '../helper/axios';
import { slugify } from "../helper/others";
import CategoryModel from "../models/CategoryModel";
import ProductModel from "../models/ProductModel";

import imgBackground from '../assets/images/bg.png';
import iconSalad from '../assets/icons/salad.svg';
import iconAll from '../assets/icons/all.svg';
import iconAppetizer from '../assets/icons/appetizer.svg';
import iconCoffee from '../assets/icons/coffee.svg';
import iconDessert from '../assets/icons/dessert.svg';
import iconDrink from '../assets/icons/drink.svg';
import iconMainCourse from '../assets/icons/main-course.svg';
import iconSoup from '../assets/icons/soup.svg';
import iconJuice from '../assets/icons/juice.svg';
import iconMilkshake from '../assets/icons/milkshake.svg';
import iconSnack from '../assets/icons/snack.svg';

const Home = React.memo(() => {
    const [slugSelected, setSlugSelected] = useState('all');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState<CategoryModel[]>([]);
    const [product, setProduct] = useState<ProductModel[]>([]);

    const selectCategory = (slug: string) => setSlugSelected(slug);

    const categories : Array<CategoryModel> = [
        {slug: 'all', kategori:'Semua', icon: iconAll},
        {slug: 'appetizer',kategori:'Appetizer', icon: iconAppetizer},
        {slug: 'coffee', kategori:'Coffee',icon: iconCoffee},
        {slug: 'dessert',kategori:'Dessert', icon: iconDessert},
        {slug: 'drink',kategori:'Drink', icon: iconDrink},
        {slug: 'main-course',kategori:'Main Course', icon: iconMainCourse},
        {slug: 'salad',kategori:'Salad', icon: iconSalad},
        {slug: 'soup',kategori:'Soup', icon: iconSoup},
        {slug: 'juice',kategori:'Juice', icon: iconJuice},
        {slug: 'milkshake', kategori:'Milkshake',icon: iconMilkshake},
        {slug: 'snack',kategori:'Snack', icon: iconSnack},
    ]

    interface CategoryProps {
        category : CategoryModel
    }

    const CategoryItem = React.memo((data: CategoryProps) => {
        return (
            <a onClick={() => selectCategory(data.category.slug)} className={`bodytext1 text-decoration-none brand-slide ${slugSelected === data.category.slug && 'active'}`} title="daftar-produk">
                <div className="brand-icon float-left mr-1" style={{backgroundImage : `url(${data.category.icon})`}}></div> {data.category.kategori}
            </a>
        )
    });

    const Category = () => {
        return (
            <div className="container-brand-text mt-3">
                {category.map((category, index) => <CategoryItem category={category} key={index}/>)}
            </div>
        )
    }

    interface ProductProps {
        product : ProductModel
    }
    const ProductContent = (data : ProductProps) => {
        return (
            <Link to={`/product/${data.product.id}`} title={slugify(data.product.name).toString()} className="product-items w-50 flex-column" key={data.product.id}>
                <div className="product-cover mb-2" style={{backgroundImage: `url(${data.product.cover})`}}></div>
                <p className="bodytext1 color-black800 semibold m-0 px-2">{data.product.name}</p>
                <p className="bodytext2 color-black300 m-0 px-2">{data.product.description}</p>
                <p className="caption color-green500 m-0 py-1 px-2">{data.product.price}</p>
            </Link>
        );
    };

    const getData = async () => {
        axios.get(dataproduct)
        .then(response => {
            let result = response.data;
            console.log(result);
            
            try {
                setName(result.nama_resto);
                setAddress(result.alamat);
                setProduct(result.data_menu_all);
                
            } catch (error) {
                console.log(error);
            }
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        getData();
        setCategory(categories);
    }, []);


    return (
        <main role="main" className="container-fluid col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 pt-0 pl-0 pr-0">
            <div style={{backgroundImage : `url(${imgBackground})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right'}} className="container-user d-flex flex-row justify-content-between align-items-center px-3 py-3 background-green500">
                <Link className="content-image-profile flex-shrink" to="#" title="profile">
                    <div className="frame-image">
                        <img src={image !== '' ? image : 'https://s3-media0.fl.yelpcdn.com/bphoto/xkaL_zwC8TFAVkPr6Q25eg/348s.jpg'} alt="profile" id="dataImage" title="image-profile"/>
                    </div>
                </Link>

                <div className="content-text flex-column w-100">
                    <h1 className="headline6 text-white semibold p-0 m-0">
                        {name !== '' ? name : 'Nama Resto'}
                    </h1>
                    <p className="bodytext2 text-white p-0 m-0" id="dataName">
                        {address !== '' ? address : 'Jalan Kutamaya Kotakulon No 10 Sumedang Selatan, Sumedang'}
                    </p>
                </div>
            </div>

            <div className="section-product w-100">
                <div className="container-category d-flex justify-content-start d-flex w-100 flex-wrap px-4 py-4">
                    <h1 className="headline5 color-green900 font-weight-bold p-0 m-0">
                        Kategori Menu
                    </h1>
                    <p className="headline6 color-green900 px-0 m-0">Temukan menu favorit kamu di sini!</p>
                    {category.length > 0 && <Category/>}
                </div>
                <div id="container-product" className="container-product d-flex justify-content-start d-flex w-100 flex-wrap px-2 py-2">
                    {product.length > 0 && product.map((product : ProductModel,index : number) => <ProductContent product={product} key={product.id}/>)}
                </div>
            </div>
            
        </main>
    )
})

export default Home;