import React, { Component } from 'react'
import logo from '../../Assets/Images/MyBankLogo.png';
import Login from '../Login/Login';
import Register from '../Register/Register';
import backgroundimage from '../../Assets/Images/backgroundimage.jfif'
import './LandingPage.css'
export class LandingPage extends Component {
    constructor(props){
        super(props)
        this.handleRegister=this.handleRegister.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
    }
    handleRegister(){
        this.props.history.push('/register')
    }
    handleLogin(){
        this.props.history.push('/login')
    }
    render() {
        return (
            <div className="landing">
                <img src={logo} className="App-logo" alt="logo" />
                <h1> Welcome to My Bank</h1>
                <div className="btn-group">
                    <button type="button" id="register" className="btn btn-primary" onClick={this.handleRegister}>Register</button>
                    <button type="button" id="login" className="btn btn-secondary" onClick={this.handleLogin}>Login</button>
                </div>
            </div>
        )
    }
}

export default LandingPage
