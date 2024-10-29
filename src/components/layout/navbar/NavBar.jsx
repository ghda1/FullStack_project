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
          <Image className="logo" image={logo} title="logo" />
          <Link to="/">Home</Link>
          <Link to="/">Profile</Link>
        </div>
        <div className="right">
          <Link to="/SignIn">Log In</Link>
          <ShoppingCartIcon className="cart-logo" />
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar;
