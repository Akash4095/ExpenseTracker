import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/Pages/SignUp";
import WelcomePage from "./components/Pages/WelcomePage";
import Login from "./components/Pages/Login";
import Header from "./components/Layout/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<SignUp />} />
        <Route exact path="/welcome" element={<WelcomePage />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
