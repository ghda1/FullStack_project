import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import logo from "/images/Logo.png";
import { UserContext } from "../../../contexts/UserContext";
import "./NavBar.css";

function NavBar() {
  const { isLogIn, setLogIn, token, setToken } = useContext(UserContext);
  const handleSignOut = () => {
    setLogIn(false);
    setToken(null);
    localStorage.setItem("userData", JSON.stringify({ isLogIn, token }));
  };
  return (
    <>
      <nav id="nav">
        <div className="left">
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
        </div>
        <img className="logo" src={logo} title="logo" />
        <div className="right">
          <Link to="/login">Log In</Link>
          <Link to="/signOut" onClick={handleSignOut}>
            Sign Out
          </Link>
          <ShoppingCartIcon className="cart-icon" />
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar;
