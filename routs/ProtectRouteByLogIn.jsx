import React, { useContext } from "react";
import { Outlet } from "react-router-dom";

import { UserContext } from "../src/contexts/UserContext";
import Home from "../src/pages/Home";

function ProtectRouteByLogIn() {
  const { isLogIn } = useContext(UserContext);

  return <div> {isLogIn && isLogIn ? <Outlet /> : <Home />} </div>;
}

export default ProtectRouteByLogIn;
