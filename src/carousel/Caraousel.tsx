import React, { useState } from 'react';
import image1 from '../assets/pexels-photography-maghradze-ph-1659410-18517559.jpg'
import image2 from '../assets/pexels-barbara-sandiford-1626307-4119625.jpg'
import image3 from '../assets/pexels-brent-keane-181485-1702374.jpg'
import image4 from '../assets/pexels-rocsana99-948185.jpg'
import image5 from '../assets/pexels-secret-garden-333350-931162.jpg'

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    image1,
    image2,
    image3,
    image4,
    image5
  ];

  const prevSlide = () => {
    const newSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };

  const nextSlide = () => {
    const newSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  const goToSlide = (index:number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-full" data-carousel="slide">
      <div className="relative h-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition duration-700 ease-in-out transform ${index === currentSlide ? 'translate-x-0' : 'translate-x-full'} ${index < currentSlide ? '-translate-x-full' : ''}`}
            data-carousel-item
          >
            <img
              src={slide}
              className="absolute inset-0 w-full h-full object-cover"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
        onClick={prevSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
        onClick={nextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Carousel;
