import React, { useContext, useEffect, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

function LoginPopup({ setShowLogin }) {
  const { url, setToken } = useContext(StoreContext);
  // State to toggle between 'Sign Up' and 'Login' forms
  const [currState, setCurrState] = useState("Sign Up");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value })); //pass prev data, in prev data change name field and update with updated value
  };
  //Logic to call APIs to req and res data from database, to do methods we need axios support on frontend
  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      {/* Login Popup Form */}
      <form onSubmit={onLogin} className="login-popup-container">
        {/* Popup Title and Close Button */}
        <div className="login-popup-title">
          <h2>{currState}</h2>
          {/* Close the login popup when the cross icon is clicked */}
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close Icon"
          />
        </div>

        {/* Input Fields */}
        <div className="login-popup-inputs">
          {/* Show name input only for 'Sign Up' */}
          {currState === "Login" ? (
            <></> // Empty for Login form
          ) : (
            <input
              value={data.name}
              onChange={onChangeHandler}
              name="name"
              type="name"
              placeholder="Your name"
              required
            />
          )}
          {/* Common Email and Password Fields */}
          <input
            value={data.email}
            onChange={onChangeHandler}
            name="email"
            type="email"
            placeholder="Your email"
            required
          />
          <input
            value={data.password}
            onChange={onChangeHandler}
            name="password"
            type="password"
            placeholder="Your password"
            required
          />
        </div>

        {/* Submit Button: Either 'Sign Up' or 'Login' based on current state */}
        <button type="submit">
          {currState === "Sign Up" ? "Sign up" : "Login"}
        </button>

        {/* Terms and Conditions Checkbox */}
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By Continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {/* Toggle Between Login and Sign Up Links */}
        {currState === "Login" ? (
          <p>
            Not Registered?
            {/* Switch to Sign Up form */}
            <span onClick={() => setCurrState("Sign Up")}> Register Now!</span>
          </p>
        ) : (
          <p>
            Already have an account?
            {/* Switch to Login form */}
            <span onClick={() => setCurrState("Login")}> Login</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopup;
