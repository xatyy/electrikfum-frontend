import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper";

const Slider = () => {


    return(
        <div classname="slider transition-all ease-in">
            <Swiper
        effect="fade"
        spaceBetween={80}
        centeredSlides={true}
        autoplay={{
          delay: 10500,
          disableOnInteraction: false,
        }}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide><p className=" absolute top-4 lg:text-6xl px-4 mx-auto sm:px-6 lg:max-w-6xl lg:top-32 lg:px-[10rem] 2xl:px-[20rem]">ELF BAR 600</p>
        <p className=" absolute top-8 lg:text-4xl px-4 mx-auto sm:px-6 lg:max-w-6xl lg:top-48 lg:px-[10rem] 2xl:px-[20rem]">BESTSELLER PUFF BAR</p>
        <p className=" absolute lg:text-2xl top-16 text-xs px-4 mx-auto text-medium sm:px-6 lg:max-w-6xl lg:top-64 lg:px-[10rem] 2xl:px-[20rem]">Aprox 600 puff-uri!</p><img className="" src="/img1.jpeg"/></SwiperSlide>
        <SwiperSlide><p className=" absolute text-lg top-10 lg:text-6xl px-4 mx-auto sm:px-6 lg:max-w-6xl lg:top-32 lg:px-[10rem] 2xl:px-[20rem]">Bine ai venit pe ELECTRIKFUM.ro</p><img classname="z-10 h-[64rem] w-auto"src="/wallpaper-min.jpeg"/></SwiperSlide>
      </Swiper>
        </div>
    )
}

export default Slider