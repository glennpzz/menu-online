import React from "react";
import { Autoplay, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/swiper-bundle.css";
import BannerModel from "../models/BannerModel";

interface Props {
    banner : Array<BannerModel>
}
const ImageSlider = React.memo(({banner} : Props) => {   
    const openUrl = (url:String) => window.open(url.toString(), '_blank');
    return (
        <Swiper className="mySlider" id="mySlider"
            modules={[Scrollbar, Autoplay]}
            autoplay={{delay: 5000, disableOnInteraction: false}}
            spaceBetween={10}
            slidesPerView={1.5}
            centeredSlides={true}
            loop={true}
            loopedSlides={5}
            lazy={true}>
            {banner.map((item, index) => 
            <SwiperSlide key={index} onClick={() => openUrl(item.link.toString())}>
                <img src={item.image.toString()} alt={`banner-mosya-${index}`} title={`image-banner-mosya-${index}`}/>
            </SwiperSlide>
            )}
        </Swiper>
    )
})

export default ImageSlider;