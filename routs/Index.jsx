import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "../src/components/layout/Layout";
import Home from "../src/pages/Home";
import ProductDetails from "../src/pages/ProductDetails";
import Signup from "../src/pages/Signup";
import AddressSignUp from "../src/pages/AddressSignUp";
import Login from "../src/pages/Login";
import Cart from "../src/pages/Cart";
import ProtectRouteByLogIn from "../routs/ProtectRouteByLogIn";
import Profile from "../src/pages/Profile";
import UpdateProfile from "../src/pages/UpdateProfile";
import Dashboard from "../src/pages/Dashboard";
import ProtectRouteByAdmin from "../routs/ProtectRouteByAdmin";
import ManageProducts from "../src/components/ManageProduct";
import ManageUsers from "../src/components/ManageUsers";
import ManageAddresses from "../src/components/ManageAddresses";
import UpdateProduct from "../src/pages/UpdateProduct";
import AddProduct from "../src/pages/AddProduct";

function Index() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
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
              path: "/signOut",
              element: <Home />,
            },
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
