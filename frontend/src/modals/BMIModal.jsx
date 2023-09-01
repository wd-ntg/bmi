import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../contexts/authContext";
import { makeUnauthenticatedGETRequestToken } from "../utils/serverHelpers";

function BMIModal({ closeModal }) {
  const { currentUser } = useContext(AuthContext);

  const [healthIndexInfo, setHealthIndexInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stateBMI, setStateBMI] = useState(null);

  const [tickState, setTickState] = useState([false, false, false, false]);

  const getInfoHealthIndex = async () => {
    try {
      if (currentUser) {
        const response = await makeUnauthenticatedGETRequestToken(
          `/healthindex/getinfo/${currentUser._id}`
        );
        setHealthIndexInfo(response);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching health index info:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInfoHealthIndex();
  }, [currentUser]);

  useEffect(() => {
    if (healthIndexInfo && healthIndexInfo[0]) {
      const BMI = healthIndexInfo[0].BMI;
      let bmiState = "";
      if (BMI <= 18.4) {
        bmiState = "Thiếu cân";
        setTickState((prevState) => {
          const newState = [...prevState];
          newState[0] = true;
          return newState;
        });
      } else if (BMI >= 18.5 && BMI <= 24.9) {
        bmiState = "Bình thường";
        setTickState((prevState) => {
          const newState = [...prevState];
          newState[1] = true;
          return newState;
        });
      } else if (BMI >= 25 && BMI <= 29.9) {
        bmiState = "Thừa cân";
        setTickState((prevState) => {
          const newState = [...prevState];
          newState[2] = true;
          return newState;
        });
      } else if (BMI >= 30) {
        bmiState = "Béo phì";
        setTickState((prevState) => {
          const newState = [...prevState];
          newState[3] = true;
          return newState;
        });
      }
      setStateBMI(bmiState);
    }
  }, [healthIndexInfo]);

  return (
    <div
      className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center flex modal_bg-dark"
      onClick={closeModal}
    >
      {isLoading ? (
        <div>Đang tải...</div>
      ) : (
        <div className="flex justify-center items-center px-4 py-4 rounded-md flex-col bg-black">
          <header className="font-thin">
            <div>
              Chiều cao của bạn:{" "}
              <span className="text-green-500">
                {healthIndexInfo[0]?.height}
              </span>
              cm, cân nặng:{" "}
              <span className="text-green-500">
                {healthIndexInfo[0]?.weight}
              </span>
              kg
            </div>
            <div>
              Chỉ số BMI của bạn là:{" "}
              <span className="text-green-500">{healthIndexInfo[0]?.BMI}</span>,
              trạng thái cơ thể:{" "}
              <span className="text-green-500">{stateBMI}</span>
            </div>
            <div>
              Cân nặng lý tưởng là:{" "}
              <span className="text-green-500">
                {(
                  (((healthIndexInfo[0]?.height / 100) *
                    healthIndexInfo[0]?.height) /
                    100) *
                  21.7
                ).toFixed(2)}
              </span>
              kg
            </div>
          </header>
          <main>
            <div className="flex modal_bg-light mt-8 justify-center py-2">
              <div className="flex flex-col items-center relative">
                <div className="font-semibold">Thiếu cân</div>
                <div className="w-[150px] h-[30px] bg-sky-500"></div>
                <div>{`<=18.4`}</div>
                {tickState[0] && (
                  <div className="absolute top-[36%]">
                    <iconify-icon icon="charm:tick-double"></iconify-icon>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center relative">
                <div className="font-semibold">Bình thường</div>
                <div className="w-[150px] h-[30px] bg-green-500"></div>
                <div>{`18.5 ~ 24.9`}</div>
                {tickState[1] && (
                  <div className="absolute top-[36%]">
                    <iconify-icon icon="charm:tick-double"></iconify-icon>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center relative">
                <div className="font-semibold">Thừa cân</div>
                <div className="w-[150px] h-[30px] bg-yellow-300"></div>
                <div>{`25 ~ 29.9`}</div>
                {tickState[2] && (
                  <div className="absolute top-[36%]">
                    <iconify-icon icon="charm:tick-double"></iconify-icon>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center relative">
                <div className="font-semibold">Béo phì</div>
                <div className="w-[150px] h-[30px] bg-amber-600"></div>
                <div>{`>=30`}</div>
                {tickState[3] && (
                  <div className="absolute top-[36%]">
                    <iconify-icon icon="charm:tick-double"></iconify-icon>
                  </div>
                )}
              </div>
            </div>
            <div className="max-w-[913px] text-center mt-8 font-thin italic">
              Lưu ý: Chỉ số BMI phù hợp với người từ 18 đến 65 tuổi, trừ trẻ em,
              thanh thiếu niên đang phát triển, phụ nữ mang thai, cho con bú,
              người già và những người có cơ bắp phát triển.
            </div>
            <div className="w-full mt-4 bg-gradient-to-r from-green_light_none to-green_light h-[2px] flex justify-center items-center"></div>
            <div>
              <div className="text-center my-4 font-thin py-2 outline-none">
                {" "}
                Chiều cao cân nặng chuẩn (chỉ mang tính chất tham khảo):
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="font-thin">
                  Giá trị trung tâm trọng lượng tiêu chuẩn:{" "}
                  <span className="text-pink-400 font-thin">
                    Chiều cao: {healthIndexInfo[0]?.height}cm, Cân nặng lý
                    tưởng:{" "}
                    {(
                      (((healthIndexInfo[0]?.height / 100) *
                        healthIndexInfo[0]?.height) /
                        100) *
                      21.7
                    ).toFixed(2)}
                    kg
                  </span>
                </div>
                <div className="font-thin">
                  Trọng lượng tiêu chuẩn giới hạn dưới:{" "}
                  <span className="text-pink-400 font-thin">
                    Chiều cao: {healthIndexInfo[0]?.height}cm, Cân nặng lý
                    tưởng:{" "}
                    {(
                      (((healthIndexInfo[0]?.height / 100) *
                        healthIndexInfo[0]?.height) /
                        100) *
                      18.5
                    ).toFixed(2)}
                    kg
                  </span>
                </div>
                <div className="font-thin">
                  Trọng lượng tiêu chuẩn giới hạn trên:{" "}
                  <span className="text-pink-400 font-thin">
                    Chiều cao: {healthIndexInfo[0]?.height}cm, Cân nặng lý
                    tưởng:{" "}
                    {(
                      (((healthIndexInfo[0]?.height / 100) *
                        healthIndexInfo[0]?.height) /
                        100) *
                      24.9
                    ).toFixed(2)}
                    kg
                  </span>
                </div>
                <div className="font-thin">
                  Nếu trọng lượng tương ứng không đổi thì giá trị tâm chiều cao
                  tiêu chuẩn:{" "}
                  <span className="text-pink-400 font-thin">
                    Chiều cao:{" "}
                    {(
                      Math.sqrt(healthIndexInfo[0]?.weight / 21.7) * 100
                    ).toFixed(2)}
                    cm, Cân nặng lý tưởng: {healthIndexInfo[0]?.weight}kg
                  </span>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

export default BMIModal;
