import React, {useEffect} from "react";
import { Autoplay, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/swiper-bundle.css";
import CarModel from "../models/CarModel";

interface Props {
    banner : Array<String>,
    car: CarModel
}

const ImageSliderNav = React.memo(({banner, car} : Props) => {
    const updatePosition = () => {
        try {
            const pagination = document.querySelector('.swiper-pagination') as HTMLElement;
            const container = document.getElementById('container-slide') as HTMLElement;
            container.appendChild(pagination);
            pagination.style.cssText = 'bottom:auto';
        } catch (error) {}
    }

    useEffect(() => {
        updatePosition();
    }, [updatePosition])

    return (
        <div className="container-slider" id="container-slide">
            <Swiper className="productSlider"
                modules={[Pagination, Scrollbar, Autoplay]}
                autoplay={{delay: 5000, disableOnInteraction: false}}
                spaceBetween={16}
                slidesPerView={'auto'}
                centeredSlides={false}
                pagination={{ clickable: true }}>
                {banner.map((item, index) => 
                <SwiperSlide key={index}>
                    <img src={item.toString()} alt={index === 0 ? car.model.toString() : `${car.model}-${index}`} title={`${car.model}-${index}`}/>
                </SwiperSlide>
                )}
            </Swiper>
        </div>
    )
})

export default ImageSliderNav;