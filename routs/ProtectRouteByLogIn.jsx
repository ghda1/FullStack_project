import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Login from "../src/pages/Login";
import { UserContext } from "../src/contexts/UserContext";

function ProtectRouteByLogIn() {
  const { isLogIn } = useContext(UserContext);

  return <div> {isLogIn && isLogIn ? <Outlet /> : <Login />} </div>;
}

export default ProtectRouteByLogIn;
