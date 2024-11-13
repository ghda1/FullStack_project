import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import ListProduct from "../src/pages/ListProduct";
import { UserContext } from "../src/contexts/UserContext";

function ProtectRouteByAdmin() {
  const { role } = useContext(UserContext);
  return <div>{role && role === "Admin" ? <Outlet /> : <ListProduct />}</div>;
}

export default ProtectRouteByAdmin;
