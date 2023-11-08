import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

import "../assets/css/main.css";

import { Link } from "react-router-dom";

export default function Navbar({ blog, personal, chatai }) {
  const navigate = useNavigate();

  const [openDetailModal, setOpenDetailModal] = useState(false);

  const [user, loading] = useAuthState(auth);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // window.location.reload();
  };

  return (
    <nav className="items-center flex justify-between z-20 px-8 py-3  bg-black">
      <Link to="/home">
        <div className="flex cursor-pointer">
          <div className=" font-semibold text-white text-xl ">BMI</div>
          <div className="ml-1 text-[10px] text-green_light_none  font-semibold">
            360
          </div>
        </div>
      </Link>
      <div className="flex items-center">
        <Link to="/blog">
          <div
            className={`font-semibold text-slate-300 mx-3 cursor-pointer hover:text-green_light_none ${
              blog ? "text-green_light_none" : ""
            }`}
          >
            Blog
          </div>
        </Link>
        <Link to="/personal">
          <div
            className={`font-semibold text-slate-300 ml-3 cursor-pointer hover:text-green_light_none ${
              personal ? "text-green_light_none" : ""
            }`}
          >
            Cá nhân
          </div>
        </Link>
        <Link to="/chatai">
          <div
            className={`font-semibold text-slate-300 mx-3 cursor-pointer hover:text-green_light_none ${
              chatai ? "text-green_light_none" : ""
            }`}
          >
            ChatAI
          </div>
        </Link>
      </div>
      {!user && (
        <div
          className="text-2xl ml-3 cursor-pointer text-slate-300 hover:text-green_light_none"
          onClick={() => {
            setOpenDetailModal(true);
          }}
        >
          <iconify-icon icon="basil:user-solid"></iconify-icon>
        </div>
      )}
      {user && (
        <div
          className="text-2xl ml-3 cursor-pointer hover:text-green_light_none"
          onClick={() => {
            setOpenDetailModal(true);
          }}
        >
          <img
            referrerPolicy="no-referrer"
            className="w-8 rounded-full"
            src={user.photoURL}
            alt=""
          />
        </div>
      )}
      {openDetailModal ? (
        <div
          className="absolute top-0 left-0 right-0 bottom-0"
          onClick={() => {
            setOpenDetailModal(false);
          }}
        >
          <div className="text-black modal_bg backdrop-opacity-10 px-5 py-2 rounded-md absolute top-8 right-[46px]">
            <Link to="/dashboard">
              <div className="cursor-pointer hover:text-gray-500 my-2">
                Tài khoản
              </div>
            </Link>

            <Link to="/">
              <div className="cursor-pointer hover:text-gray-500 my-2">
                Chia sẻ
              </div>
            </Link>
            <div
              className="cursor-pointer hover:text-gray-500 my-2"
              onClick={() => {
                auth.signOut();
                handleLogout()
                navigate("/login");
              }}
            >
              Đăng xuất
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
}
