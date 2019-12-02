import React, { useState } from "react";
import Axios from "axios";

const SignupForm = () => {
  const [newUser, setNewUser] = useState({ email: "", password: "", name: "" });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await Axios.post("http://localhost:3000/signup", newUser);
      window.location.replace("/");
    } catch {
      window.alert(
        "Sorry, There Was An Error With Signing up, Please Try Again"
      );
      window.location.reload();
    }
  };

  const handleInputChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  return (
    <form className="form-signup" onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <label>
        Email Adress
        <input
          type="email"
          className="form-control"
          placeholder="Email Address"
          onChange={handleInputChange}
          name="email"
          aria-label="Email Address"
        />
      </label>
      <label>
        Password
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          onChange={handleInputChange}
          name="password"
          aria-label="Password"
        />
      </label>
      <label>
        Character Name
        <input
          type="text"
          className="form-control"
          placeholder="Character Name"
          onChange={handleInputChange}
          name="name"
          aria-label="Character Name"
        />
      </label>
      <button type="submit" />
    </form>
  );
};

export default SignupForm;
