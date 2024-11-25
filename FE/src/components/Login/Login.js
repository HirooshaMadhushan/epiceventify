import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import log from "../../assets/log.png"; // Ensure the correct path to your image
import "./Login.css"; // Import the custom CSS file

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();
  const handleValidation = () => {
    let formIsValid = true;

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setEmailError("Email Not Valid");
    } else {
      setEmailError("");
    }

    if (!password.match(/^[a-zA-Z]{8,22}$/)) {
      formIsValid = false;
      setPasswordError(
        "Only Letters and length must be min 8 characters and max 22 characters"
      );
    } else {
      setPasswordError("");
    }

    return formIsValid;
  };

  const loginSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      try {
        const response = await axios.post("http://localhost:8000/adminlogin", {
          email,
          password,
        });

        if (response.data.message === "Login successful") {
          alert("Login successful");
          navigate("/user/appstart");
        } else {
          setLoginError(response.data.message);
        }
      } catch (error) {
        setLoginError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="App d-flex align-items-center justify-content-center vh-100" style={{backgroundColor:'white'}}>
      <div className="container login-container">
        <div className="row no-gutters">
          <div
            className="col-md-5 d-flex justify-content-center align-items-center image-container"
          >
            <img src={log} alt="Login" className="img-fluid" style={{ maxWidth: "70%" }} />
          </div>
          <div className="col-md-1 d-flex align-items-center justify-content-center">
            <div className="vertical-line"></div>
          </div>
          <div className="col-md-5 login-form-container">
            <form id="loginform" onSubmit={loginSubmit} className="p-4">
              <div className="form-group">
                <h2>Login</h2>
                <br />
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control input-reduced-width"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <small id="emailHelp" className="text-danger form-text">
                  {emailError}
                </small>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control input-reduced-width"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <small id="passworderror" className="text-danger form-text">
                  {passwordError}
                </small>
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label">Check me out</label>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              {loginError && (
                <div className="text-danger mt-2">
                  {loginError}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
