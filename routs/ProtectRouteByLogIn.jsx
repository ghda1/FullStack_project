import React from "react";
import { Outlet } from "react-router-dom";
import Login from "../src/pages/Login";

function ProtectRouteByLogIn() {
  const userData = JSON.parse(localStorage.getItem("userData"));

  return <div> {userData && userData.isLogIn ? <Outlet /> : <Login />} </div>;
}

export default ProtectRouteByLogIn;
