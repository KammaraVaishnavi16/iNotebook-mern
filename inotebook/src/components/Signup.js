import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth-token and redirect
      localStorage.setItem("token", json.authToken);
      navigate("/login");
      props.showAlert("Account created successfully", "success");
    } else {
      props.showAlert("Enter data correctly", "danger");
    }
  };
  return (
    <div>
      <div
        className="container mt-2"
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
        <h4>Create an account to use iNotebook</h4>
        <form onSubmit={handleSignSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter you name"
              aria-describedby="emailHelp"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
              minLength={3}
              style={{ width: "500px", border: "1px solid #343a40" }}
            />
          </div>
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
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
              required
              minLength={5}
              placeholder="Create your Password"
              style={{ width: "500px", border: "1px solid #343a40" }}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
