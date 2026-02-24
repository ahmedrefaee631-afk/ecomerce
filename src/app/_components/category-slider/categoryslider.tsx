import getallcategories from '@/app/api/getallcategories'
import Myslider from '@/components/my slider/my-slider'
import React from 'react'

export default async function categoryslider() {
 const data = await getallcategories();
 console.log(data)  
 const dataImgs = data.map((categ)=>categ.image)
    
 
 console.log(dataImgs);
  return (
    <div className='w-[80%] mx-auto my-10'>
      <Myslider imgList={dataImgs} slidesPerView={7}/>
    </div>
   )
}

