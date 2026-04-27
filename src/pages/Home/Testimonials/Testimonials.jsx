import React, { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // fetch("reviews.json")

    fetch("http://localhost:5000/review")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);
  return (
    <div className="my-14">
      <SectionTitle
        subHeading={"---What Our Client Say---"}
        heading={"TESTIMONIALS"}
      ></SectionTitle>

      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {
        reviews.map((review) => (
          
          <SwiperSlide key={review._id}>

            <div className="md:m-24 m-20 flex flex-col items-center">

              <Rating style={{ maxWidth: 180 }} value={review.rating} readOnly />

              <p className="md:py-6">{review.details}</p>

              <h3 className="text-2xl text-orange-500 text-center">{review.name}</h3>
                
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
