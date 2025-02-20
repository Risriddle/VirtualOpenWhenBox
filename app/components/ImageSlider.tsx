

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

interface ImageSliderProps {
  images: string[]; // Ensure images is an array of strings (URLs)
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  return (
    <div className="relative w-full">
      <Swiper
        navigation
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={1}
        className="rounded-lg shadow-lg"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full h-auto object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider