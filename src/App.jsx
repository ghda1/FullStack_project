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
          path: "/",
          element: <ProtectRouteByLogIn />,
          children: [
            {
              path: "/signOut",
              element: <Home />,
            },
            {
              path: "/profile",
              element: <Profile />,
            },
            {
              path: "/updateProfile",
              element: <UpdateProfile />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <ProductProvider>
      <UserProvider>
        <AddressProvider>
          <RouterProvider router={router} />
        </AddressProvider>
      </UserProvider>
    </ProductProvider>
  );
}

export default App;
