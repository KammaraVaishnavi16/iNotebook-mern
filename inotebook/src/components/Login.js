import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth-token and redirect
      localStorage.setItem("token", json.authToken);
      props.showAlert("LoggedIn Successfully", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid Credientials", "danger");
    }
  };
  return (
    <div
      className="container mt-3"
      style={{
        // border: "1px solid #ccc",
        border: "1px solid #343a40",
        padding: "20px",
        borderRadius: "10px",
        width: "600px",
        backgroundColor: "rgb(72, 3, 45)",
        color: "white",
      }}
    >
      <h4>Login to continue to iNotebook</h4>
      <form onSubmit={handleLoginSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter your mail"
            style={{ width: "500px", border: "1px solid #343a40" }}
          />
          <div id="emailHelp" className="form-text text-light">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter your password"
            style={{ width: "500px", border: "1px solid #343a40" }}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary mx-2"
          onSubmit={handleLoginSubmit}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
