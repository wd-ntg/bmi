import React, { useContext, useEffect, useState } from "react";

import NotyModal from "../modals/NotyModal";
import BMIModal from "../modals/BMIModal";

import { makeUnauthenticatedPOSTRequestToken } from "../utils/serverHelpers";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const BMI = ({ closeBMI }) => {
  const { currentUser } = useContext(AuthContext);

  const [height, setHeigth] = useState("");
  const [weight, setWeight] = useState("");

  const [noty, setNoty] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const createHealthIndex = async () => {
    if (!height || !weight) {
      setNoty(true);
      setTimeout(() => {
        setNoty(false);
      }, 3000);
      return;
    } else {
      const response = await makeUnauthenticatedPOSTRequestToken(
        "/healthindex/create",
        {
          height: height,
          weight: weight,
          currentUser: currentUser,
        }
      );
      setNoty(false);
      setOpenModal(true);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="w-full rounded-md">
      <div className="flex justify-center items-center flex-col modal_bg mt-8 py-4 w-[120%] translate-x-[-10%] rounded-md">
        <header className="flex justify-center items-center relative w-full">
          <div>Máy tính chỉ số BMI</div>
          <div
            className="absolute right-4 top-[-12px] text-xl hover:text-red-400 cursor-pointer"
            onClick={closeBMI}
          >
            <iconify-icon icon="carbon:close-outline"></iconify-icon>
          </div>
        </header>
        <div className="text-center mt-8 font-thin text-sm">
          Vui lòng nhập số nguyên chiều cao (đơn vị tính bằng centimet), cân
          nặng (đơn vị tính bằng kilôgam), điền vào hộp văn bản tương ứng rồi
          nhấp vào nút {<span className="text-green-500">"TÍNH TOÁN"</span>} bên
          dưới để tính chỉ số sức khỏe cơ thể BMI Vậy là xong.
        </div>
        <main className="">
          <div className="flex justify-between mt-6">
            <div className="mx-2 flex justify-center items-center">
              <label className="font-semibold">Chiều cao</label>
              <input
                className="mx-2 text-black outline-none border-solid border-[1px] border-yellow-100 px-2 py-1 rounded-md"
                type="number"
                placeholder="Nhập chiều cao"
                value={height}
                onChange={(e) => setHeigth(e.target.value)}
              />
              <div className="font-thin">cm</div>
            </div>
            <div className="mx-2 flex justify-center items-center">
              <label className="font-semibold">Cân nặng</label>
              <input
                className="mx-2 text-black outline-none border-solid border-[1px] border-yellow-100 px-2 py-1 rounded-md"
                type="number"
                placeholder="Nhập cân nặng"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <div className="font-thin">kg</div>
            </div>
          </div>
          <div className="w-[520px] block m-auto mt-8">
            <div className="flex modal_bg-light mt-8 justify-center py-2">
              <div className="flex flex-col items-center relative">
                <div className="font-semibold text-sm mb-2">Thiếu cân</div>
                <div className="w-[120px] h-[25px] bg-sky-500"></div>
                <div className="text-sm mt-2">{`<=18.4`}</div>
              </div>
              <div className="flex flex-col items-center relative">
                <div className="font-semibold text-sm mb-2">Bình thường</div>
                <div className="w-[120px] h-[25px] bg-green-500"></div>
                <div className="text-sm mt-2">{`18.5 ~ 24.9`}</div>
              </div>
              <div className="flex flex-col items-center relative">
                <div className="font-semibold text-sm mb-2">Thừa cân</div>
                <div className="w-[120px] h-[25px] bg-yellow-300"></div>
                <div className="text-sm mt-2">{`25 ~ 29.9`}</div>
              </div>
              <div className="flex flex-col items-center relative">
                <div className="font-semibold text-sm mb-2">Béo phì</div>
                <div className="w-[120px] h-[25px] bg-amber-600"></div>
                <div className="text-sm mt-2">{`>=30`}</div>
              </div>
            </div>
          </div>
          <div className="text-center mt-8 font-thin text-sm">
            Lưu ý: Chỉ số BMI phù hợp với người từ 18 đến 65 tuổi, trừ trẻ em,
            thanh thiếu niên đang phát triển, phụ nữ mang thai, cho con bú,
            người già và những người có cơ bắp phát triển.
          </div>
        </main>
        <button
          className="border-solid border-[1px] border-emerald-500 bg-green-400 text-white px-2 py-1 rounded-lg mt-6 hover:bg-green-300"
          onClick={(e) => {
            e.preventDefault();
            createHealthIndex();
          }}
        >
          TÍNH TOÁN
        </button>
      </div>
      {openModal && <BMIModal closeModal={() => setOpenModal(false)} />}
      {noty && <NotyModal />}
    </div>
  );
};

export default BMI;
