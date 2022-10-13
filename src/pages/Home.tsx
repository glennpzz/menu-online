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
import ProductDetailModel from "../models/ProductDetailModel";
import ImageSliderNav from "../components/ImageSliderNav";

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

    const productSample : ProductDetailModel = {
        id: 1,
        cover : [
            require('../assets/icons/product-placeholder.svg'),
            require('../assets/icons/product-placeholder.svg'),
            require('../assets/icons/product-placeholder.svg')
        ],
        nama : 'Memuat nama produk ...',
        harga : 'Memuat harga produk ...',
        deskripsi : 'Memuat deskripsi produk ...',
        badge : 'Memuat badge produk ...',
    }

    const [progress, setProgress] = useState(false);
    const [loading, setLoading] = useState(true);
    const [slugSelected, setSlugSelected] = useState('all');
    const [name, setName] = useState('Sawarga Digital Indonesia');
    const [address, setAddress] = useState('Jl. Angkrek No.53, Kotakaler, Kec. Sumedang Utara, Kabupaten Sumedang, Jawa Barat 45323');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState<CategoryModel[]>([]);
    const [product, setProduct] = useState<ProductModel[]>([]);
    const [productDetail, setProductDetail] = useState(productSample);
    const [productDetailFound, setProductDetailFound] = useState(false);

    const filterProduct = async (slug : string = 'all') => {
        setProduct([]);
        setLoading(true);
        if(slug === 'all'){
            getInformationData();
        }else{
            axios.get(`${dataproduct}/produk?kategori=${slug}`)
            .then(response => {
                let result = response.data;
                if(result.status){
                    setProduct(result.data);
                }
                console.log(result);
                setLoading(false);
            }).catch(error => {
                console.log(error);
                setLoading(false);
            });
        }
    }

    const selectCategory = (slug: string) => {
        setSlugSelected(slug)
        filterProduct(slug)
    };

    interface CategoryProps {
        category : CategoryModel
    }

    const CategoryItem = React.memo((data: CategoryProps) => {
        let icon = categories.filter((item) => item.slug === data.category.slug)[0].icon;
        return (
            <a onClick={() => selectCategory(data.category.slug)} className={`bodytext1 text-decoration-none brand-slide ${slugSelected === data.category.slug && 'active'}`} title="daftar-produk">
                <div className="brand-icon float-left mr-1" style={{backgroundImage : `url(${icon})`}}></div> {data.category.kategori}
            </a>
        )
    });

    const Category = () => {
        return (
            <div className="container-brand-text mt-3">
                {category.length > 0 && <CategoryItem category={
                    {slug: 'all', kategori:'Semua', icon: iconAll}
                } key={`all-category`}/>}
                {category.map((category, index) => <CategoryItem category={category} key={index}/>)}
            </div>
        )
    }

    interface ProductProps {
        product : ProductModel
    }

    const ProductContent = (data : ProductProps) => {
        return (
            <a onClick={() => getProductDetail(data.product.id)} data-toggle="modal" data-target="#ModalSlide" href="#" title={slugify(data.product.nama).toString()} className="product-items w-50 flex-column" key={data.product.nama}>
                {data.product.badge !== '' && data.product.badge !== undefined && <p className="caption m-0 text-product-badge">{data.product.badge}</p>}
                <div className="product-cover mb-2" style={{backgroundImage: `url(${data.product.cover})`}}></div>
                <p className="bodytext1 color-green900 max-line-2 semibold m-0">{data.product.nama}</p>
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
            setName(result.nama_resto);
            setAddress(result.alamat);
            setProduct(result.data_menu_all);
            setCategory(result.data_kategori);
            console.log(result);
            setLoading(false);
        }).catch(error => {
            console.log(error);
            setLoading(false);
        });
    }

    const getProductDetail = async (id : number) => {
        setProductDetailFound(false);
        setProgress(true);
        axios.get(`${dataproduct}/produk/detail?id=${id}`)
        .then(response => {
            let result = response.data;
            if(result.status){
                setProductDetail(result.data);
                setProductDetailFound(true);
            }else{
                setProductDetail(productSample);
                setProductDetailFound(false);
            }
            setProgress(false);
        }).catch(error => {
            setProductDetail(productSample);
            setProgress(false);
            setProductDetailFound(false);
        });
    }

    useEffect(() => {
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
                    <h1 className="headline6 text-white semibold p-0 m-0 max-line-2">
                        {name !== '' ? name : 'Nama Resto'}
                    </h1>
                    <p className="bodytext2 text-white p-0 m-0 max-line-2" id="dataName">
                        {address !== '' ? address : 'Jalan Kutamaya Kotakulon No 10 Sumedang Selatan, Sumedang'}
                    </p>
                </div>
            </div>

            <div className="section-product w-100">
                <div className="product-divider w-100"></div>
                <div className="container-category d-flex justify-content-start d-flex w-100 flex-wrap px-4 pt-4 pb-2">
                    <h1 className="headline5 color-green900 font-weight-bold p-0 m-0 w-100">
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
            
            {/* modal */}
            <div className="modal fade" id="ModalSlide" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-slideout col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12" role="document">
                    <div className="modal-content">
                        <div className="modal-header d-flex flex-wrap">
                            <h6 className="modal-title semibold headline6 color-black500" id="exampleModalLabel">Detail Menu</h6>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <i className="color-black500 fi fi-br-cross headline6"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            {progress && <Loading/>}
                            {!progress && !productDetailFound && <EmptyState title="Menu tidak ditemukan" desc="Menu yang kamu cari tidak ada"/>}
                            {!progress && productDetailFound && <>
                                {productDetail.cover.length > 0 && <ImageSliderNav cover={productDetail.cover}/>}
                                <p className="m-0 bodytext2 color-green500 mx-0 mt-4 pt-3 mb-0">
                                    {productDetail.badge}
                                </p>
                                <p className="m-0 headline5-5 color-green900 font-weight-bold m-0">
                                    {productDetail.nama}
                                </p>
                                <p className="m-0 bodytext1 color-green900 semibold m-0">
                                    {productDetail.harga}
                                </p>
                                <p className="m-0 bodytext1 color-green900 semibold m-0 pt-3">
                                    Deskripsi
                                </p>
                                <p className="m-0 caption color-green900 m-0 pt-1">
                                    {productDetail.deskripsi}
                                </p>
                            </>}
                            
                        </div>
                    </div>
                </div>
            </div>
            {/* modal */}
        </main>
    )
})

export default Home;