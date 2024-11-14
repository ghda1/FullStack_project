import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "../components/layout/Layout";
import ProductDetails from "../pages/ProductDetails";
import Signup from "../pages/Signup";
import AddressSignUp from "../pages/AddressSignUp";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import ProtectRouteByLogIn from "./ProtectRouteByLogIn";
import Profile from "../pages/Profile";
import UpdateProfile from "../pages/UpdateProfile";
import Dashboard from "../pages/Dashboard";
import ProtectRouteByAdmin from "./ProtectRouteByAdmin";
import ManageProducts from "../components/ManageProducts";
import ManageUsers from "../components/ManageUsers";
import ManageAddresses from "../components/ManageAddresses";
import UpdateProduct from "../pages/UpdateProduct";
import AddProduct from "../pages/AddProduct";
import ListProduct from "../pages/ListProduct";
import Home from "../pages/Home";

function Index() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    {
      path: "/signOut",
      element: <Home />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/products",
          element: <ListProduct />,
        },
        {
          path: "/productDetails/:productId",
          element: <ProductDetails />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/addressInfo",
          element: <AddressSignUp />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/",
          element: <ProtectRouteByLogIn />,
          children: [
            {
              path: "/profile/:userId",
              element: <Profile />,
            },
            {
              path: "/updateProfile",
              element: <UpdateProfile />,
            },
            {
              path: "/",
              element: <ProtectRouteByAdmin />,
              children: [
                {
                  path: "dashboard",
                  element: <Dashboard />,
                  children: [
                    {
                      index: true,
                      element: <ManageProducts />,
                    },
                    {
                      path: "users",
                      element: <ManageUsers />,
                    },
                    {
                      path: "addresses",
                      element: <ManageAddresses />,
                    },
                    {
                      path: "products",
                      element: <ManageProducts />,
                    },
                  ],
                },
                {
                  path: "/updateProduct",
                  element: <UpdateProduct />,
                },
                {
                  path: "/addProduct",
                  element: <AddProduct />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Index;
