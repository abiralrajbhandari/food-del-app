import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <p className="logo" style={{ color: "white" }}>
            <span style={{ color: "white" }}>Road</span>House
          </p>

          <p>Serving timeless flavors since 2003! 🍴✨</p>
          <p>
            {" "}
            Connect with us on social media to stay updated on our latest
            dishes, events, and more:
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Book Your Table!</h2>
          <ul>
            <li>roadhouse@example.com</li>
            <li>+977 0123456789</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Address</h2>
          <p>Thamel Marg, Beside the Garden of Dreams</p>
          <p>Kathmandu, Nepal</p>
          <p>Hours: Open Daily | 10:00 AM – 10:00 PM </p>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2025 &copy; abiralrajbhandari.com.np - All Rights Reserved.
      </p>
    </div>
  );
}

export default Footer;
