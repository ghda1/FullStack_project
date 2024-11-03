import PropTypes from "prop-types";

import NavBar from "./navbar/NavBar";
import Footer from "./footer/Footer";

function Layout(props) {
  return (
    <div className="layout">
      <NavBar />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
export default Layout;
