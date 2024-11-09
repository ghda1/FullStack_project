import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import logo from "/images/Logo.png";
import { UserContext } from "../../../contexts/UserContext";
import "./NavBar.css";

function NavBar() {
  const { setLogIn, setToken, userLoggedIn, setUserLoggedIn, isLogIn, role } =
    useContext(UserContext);

  const userId = userLoggedIn && userLoggedIn.nameid;

  const handleSignOut = () => {
    setLogIn(false);
    setToken(null);
    setUserLoggedIn(null);
    localStorage.removeItem("userData");
  };
  return (
    <>
      <nav id="nav">
        <div className="left">
          <Link to="/">Home</Link>
          {isLogIn && <Link to={`/profile/${userId}`}>Profile</Link>}
          {isLogIn && role === "Admin" && <Link to="/dashboard">Dashboard</Link>}
        </div>
        <img className="logo" src={logo} title="logo" />
        <div className="right">
          {!isLogIn && <Link to="/login">Log In</Link>}
          {isLogIn && (
            <Link to="/signOut" onClick={() => handleSignOut()}>
              Sign Out
            </Link>
          )}
          <ShoppingCartIcon className="cart-icon" />
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar;
