import React from "react";
import "./Header.css";

function Header() {
  return (
    <section className="header">
      <div className="header-content">
        <h1 className="header-slogan">
          Food So Good, You’ll Forget Your Diet.
        </h1>
        <div className="header-buttons">
          <a href="#footer">
            <button className="btn-1">Book Now</button>
          </a>
          <a href="#explore-menu">
            <button className="btn-2">Explore Menu</button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Header;
