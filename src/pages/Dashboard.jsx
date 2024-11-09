import React from "react";
import ManageUsers from "../components/ManageUsers";
import ManageAddresses from "../components/ManageAddresses";
import ManageProducts from "../components/ManageProduct";

function Dashboard() {
  return (
    <div className="admin-dashboard">
      <ManageUsers />
      <ManageAddresses />
      <ManageProducts />
    </div>
  );
}

export default Dashboard;
