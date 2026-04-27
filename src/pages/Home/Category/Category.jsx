import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';


import slide1 from '../../../assets/assets/home/slide1.jpg'
import slide2 from '../../../assets/assets/home/slide2.jpg'
import slide3 from '../../../assets/assets/home/slide3.jpg'
import slide4 from '../../../assets/assets/home/slide4.jpg'
import slide5 from '../../../assets/assets/home/slide5.jpg'
import slide6 from '../../../assets/assets/home/slide6.jpg'
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const Category = () => {
    return (
    <section>

        <SectionTitle heading={'ORDER ONLINE'} subHeading={'--From 11:00am to 10:00pm--'}>
            
        </SectionTitle>
            <Swiper
        slidesPerView={4}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper mb-24 mt-6"

      >
    
        <SwiperSlide>
            <img src={slide1} alt=""  className="rounded-md"/>
            <h3 className='md:text-3xl text-xl uppercase text-center -mt-14 text-white shadow-md'><span className='md:text-4xl 2xl'>S</span>alad</h3>
        </SwiperSlide>

        <SwiperSlide>
            <img src={slide2} alt=""  className="rounded-md"/>
            <h3 className='md:text-3xl text-xl uppercase text-center -mt-14 text-white shadow-md'><span className='md:text-4xl 2xl'>P</span>izza</h3>
        </SwiperSlide>

        <SwiperSlide>
            <img src={slide3} alt=""  className="rounded-md"/>
            <h3 className='md:text-3xl text-xl uppercase text-center -mt-14 text-white shadow-md'><span className='md:text-4xl 2xl'>S</span>oup </h3>
        </SwiperSlide>

        <SwiperSlide>
            <img src={slide4} alt=""  className="rounded-md"/>
            <h3 className='md:text-3xl text-xl uppercase text-center -mt-14 text-white shadow-md'><span className='md:text-4xl 2xl'>D</span>essert </h3>
        </SwiperSlide>

        <SwiperSlide>
            <img src={slide5} alt=""  className="rounded-md"/>
            <h3 className='md:text-3xl text-xl uppercase text-center md:-mt-24 -mt-14 text-white shadow-md'><span className='md:text-4xl 2xl'>B</span>urger</h3>
        </SwiperSlide>

        <SwiperSlide>
            <img src={slide6} alt=""  className="rounded-md"/>
            <h3 className='md:text-3xl text-xl uppercase text-center -mt-14 text-white shadow-md'><span className='md:text-4xl 2xl'>F</span>rencg Fry</h3>
        </SwiperSlide>
    
      
      </Swiper>
    </section>
    );
};

export default Category;