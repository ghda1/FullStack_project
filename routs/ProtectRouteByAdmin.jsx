import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Home from "../src/pages/Home";
import { UserContext } from "../src/contexts/UserContext";

function ProtectRouteByAdmin() {
  const { role } = useContext(UserContext);
  return <div>{role && role === "Admin" ? <Outlet /> : <Home />}</div>;
}

export default ProtectRouteByAdmin;
