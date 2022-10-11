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
import Loading from "../components/Loading";
import defaultImageProfile from '../assets/icons/default-image-profile.svg';
import EmptyState from "../components/EmptyState";

const Home = React.memo(() => {
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

    const [loading, setLoading] = useState(true);
    const [slugSelected, setSlugSelected] = useState('all');
    const [name, setName] = useState('Loading nama toko ...');
    const [address, setAddress] = useState('Loading informasi alamat toko ...');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState<CategoryModel[]>(categories);
    const [product, setProduct] = useState<ProductModel[]>([]);

    const getProductData = async (slug : string = 'all') => {
        setProduct([]);
        setLoading(true);
        axios.get(`${dataproduct}/produk?kategori=${slug}`)
        .then(response => {
            let result = response.data;
            console.log(result);
            setLoading(false);
        }).catch(error => {
            console.log(error);
            setLoading(false);
        });
    }

    const selectCategory = (slug: string) => {
        setSlugSelected(slug)
        getProductData(slug)
    };

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
            <a onClick={() => {}} href="#" title={slugify(data.product.nama).toString()} className="product-items w-50 flex-column" key={data.product.nama}>
                <p className="caption m-0 text-product-badge">{data.product.badge}</p>
                <div className="product-cover mb-2" style={{backgroundImage: `url(${data.product.img_cover})`}}></div>
                <p className="bodytext1 color-green900 semibold m-0">{data.product.nama}</p>
                <p className="caption color-green800 max-line-2 mx-0 my-1">{data.product.deskripsi}</p>
                <p className="bodytext2 color-green900 font-weight-bold m-0">{data.product.harga}</p>
            </a>
        );
    };

    const getInformationData = async () => {
        setLoading(true);
        axios.get(dataproduct)
        .then(response => {
            let result = response.data;
            // setName(result.nama_resto);
            // setAddress(result.alamat);
            setProduct(result.data_menu_all);
            console.log(result);
            setLoading(false);
        }).catch(error => {
            console.log(error);
            setLoading(false);
        });
    }

    useEffect(() => {
        setCategory(categories);
        getInformationData();
    }, []);

    return (
        <main role="main" className="container-fluid col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 pt-0 pl-0 pr-0">
            <div style={{backgroundImage : `url(${imgBackground})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right'}} className="container-user d-flex flex-row justify-content-between align-items-center px-3 py-3 background-green500">
                <Link className="content-image-profile flex-shrink" to="#" title="profile">
                    <div className="frame-image">
                        <img src={image !== '' ? image : defaultImageProfile} alt="profile" id="dataImage" title="image-profile"/>
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
                <div className="product-divider w-100"></div>
                <div className="container-category d-flex justify-content-start d-flex w-100 flex-wrap px-4 pt-4 pb-2">
                    <h1 className="headline5 color-green900 font-weight-bold p-0 m-0">
                        Kategori Menu
                    </h1>
                    <p className="headline6 color-green900 px-0 m-0">Temukan menu favorit kamu di sini!</p>
                    {category.length > 0 && <Category/>}
                </div>
                {loading && <Loading/>}
                {!loading && product.length === 0 && <EmptyState/>}
                <div id="container-product" className="container-product d-flex justify-content-start d-flex w-100 flex-wrap px-3">
                    {!loading && product.length > 0 && product.map((product : ProductModel,index : number) => <ProductContent product={product} key={`product-${index}`}/>)}
                </div>
            </div>
            
        </main>
    )
})

export default Home;