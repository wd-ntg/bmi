import React, { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import Navbar from "../components/Navbar";
import Crossbar from "../components/Crossbar";
import BMIContent from "../components/BMIContent";
import Footer from "../components/Footer";

function Home() {

  return (
    <div className="bg-black h-[180%]">
      <Navbar />
      <Crossbar />
      <BMIContent/>
      <Footer />
    </div>
  );
}

export default Home;
