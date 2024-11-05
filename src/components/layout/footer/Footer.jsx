import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";

import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="copyright">Developed by Ghadah &copy; {year}</p>
      <div>
        <Link to="/">Products</Link>
        <Link to="/signup">Join Us</Link>
      </div>
      <div className="contact">
        <a href="https://github.com/ghda1" target="_blank">
          <GitHubIcon />
        </a>
        <a href="mailto:gh.gadahd01@gmail.com" target="_blank">
          <EmailIcon />
        </a>
        <a
          href="http://linkedin.com/in/ghadah-aljohani-998721314"
          target="_blank"
        >
          <LinkedInIcon />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
