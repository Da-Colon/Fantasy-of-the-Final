import React, { useState } from "react";
import Axios from "axios";
import {Form, Label, Input, Button} from './styles'

import cyan from './playerSprites/Cyan.gif'
import locke from './playerSprites/Locke.gif'
import terra from './playerSprites/Terra.gif'
import relm from './playerSprites/Relm.gif'
import celes from './playerSprites/Celes.gif'


const SignupForm = () => {
  const [newUser, setNewUser] = useState({ email: "", password: "", name: "" , avatar: ''});

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await Axios.post("http://localhost:3000/signup", newUser);
      window.location.replace("/");
    } catch {
      window.alert(
        "Sorry, There Was An Error With Signing up, Please Try Again"
        );
        // window.location.reload();
      }
    };
    
  const handleInputChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 style={{textAlign: "center"}}>Create an Account</h1>
      <Label>
        Email Adress
        <Input
          type="email"
          placeholder="Email Address"
          onChange={handleInputChange}
          name="email"
          aria-label="Email Address"
        />
      </Label>
      <Label>
        Password
        <Input
          type="password"
          placeholder="Password"
          onChange={handleInputChange}
          name="password"
          aria-label="Password"
        />
      </Label>
      <Label>
        Character Name
        <Input
          type="text"
          placeholder="Character Name"
          onChange={handleInputChange}
          name="name"
          aria-label="Character Name"
        />
      </Label>
      <Label>
        Choose Avatar
        <Input
          type="radio"
          onChange={handleInputChange}
          name="avatar"
          aria-label="Avatar"
          value={1}
          required/>
        <img alt="Locke Sprite" src={locke} />
        <Input
          type="radio"
          onChange={handleInputChange}
          name="avatar"
          aria-label="Avatar"
          value="2"
        required />
        <img alt="Celes Sprite" src={celes} />
        <Input
          type="radio"
          onChange={handleInputChange}
          name="avatar"
          aria-label="Avatar"
          value="3"
          required/>
        <img alt="Cyan Sprite" src={cyan} />
        <Input
          type="radio"
          onChange={handleInputChange}
          name="avatar"
          aria-label="Avatar"
          value="4"
          required/>
        <img alt="Terra Sprite" src={terra} />
        <Input
          type="radio"
          onChange={handleInputChange}
          name="avatar"
          aria-label="Avatar"
          value="5"
          required/>
        <img alt="Relm Sprite" src={relm} />
      </Label>
      <Button type="submit">Create Your Character</Button>
    </Form>
  );
};

export default SignupForm;
