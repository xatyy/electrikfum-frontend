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
        <div className=" slider transition-all ease-in">
            <Swiper
        effect="fade"
        spaceBetween={80}
        centeredSlides={true}
        autoplay={{
          delay: 15000,
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
        <SwiperSlide>
        <p className=" absolute top-4 lg:text-6xl px-4 mx-auto sm:px-6 lg:max-w-6xl lg:top-32 lg:px-[10rem] 2xl:px-[20rem]">ELF BAR CIGALIKE</p>
        <p className=" absolute top-8 lg:text-4xl px-4 mx-auto sm:px-6 lg:max-w-6xl lg:top-64 lg:px-[10rem] 2xl:px-[20rem]">DESIGN MINIMALISTIC</p>
<video loop  autoPlay muted playsInline>
      <source src="cigalike.mp4" type="video/mp4"/> </video>
        </SwiperSlide>
        <SwiperSlide>
        <p className=" absolute top-4 lg:text-6xl px-4 mx-auto sm:px-6 lg:max-w-6xl lg:top-32 lg:px-[10rem] 2xl:px-[20rem]">LOST MARY BM 600</p>
        <p className=" absolute top-8 lg:text-4xl px-4 mx-auto sm:px-6 lg:max-w-6xl lg:top-64 lg:px-[10rem] 2xl:px-[20rem]">ELEGANȚĂ ORIUNDE, ORICÂND</p>
<video loop  autoPlay muted playsInline>
      <source src="bm600.mp4" type="video/mp4"/> </video>
        </SwiperSlide>
        
      </Swiper>
        </div>
    )
}

export default Slider