import "./App.css";

import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Blog from "./pages/Blog";
import Personal from "./pages/Personal";
import ChatAI from "./pages/ChatAI";
import Dashboard from "./pages/Dashboard";

function App() {
  const [cookie, setCookie] = useCookies(["token"]);
  return (
    <BrowserRouter>
      {cookie.token ? (
        <Routes>
          <Route path="*" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/chatai" element={<ChatAI />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="*" element={<Navigate to="/login"/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
