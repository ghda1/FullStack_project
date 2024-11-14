import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import ListProduct from "../pages/ListProduct";
import { UserContext } from "../contexts/UserContext";

function ProtectRouteByAdmin() {
  const { role } = useContext(UserContext);
  return <div>{role && role === "Admin" ? <Outlet /> : <ListProduct />}</div>;
}

export default ProtectRouteByAdmin;
