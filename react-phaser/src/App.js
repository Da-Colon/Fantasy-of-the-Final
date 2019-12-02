import React from 'react';
import {Route} from 'react-router-dom'
import './App.css';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Route path='/' component={Home}/>
    </div>
  );
}

export default App;
