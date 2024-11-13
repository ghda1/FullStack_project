import React from "react";
import Products from "../components/products/Products";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/layout/navbar/NavBar";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="homePage">
      <NavBar />
      <div className="hero-section">
        <img
          src="../images/IMG_7918.JPG"
          alt="Home Page image"
          className="hero-image"
        />
        <div className="hero-text">
          <h2>Welcome to TeeNest</h2>
          <p>
            Step into a world of style where every t-shirt tells a story. At
            TeeNest, we believe that what you wear should be as unique as you
            are. Each tee in our collection is designed with creativity,
            comfort, and quality in mind, giving you a look that stands out and
            feels great.
          </p>
        </div>
      </div>
      <div className="product-section">
        <h2>Our Products</h2>
        <Products />
        <button className="show-more-btn" onClick={() => navigate("/products")}>
          Load More
        </button>
      </div>
    </div>
  );
}

export default Home;
