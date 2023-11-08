import React from "react";

function BlogContent() {
  return (
    <div>
      <div className="bg-green_light_none w-full px-80 py-20 h-[260px] flex">
        <div className="">
          <nav className="flex items-center">
            <div className="">Trang chủ</div>
            <div className="text-xs font-semibold mx-2">
              <i class="fa-solid fa-chevron-right"></i>
            </div>
            <div>Thông tin</div>
            <div className="text-xs font-semibold mx-2">
              <i class="fa-solid fa-chevron-right"></i>
            </div>
            <div>Blog</div>
          </nav>
          <main className=" z-20 relative mt-8 translate-y-[-24px]">
            <div className="flex cursor-pointer">
              <div className=" font-semibold text-black text-6xl ">Blog</div>
              <div className="ml-1 text-[20px] text-slate-700 font-semibold">
                360
              </div>
            </div>
          </main>
          <footer className="translate-y-[-72px] translate-x-[-48px]">
            <div className="flex cursor-pointer">
              <div className=" font-semibold flex text text-9xl">
                <div className=" font-semibold text w-[254px]">Blog</div>
                <div className="ml-1 text-[28px] text font-semibold">360</div>
              </div>
            </div>
          </footer>
        </div>
        {/* <div>
          <img src={AI} className="scale-125 translate-y-[-24px]" />
        </div> */}
      </div>
    </div>
  );
}

export default BlogContent;
