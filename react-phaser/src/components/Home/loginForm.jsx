import React, { useState } from "react";
import Axios from "axios";

const LoginForm = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await Axios.post("http://localhost:3000/login", user);
      // Redirect Into GAME
    } catch {
      window.alert(
        "Sorry, There Was An Error While Logging In, Please Try Again"
      );
      window.location.reload();
    }
  };

  const handleInputChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <form 
    onSubmit={handleSubmit}
    className="form-signin"
    >
      <h1>Please Sign In</h1>
      <h2>Email Adress</h2>
      <input
        className="form-control"
        type="email"
        name="email"
        placeholder="Email Address"
        aria-label="Email Input Field"
        onChange={handleInputChange}
      />
      <h2>Password</h2>
      <input
        className="form-control"
        type="password"
        name="password"
        placeholder="Password"
        aria-label="Password Input Field"
        onChange={handleInputChange}
      />
      <button type="submit">LOGIN</button>
    </form>
  );
};


export default LoginForm;
