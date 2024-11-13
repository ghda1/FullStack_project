import React from "react";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import PageTitle from "../components/PageTitle";

function Dashboard() {
  return (
    <div className="admin-dashboard">
      <PageTitle title="Dashboard" />
      <SideBar />
      <Outlet />
    </div>
  );
}

export default Dashboard;
