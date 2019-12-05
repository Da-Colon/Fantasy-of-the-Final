import React, { useState} from "react";
import store from "../../store";
import Axios from "axios";
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'

const LoginForm = (props) => {
  let history = useHistory();

  const [login, setLogin] = useState({ email: "", password: "" });


  const updateUser = (data) =>{
    store.dispatch({
      type: 'user logged in',
      payload: data
    })
  }



  const handleSubmit = async (e,props) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:3000/login", login);
      const data = await response.data.body;
      await updateUser(data)
      history.push('/game')

    } catch {
      window.alert(
        "Sorry, There Was An Error While Logging In, Please Try Again"
        );
        // window.location.reload();
      }
    };
    
    
  const handleInputChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="form-signin">
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


function mapStateToProps(state) {
  return {
    ...state.user,
  }
}

export default connect(mapStateToProps)(LoginForm)