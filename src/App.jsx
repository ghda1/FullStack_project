import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import { ProductProvider } from "./contexts/ProductContext";
import ProductDetails from "./pages/ProductDetails";
import { UserProvider } from "./contexts/UserContext";
import AddressSignUp from "./pages/AddressSignUp";
import { AddressProvider } from "./contexts/AddressContext";
import ProtectRouteByLogIn from "../routs/ProtectRouteByLogIn";
import UpdateProfile from "./pages/UpdateProfile";
import Dashboard from "./pages/Dashboard";
import ProtectRouteByAdmin from "../routs/ProtectRouteByAdmin";
import UpdateProduct from "./pages/UpdateProduct";
import AddProduct from "./pages/AddProduct";
import { SizeProvider } from "./contexts/SizeContext";
import { ColorProvider } from "./contexts/ColorContext";
import ManageUsers from "./components/ManageUsers";
import ManageAddresses from "./components/ManageAddresses";
import ManageProducts from "./components/ManageProduct";
import Cart from "./pages/Cart";

function App() {
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

  return (
    <UserProvider>
      <AddressProvider>
        <ProductProvider>
          <SizeProvider>
            <ColorProvider>
              <RouterProvider router={router} />
            </ColorProvider>
          </SizeProvider>
        </ProductProvider>
      </AddressProvider>
    </UserProvider>
  );
}

export default App;
