import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { Link, useNavigate } from "react-router-dom";

import LoginImg from "../assets/img/login.jpg";
import "../assets/css/main.css";

import Input from "../components/Input";
import {
  makeUnauthenticatedPOSTRequest,
  makeUnauthenticatedPOSTRequestToken,
} from "../utils/serverHelpers";

function Login() {
  const navigate = useNavigate();

  const [cookie, setCookie] = useCookies(['token'])

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // Sign up with GG

  const googleProvider = new GoogleAuthProvider();

  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result) {
        const response = await makeUnauthenticatedPOSTRequest("/auth/login", {
          email: result.user.email,
          nameEmail: result.user.displayName,
        });
  
        if (response && !response.err) {
          const token = response.token;
          const date = new Date();
          date.setDate(date.getDate() + 30);
          setCookie("token", token, { path: "/", expires: date });
          navigate("/home");
        } else {
          alert("Failure");
        }
      }
    } catch (error) {
      console.log("Login Failure: ", error);
    }
  };

  // Sign up with Facebook
  const fbProvider = new FacebookAuthProvider();

  const FacebookProvider = async () => {
    try {
      const result = await signInWithPopup(auth, fbProvider);
      const credential = await FacebookAuthProvider.credentialFromResult(
        result
      );
      const token = credential.accessToken;
      let photoURL = result.user.photoURL + "?height=500&access_token=" + token;
      await updateProfile(auth.currentUser, { photoURL: photoURL });
      navigate("/home");
    } catch (error) {
      console.log("Login with Facebook Failure: ", error);
    }
  };

  const Login = async () => {
    try {
      const response = await makeUnauthenticatedPOSTRequest("/auth/login", {
        userName: userName,
        password: password,
      });

      if (response && !response.err) {
        const token = response.token;
        const date = new Date();
        date.setDate(date.getDate() + 30);
        setCookie("token", token, { path: "/", expires: date });
        navigate("/home");
      } else {
        alert("Failure");
      }
    } catch (error) {
      console.log("Login Failure: ", error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
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
          <div>Đăng nhập với Google</div>
        </div>
        <div className="flex justify-center items-center px-2 py-1 bg_fill rounded-lg hover:bg-slate-200 cursor-pointer mt-4">
          <div className="flex justify-center items-center text-2xl mr-2">
            <iconify-icon icon="logos:facebook"></iconify-icon>
          </div>
          <div>Đăng nhập với Facebook</div>
        </div>
        <Input
          placeholder="Tên người dùng"
          label="Tên người dùng"
          type="text"
          value={userName}
          setValue={setUserName}
        />
        <Input
          placeholder="Mật khẩu"
          label="Mật khẩu"
          type="password"
          value={password}
          setValue={setPassword}
        />
      </div>
      <button
        className="mt-8 rounded-full bg-green_light px-2 py-1 text-white hover:text-slate-300"
        onClick={(e) => {
          e.preventDefault();
          Login();
        }}
      >
        Đăng nhập
      </button>
    </div>
  );
}

export default Login;
