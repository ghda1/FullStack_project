import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";

import logo from "/images/Logo.png";
import { UserContext } from "../../../contexts/UserContext";
import "./NavBar.css";
import { CartContext } from "../../../contexts/CartContext";

function NavBar() {
  const { setLogIn, setToken, userLoggedIn, setUserLoggedIn, isLogIn, role } =
    useContext(UserContext);

  const { productCart, removeCartFromLocalStorage } = useContext(CartContext);

  const userId = userLoggedIn && userLoggedIn.nameid;

  const itemCount = productCart.length;

  const handleSignOut = () => {
    setLogIn(false);
    setToken(null);
    setUserLoggedIn(null);
    localStorage.removeItem("userData");
    removeCartFromLocalStorage();
  };
  return (
    <>
      <nav id="nav">
        <div className="left">
          <img className="logo" src={logo} title="logo" />
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          {isLogIn && (
            <Link to={(`/profile/${userId}`)}>Profile</Link>
          )}
          {isLogIn && role === "Admin" && (
            <Link to="/dashboard">Dashboard</Link>
          )}
        </div>
        <div className="right">
          {!isLogIn && <Link to="/login">Log In</Link>}
          {isLogIn && (
            <Link to="/signOut" onClick={() => handleSignOut()}>
              Sign Out
            </Link>
          )}
          <Link to={"/cart"}>
            <Badge
              badgeContent={itemCount}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "grey",
                  color: "white",
                },
              }}
            >
              <ShoppingCartIcon className="cart-icon" />
            </Badge>
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar;
