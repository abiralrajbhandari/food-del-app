import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

function Navbar({ setShowLogin }) {
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState("home");
  const { getTotalItemsCount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setDark(true) : setDark(false);
    });
  }, []);

  const handleMenuClick = (section) => {
    setMenu(section);
    if (section === "home") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className={`navbar ${dark ? "dark-nav" : ""}`}>
      <Link to="/" onClick={() => handleMenuClick("home")}>
        {/* <img src={assets.logo} alt="Logo" className="logo" /> */}
        <p className="logo" style={{ color: "black" }}>
          <span style={{ color: "black" }}>Road</span>House
        </p>
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => handleMenuClick("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <Link
          to="/about"
          onClick={() => handleMenuClick("about")}
          className={menu === "about" ? "active" : ""}
        >
          About Us
        </Link>
        <a
          href="#footer"
          onClick={() => setMenu("contact us")}
          className={menu === "contact us" ? "active" : ""}
        >
          Contact
        </a>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img className="basket" src={assets.basket_icon} alt="Cart" />
          </Link>
          {getTotalItemsCount() > 0 && <div className="dot"></div>}
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign Up</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="Orders" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" />
                Logout
              </li>
              <hr />
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
