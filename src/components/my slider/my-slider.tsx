"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';

 type SLiderProps ={
    imgList: string[],slidesPerView?:number
}

export default function Myslider(props:SLiderProps) {
    console.log(props)
  return (
 <Swiper
      spaceBetween={0}
      slidesPerView={props.slidesPerView }
      pagination={{clickable:true}}
      modules={[Autoplay,Pagination]}
      autoplay={{delay:2000}}
    >
  {props.imgList.map((src,ind)=>{
    return (
            <SwiperSlide key={ind}>
        <Image src={src} width={300} height={100} className='w-full h-75' alt="msk" />
      </SwiperSlide>
    
    )
  })}

    </Swiper>
  )
}
