import React from 'react';
import {Route} from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import Signup from './components/Home/signup';

function App() {
  return (
    <div className="App">
      <Route path='/' component={Home} exact />
      <Route path='/signup' component={Signup} exact />
    </div>
  );
}

export default App;
