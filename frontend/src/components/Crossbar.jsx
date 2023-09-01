import React from "react";
import SplideShow from "./SplideShow";

function Crossbar() {
  return (
    <div className="h-[260px] bg-green_light_none flex  items-center px-80 justify-between">
      <div>
        <div className="py-20">
          <nav className="flex items-center mt-20">
            <div className="">Trang chủ</div>
            <div className="text-xs font-semibold mx-2">
              <i class="fa-solid fa-chevron-right"></i>
            </div>
            <div>Máy tính BMI</div>
            <div className="text-xs font-semibold mx-2">
              <i class="fa-solid fa-chevron-right"></i>
            </div>
          </nav>
          <main className="flexitems-center z-20 relative mt-8 translate-y-[-24px]">
            <div className="flex cursor-pointer">
              <div className=" font-semibold text-black text-6xl ">
                BMI
              </div>
              <div className="ml-1 text-[20px] text-slate-700 font-semibold">
                360
              </div>
            </div>
          </main>
          <footer className="translate-y-[-72px] translate-x-[-48px]">
            <div className="flex cursor-pointer">
              <div className=" font-semibold flex text text-9xl">
                <div className=" font-semibold text ">BMI</div>
                <div className="ml-1 text-[28px] text font-semibold">360</div>
              </div>
            </div>
          </footer>
        </div>
      </div>
      <SplideShow />
    </div>
  );
}

export default Crossbar;
