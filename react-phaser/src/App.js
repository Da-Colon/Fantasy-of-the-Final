import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Signup from "./components/Home/signup";
import Game from "./components/Game";
// import ForgotPassword from './components/Home/forgotPassword';


function App() {

  return (
    <div className="App">
      <Route path="/" component={Home} exact />
      <Route path="/signup" component={Signup} exact />
      <Route path="/game" component={Game} exact />

      {/* <Route path='/forgotpassword' component={ForgotPassword}/> */}
    </div>
  );
}

export default App;
