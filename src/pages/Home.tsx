import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios, {dataproduct} from '../helper/axios';
import { slugify } from "../helper/others";
import CategoryModel from "../models/CategoryModel";
import ProductModel from "../models/ProductModel";

import imgBackground from '../assets/images/bg.png';

const Home = React.memo(() => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState<CategoryModel[]>([]);
    const [product, setProduct] = useState<ProductModel[]>([]);

    interface CategoryProps{
        category: Array<CategoryModel>
    }
    const Category = (data : CategoryProps) => {
        return (
            <div className="container-brand-text">
                <Link to="/" className="bodytext2 text-decoration-none brand-slide active" title="daftar-produk">
                    Semua
                </Link>
                
                {data.category.map((item,index) => 
                    <Link to={'/menu/'+item.slug} title={`menu-${item.kategori}`} className="bodytext2 text-decoration-none flex-column brand-slide" key={item.slug}>
                        {item.kategori}
                    </Link>
                )}
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
                setCategory(result.data_kategori);
                
            } catch (error) {
                console.log(error);
            }
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        getData();
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
                    {category.length > 0 && <Category category={category}/>}
                </div>
                <div id="container-product" className="container-product d-flex justify-content-start d-flex w-100 flex-wrap px-2 py-2">
                    {product.length > 0 && product.map((product : ProductModel,index : number) => <ProductContent product={product} key={product.id}/>)}
                </div>
            </div>
            
        </main>
    )
})

export default Home;