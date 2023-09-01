import React, {useState} from "react";

import BMI from "./BMI";

import Plant from "../assets/img/plant.png";

function BMIContent() {
  const [openBMI, setOpenBMI] = useState(false);

  return (
    <div className="px-80 py-12 text-white flex justify-center items-center relative">
      <div>
        <div className="text-2xl font-bold">Giới thiệu</div>
        <div className="w-[540px] h-[2px] bg-green_light_none"></div>
        <div className="py-6">Cập nhật trạng thái cơ thể của bạn?</div>
        <div className="w-[540px] modal_bg-dark rounded-md px-4 pt-2 justify-center flex flex-col">
          <div>
            Thực hiện tính toán chỉ số cơ thể của bạn thông qua máy tính BMI
          </div>
          <div className="py-4">
            Mọi liên hệ thông tin nếu bạn cần{" "}
            <span className="underline text-sky-700 hover:text-sky-500 cursor-pointer">
              trợ giúp
            </span>
          </div>
        </div>
        <div
          className="text-green_light_none text-xl cursor-pointer hover:underline mt-4"
          onClick={() => setOpenBMI(true)}
        >
          Start
        </div>
      </div>
      <div>
        <img className="w-60 ml-24 translate-y-20 plant" src={Plant} />
      </div>
      {openBMI && <BMI closeBMI={() => setOpenBMI(false)} />}
    </div>
  );
}

export default BMIContent;
