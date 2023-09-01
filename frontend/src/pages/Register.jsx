import React, { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

import LoginImg from "../assets/img/login.jpg";
import "../assets/css/main.css";

import Input from "../components/Input";
import { makeUnauthenticatedPOSTRequestToken } from "../utils/serverHelpers";
import { useCookies } from "react-cookie";

function Register() {
  const [cookie, setCookie] = useCookies(['token'])

  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [checkPassword, setCheckPassword] = useState(false);

  const googleProvider = new GoogleAuthProvider();

  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const response = await makeUnauthenticatedPOSTRequestToken(
        "/auth/register",
        {
          email: user.email,
          nameEmail: user.displayName,
        }
      );
      if (response) {
        const token = response.token;
        const date = new Date();
        date.setDate(date.getDate() + 30);
        setCookie("token", token, { path: "/", expires: date });
        navigate("/home");
      }
    } catch (error) {
      console.log("Login Failure: ", error);
    }
  };

  const Register = async () => {
    try {
      if (password != confirmPassword) {
        setCheckPassword(true);
        return;
      }
      const response = await makeUnauthenticatedPOSTRequestToken(
        "/auth/register",
        {
          userName: userName,
          password: password,
        }
      );
      if (response && !response.err) {
        const token = response.token;
        const date = new Date();
        date.setDate(date.getDate() + 30);
        setCookie("token", token, { path: "/", expires: date });
        alert("Success Register");
        navigate("/home");
      } else {
        alert("Failure Register");
      }
    } catch (error) {
      console.log("Register Failure: ", error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col pb-12">
      <div className="">
        <img className="w-[320px] h-[320px]" src={LoginImg} />
      </div>
      <div>
        <div
          className="flex justify-center items-center px-2 py-1 bg_fill rounded-lg hover:bg-slate-200 cursor-pointer"
          onClick={() => {
            GoogleLogin();
          }}
        >
          <div className="flex justify-center items-center text-2xl mr-2">
            <iconify-icon icon="flat-color-icons:google"></iconify-icon>
          </div>
          <div>Đăng ký với Google</div>
        </div>
        <div className="flex justify-center items-center px-2 py-1 bg_fill rounded-lg hover:bg-slate-200 cursor-pointer mt-4">
          <div className="flex justify-center items-center text-2xl mr-2">
            <iconify-icon icon="logos:facebook"></iconify-icon>
          </div>
          <div>Đăng ký với Facebook</div>
        </div>
        <Input
          placeholder="Nhập tên của bạn"
          label="Tên của bạn là gì?"
          type="email"
          value={userName}
          setValue={setUserName}
        />
        <Input
          placeholder="Mật khẩu"
          label="Tạo mật khẩu"
          type="password"
          value={password}
          setValue={setPassword}
        />
        <Input
          placeholder="Xác nhận mật khẩu"
          label="Xác nhận mật khẩu"
          type="password"
          value={checkPassword ? "" : confirmPassword}
          setValue={setConfirmPassword}
        />
      </div>
      {checkPassword && (
        <span className="text-red-400">Mật khẩu xác nhận không chính xác</span>
      )}
      <button
        className="mt-6 rounded-full bg-green_light px-2 py-1 text-white hover:text-slate-300"
        onClick={(e) => {
          e.preventDefault();
          Register();
        }}
      >
        Đăng ký
      </button>
    </div>
  );
}

export default Register;
