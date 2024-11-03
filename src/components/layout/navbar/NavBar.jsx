import { Link, Outlet } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import logo from "/images/Logo.png";

import "./NavBar.css";
import Image from "../../Image";

function NavBar() {
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
          <ShoppingCartIcon className="cart-icon" />
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar;
