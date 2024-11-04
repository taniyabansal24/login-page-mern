import React, { useEffect, useState } from "react";
import "./style.css";
import home from "../assets/home.png";
import { handleError, handleSuccess } from '../utils';
import { useNavigate } from "react-router-dom";
import {ToastContainer} from 'react-toastify'; 

const Login = () => {
  const [isFilled, setIsFilled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [loginInfo, setLoginInfo] = useState({
    email: '',  
    password: ''
  })


  const navigate = useNavigate();
  useEffect(() => {
    const loadingAnimation = () => {
      const container = document.querySelector(".container");
      const image = document.querySelector(".image");
      const logo = document.querySelector(".logo");
      const text = document.querySelector(".text");
      const buttons = document.querySelector(".buttons");
      const newCustomer = document.querySelector(".new-customer");
      const main = document.querySelector(".main");

      container.style.opacity = 0;
      container.style.transform = "scaleX(0.7) scaleY(0.2) translateY(80%)";
      container.style.borderRadius = "150px";
      logo.style.opacity = 0;
      text.style.opacity = 0;

      setTimeout(() => {
        container.style.transition = "opacity 0.2s ease";
        container.style.opacity = 1;
      }, 100);

      setTimeout(() => {
        container.style.transition =
          "transform 2s ease-out, border-radius 2s ease-out";
        container.style.transform = "scale(1)";
        container.style.borderRadius = "0";
      }, 200);

      // Adjust opacity after a delay based on screen size
      setTimeout(() => {
        if (window.innerWidth <= 845) {
          image.style.opacity = 0.5; // Set opacity to 0.5 for small screens
        } else {
          image.style.opacity = 1; // Set opacity to 1 for larger screens
        }
        image.style.transition = "opacity 0.5s ease";
      }, 500);

      setTimeout(() => {
        logo.style.transition = "opacity 1s ease";
        logo.style.opacity = 1;
      }, 2000);

      setTimeout(() => {
        logo.classList.add("move");
        image.classList.add("shrink");
        console.log("Shrink class added:", image.classList.contains("shrink"));
      }, 2600);

      setTimeout(() => {
        text.classList.add("show");
      }, 3500);

      setTimeout(() => {
        buttons.classList.add("btn");
      }, 3500);

      setTimeout(() => {
        newCustomer.classList.add("new-coust");
      }, 3500);

      setTimeout(() => {
        main.classList.add("main_animation");
      }, 3500);
    };

    loadingAnimation();
  }, []);

  const handleInputChange = (e) => {
    const onlineId = document.getElementById("online-id").value.trim();
    const password = document.getElementById("password").value.trim();
    setIsFilled(onlineId !== "" && password !== "");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const main = document.querySelector(".main");
    const text = document.querySelector(".text");
    const buttons = document.querySelector(".buttons");
    const image = document.querySelector(".image");
    const newCustomer = document.querySelector(".new-customer");
    const logo = document.querySelector(".logo");

    setTimeout(() => {
      main.classList.add("main_close");
      text.classList.add("unshow");
      buttons.classList.add("btn_close");
      newCustomer.classList.add("new_close_coust");
      image.classList.remove("shrink");
      image.classList.add("image_close");
      logo.classList.remove("move");
      setTimeout(() => {
        logo.classList.add("logo_close");
      }, 1000);
    }, 0);
  };

  const handleChange = (e) => {
      const {name, value} = e.target;
      const copyLoginInfo = { ...loginInfo };
      copyLoginInfo[name] = value;
      setLoginInfo(copyLoginInfo);
  } 

  const handelLogin = async(e) =>{
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password ){
        return handelError('Email and Password are required')
    }
    try{
        const url = "https://login-page-mern-api.vercel.app/auth/login";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
        });
        const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
              handleSuccess(message);
              localStorage.setItem('token', jwtToken);
              localStorage.setItem('loggedInUser', name);
                setTimeout(() => handleFormSubmit(e),0);
                setTimeout(() => {
                    navigate('/profile')
                }, 0)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
                return false;
            } else if (!success) {
                handleError(message);
                return false;
            }
        } catch (err) {
            handleError(err.message);
            // return false; // Return false if there’s an exception
        }
    }

  const handleBothChanges = (e) => {
    handleInputChange(e);
    handleChange(e);
  };

  const handelBothSubmit = async (e) => {
    e.preventDefault();
    const signupSuccess = await handelLogin(e);
    
    // Proceed only if signup was successful
    if (signupSuccess) {
        handleFormSubmit(e);
    }
};
  
  
  return (
    <div className="container">
      <div className="image">
        <img
          src="https://images.unsplash.com/photo-1527704127313-9738426085be?q=80&w=2951&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <div className="content">
        <div className="logo">
          <img src={home} alt="" />
        </div>
        <div className="text">
          <h3>WELCOME</h3>
          <h4>Home</h4>
        </div>
        <div className="buttons">
          <div className="tooltip-container">
            <button className="enroll-btn">Enroll Now</button>
            <div className="tooltip">
              <span>
                Enroll now:
                <ul className="tick-list">
                  <li>Access your loans online</li>
                  <li>Pay your mortgage online</li>
                  <li>View your loan mortgage statement</li>
                </ul>
              </span>
            </div>
          </div>
          <a className="new-customer bigscreen" href="/signup">
            Are you a new customer?
          </a>
        </div>
      </div>
      <div className="main">
        <h1>Welcome Back</h1>
        <p>Login to your account</p>
        <form className="login-form bigscreen" onSubmit={handelBothSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="online-id"
              name="email"
              value={loginInfo.email}
              onChange={handleBothChanges}
              required
            />
            <div className="labelline">Email ID</div>
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={loginInfo.password}
              onChange={handleBothChanges}
              required
            />
            <div className="labelline">Password</div>
          </div>
          <button
            type="submit"
            className="submit-btn"
            style={{ backgroundColor: isFilled ? "#2680b3" : "#90d6ff" }}
          >
            <span
              className="btn-text"
              style={{ display: isLoading ? "none" : "inline" }}
            >
              Login
            </span>
            <span
              className="loading-icon"
              style={{ display: isLoading ? "inline-block" : "none" }}
            >
              <div className="loader"></div>
            </span>
          </button>
        </form>
        <form className="login-form smallscreen" onSubmit={handelBothSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="online-id"
              name="email"
              placeholder="Email Id"
              value={loginInfo.email}
              onChange={handleBothChanges}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              value={loginInfo.password}
              onChange={handleBothChanges}
              required
            />
          </div>
          <button
            type="submit"
            className="submit-btn"
            style={{ backgroundColor: isFilled ? "#2680b3" : "#90d6ff" }}
          >
            <span
              className="btn-text"
              style={{ display: isLoading ? "none" : "inline" }}
            >
              Login
            </span>
            <span
              className="loading-icon"
              style={{ display: isLoading ? "inline-block" : "none" }}
            >
              <div className="loader"></div>
            </span>
          </button>
        </form>
        <a className="new-customer smallscreen" href="/signup">
            Are you a new customer?
          </a>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
