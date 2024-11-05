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
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/productDetails/:productId",
          element: <ProductDetails />,
        },
      ],
    },
  ]);

  return (
    <ProductProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ProductProvider>
  );
}

export default App;
