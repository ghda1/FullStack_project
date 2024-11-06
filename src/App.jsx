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
import ProtectRouteByLogIn from "../routes/ProtectRouteByLogIn";

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
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/",
          element: <ProtectRouteByLogIn />,
          children: [
            {
              path: "/signOut",
              element: <Home />,
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
