import React from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

import '../assets/css/slide.css'


import Advice from '../assets/img/Adivce.png'
import BMI from '../assets/img/BMI.png'
import Person from '../assets/img/Person.png'
import Weight from '../assets/img/Weight.png'

function SplideShow() {
  const options = {
    type: "loop",
    gap: "1rem",
    autoplay: true,
    pauseOnHover: false,
    resetProgress: false,
    height: "15rem",
  };
  const images = [
    {
      src: Advice,
    },
    {
      src: BMI,
    },
    {
      src: Person,
    },
    {
      src: Weight,
    },
  ];

  return (
    <div className="translate-x-12">
      <Splide
        options={options}
        aria-labelledby="autoplay-example-heading"
        hasTrack={false}
      >
        <SplideTrack>
          {images.map((image, index) => (
            <SplideSlide key={index}>
              <img className=" rounded-md" src={image.src} alt="IMG" />
            </SplideSlide>
          ))}
        </SplideTrack>
      </Splide>
    </div>
  );
}

export default SplideShow;
