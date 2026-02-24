import React from 'react'
import img1 from "../../../../public/images/Image 2.webp"
import img2 from "../../../../public/images/image 1.webp"
import img3 from "../../../../public/images/image 3.webp"
import img4 from "../../../../public/images/Image 4.webp"
import Image from 'next/image';

import Myslider from './../../../components/my slider/my-slider';

export default function Mainslider() {
  return (
    <div className='container w-[80%] mx-auto'>
   <div className='flex'>
     <div className='w-3/4'>
    <Myslider imgList={[img1.src,img2.src,img3.src]}/>
    </div>
    <div className='w-1/4'>
    <Image src={img3} className='h-[150] object-cover' alt="" />
    <Image src={img2} className='h-[150] object-cover' alt="" />
    </div>
   </div>
    </div>
  )
}
