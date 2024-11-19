import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SignIn = ({ setIsAdminAuthenticated }) => {
  const [email, setEmail] = useState("admin@gmail.com"); 
  const [password, setPassword] = useState("12345"); 
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    
    if (email === "admin@gmail.com" && password === "12345") {
      setIsAdminAuthenticated(true);
      navigate("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleSignIn} className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="mb-4">Admin Sign In</h2>
        <input
          type="email"
          className="form-control my-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control my-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary w-100">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
