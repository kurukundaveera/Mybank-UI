import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import LandingPage from './Components/LandingPage/LandingPage';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Confirmation from './Components/Confirmation/Confirmation';
import Home from './Components/Home/Home';
import FundTransfer from './Components/FundTransfer/FundTransfer'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path='/register' exact component={Register}></Route>
        <Route path='/login' exact component={Login}></Route>
        <Route path='/confirmation' exact component={Confirmation}></Route>
        <Route path='/Home' exact component={Home}></Route>
        <Route path='/fundtransfer' exact component={FundTransfer}></Route>
        <Route path='/' exact component={LandingPage}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
