
import React, { useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

interface ImageSliderProps {
  images: string[]; // Ensure images is an array of strings (URLs)
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const sliderRef = useRef<Slider | null>(null); // Ref to access the Slider instance

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Hide default arrows
    adaptiveHeight: true, // Adjust height according to the image height
  };

  return (
    <div className="relative w-full">
      {/* Slider component with a ref */}
      <Slider ref={sliderRef} {...settings}>
        {images.map((image, index) => (
          <div key={index} className="w-full relative">
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full h-auto object-cover rounded-lg shadow-lg transition-all duration-300 ease-in-out"
            />
          </div>
        ))}
      </Slider>

      {/* Custom left navigation button */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
        <button
          className="text-2xl text-white bg-[#3a2518] rounded-full p-4 hover:bg-[#2d1f14] transition-all duration-300 ease-in-out shadow-lg"
          onClick={() => sliderRef.current?.slickPrev()} // Trigger previous slide
        >
          ❮
        </button>
      </div>

      {/* Custom right navigation button */}
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
        <button
          className="text-2xl text-white bg-[#3a2518] rounded-full p-4 hover:bg-[#2d1f14] transition-all duration-300 ease-in-out shadow-lg"
          onClick={() => sliderRef.current?.slickNext()} // Trigger next slide
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
