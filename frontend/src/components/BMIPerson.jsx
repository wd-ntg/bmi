import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader";

import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import {
  makeUnauthenticatedGETRequestToken,
  makeUnauthenticatedPOSTRequestToken,
} from "../utils/serverHelpers";
import { authContext } from "../contexts/authContext";

import BMI from "../assets/img/BMI.png";

import Calender from "./Calender";

function BMIPerson({ currentUser }) {
  const [user, loading] = useAuthState(auth);

  const [displayCard, setDisplayCard] = useState([true, false, false, false]);

  const handleDisplayCard = (index) => {
    const updateDisplayCard = displayCard.map((state, i) => i === index);
    setDisplayCard(updateDisplayCard);
  };

  const [healthIndexInfo, setHealthIndexInfo] = useState(null);
  const [evaluateOpenAi, setEvaluateOpenAi] = useState(null);
  const [adviceOpenAi, setAdviceOpenAi] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingEvaluate, setIsLoadingEvaluate] = useState(true);
  const [isLoadingAdvice, setIsLoadingAdvice] = useState(true);

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

  const getEvaluateOpenAi = async () => {
    try {
      if (healthIndexInfo) {
        const response = await makeUnauthenticatedPOSTRequestToken(
          "/openai/evaluate",
          {
            height: healthIndexInfo[0]?.height,
            weight: healthIndexInfo[0]?.weight,
            BMI: healthIndexInfo[0]?.BMI,
          }
        );
        setEvaluateOpenAi(response);
        setIsLoadingEvaluate(false);
      }
    } catch (error) {
      console.error("Error fetching OpenAI info:", error);
      setIsLoadingEvaluate(false);
    }
  };

  const getAdviceOpenAi = async () => {
    try {
      if (healthIndexInfo) {
        const response = await makeUnauthenticatedPOSTRequestToken(
          "/openai/advice",
          {
            height: healthIndexInfo[0]?.height,
            weight: healthIndexInfo[0]?.weight,
            BMI: healthIndexInfo[0]?.BMI,
          }
        );
        setAdviceOpenAi(response);
        setIsLoadingAdvice(false);
      }
    } catch (error) {
      console.error("Error fetching OpenAI info:", error);
      setIsLoadingAdvice(false);
    }
  };

  return (
    <div className="flex  items-center justify-between flex-col">
      <div className="bg-green_light_none w-full px-80  h-[260px]">
        <nav className="flex items-center mt-20">
          <div className="">Trang chủ</div>
          <div className="text-xs font-semibold mx-2">
            <i class="fa-solid fa-chevron-right"></i>
          </div>
          <div>Thông tin</div>
          <div className="text-xs font-semibold mx-2">
            <i class="fa-solid fa-chevron-right"></i>
          </div>
          <div>Chế độ dinh dưỡng</div>
          <div className="text-xs font-semibold mx-2">
            <i class="fa-solid fa-chevron-right"></i>
          </div>
          <div>Lời khuyên</div>
          <div className="text-xs font-semibold mx-2">
            <i class="fa-solid fa-chevron-right"></i>
          </div>
        </nav>
        <main className="flexitems-center z-20 relative mt-8 translate-y-[-24px]">
          <div className="flex cursor-pointer">
            <div className=" font-semibold text-black text-6xl ">
              Cá nhân hóa
            </div>
            <div className="ml-1 text-[20px] text-slate-700 font-semibold">
              360
            </div>
          </div>
        </main>
        <footer className="translate-y-[-72px] translate-x-[-48px]">
          <div className="flex cursor-pointer">
            <div className=" font-semibold flex text text-9xl">
              <div className=" font-semibold text ">Cá nhân hóa</div>
              <div className="ml-1 text-[28px] text font-semibold">360</div>
            </div>
          </div>
        </footer>
      </div>
      <div className="flex w-full justify-between items-center px-80">
        <div className="w-1/2 translate-y-[48px] translate-x-[72px]">
          <div
            className="border cursor-pointer border-sky-500 w-24 h-24 rotate-45"
            onClick={(e) => {
              e.preventDefault();
              getInfoHealthIndex();
              handleDisplayCard(0);
            }}
          >
            <div className="rotate-[-45deg] cursor-pointer text-lg font-semibold translate-y-6">
              Thông tin
            </div>
          </div>
          <div
            className="border cursor-pointer border-sky-500 w-24 h-24 rotate-45 translate-x-[-94px]"
            onClick={(e) => {
              e.preventDefault();
              getEvaluateOpenAi();
              handleDisplayCard(1);
            }}
          >
            <div className="rotate-[-45deg] cursor-pointer text-lg font-semibold w-[156px] flex-col justify-center items-center text-center translate-x-[-36px] translate-y-4">
              <div>Chế độ</div>
              <div>dinh dưỡng</div>
            </div>
          </div>
          <div
            className="border cursor-pointer border-sky-500 w-24 h-24 rotate-45 translate-x-[94px] translate-y-[-94px]"
            onClick={(e) => {
              e.preventDefault();
              getAdviceOpenAi();
              handleDisplayCard(2);
            }}
          >
            <div className="rotate-[-45deg] cursor-pointer text-lg font-semibold translate-y-6">
              Lời khuyên
            </div>
          </div>
          <div
            className="border cursor-pointer border-sky-500 w-24 h-24 rotate-45 translate-x-[-4px] translate-y-[-104px]"
            onClick={(e) => {
              e.preventDefault();
              handleDisplayCard(3);
            }}
          >
            <div className="rotate-[-45deg] cursor-pointer text-lg font-semibold translate-y-5 text-center">
              Lịch trình bữa ăn
            </div>
          </div>
        </div>
        {displayCard[0] && (
          <div className="w-1/2 translate-x-12">
            {isLoading ? (
              <div className="w-full flex justify-center items-center">
                <HashLoader color="#36d7b7" loading={isLoading} />
              </div>
            ) : (
              <div>
                <div className="text-2xl font-semibold">Thông tin</div>
                <div className="w-80 bg-gradient-to-r from-green_light_none to-green_light h-[2px] mb-8 mt-2"></div>
                <div className="flex w-full">
                  <div className="relative flex justify-center items-center">
                    <div className="rounded-full z-20 relative">
                      <img
                        className="rounded-full w-20 h-20"
                        src={user?.photoURL}
                      />
                    </div>
                    <div className="rounded-full w-20 h-20 border-solid border-2 border-green_light_none translate-x-4 absolute top-[-2px]"></div>
                  </div>
                  <div className="pl-20">
                    <header className="mb-2 text-xl font-semibold">
                      {user?.displayName}
                    </header>
                    <main>
                      <div>
                        Chiều cao:{" "}
                        <span className="text-green_light_none">
                          {healthIndexInfo[0]?.height}
                        </span>
                        cm
                      </div>
                      <div>
                        Cân nặng:{" "}
                        <span className="text-green_light_none">
                          {healthIndexInfo[0]?.weight}
                        </span>
                        kg
                      </div>
                      <div>
                        BMI:{" "}
                        <span className="text-green_light_none">
                          {healthIndexInfo[0]?.BMI}
                        </span>
                      </div>
                    </main>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {displayCard[1] && (
          <div className="w-1/2 translate-x-12">
            {isLoadingEvaluate ? (
              <div className="w-full flex justify-center items-center">
                <HashLoader color="#36d7b7" loading={isLoadingEvaluate} />
              </div>
            ) : (
              <div className="py-4">
                <div className="text-2xl font-semibold">Chế độ dinh dưỡng</div>
                <div className="w-80 bg-gradient-to-r from-green_light_none to-green_light h-[2px] mb-8 mt-2"></div>
                <div className="flex w-full">
                  <div>{evaluateOpenAi}</div>
                </div>
              </div>
            )}
          </div>
        )}
        {displayCard[2] && (
          <div className="w-1/2 translate-x-12">
            {isLoadingAdvice ? (
              <div className="w-full flex justify-center items-center">
                <HashLoader color="#36d7b7" loading={isLoadingAdvice} />
              </div>
            ) : (
              <div className="py-4">
                <div className="text-2xl font-semibold">Lời khuyên</div>
                <div className="w-80 bg-gradient-to-r from-green_light_none to-green_light h-[2px] mb-8 mt-2"></div>
                <div className="flex w-full">
                  <div>{adviceOpenAi}</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {displayCard[3] && <Calender currentUser={currentUser}/>}
    </div>
  );
}

export default BMIPerson;
