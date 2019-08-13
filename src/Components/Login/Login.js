import React, { Component } from 'react'
import axios from 'axios'
import './Login.css'

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountNo: '',
            accountNoError: '',
            password: '',
            passwordError: '',
            isValid: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value }, () => {
            console.log(this.state)
        });
    }
    handleSubmit(e) {
        let url = 'http://10.117.189.248:8095/bank'
        e.preventDefault()
        
        this.validate().then((res)=>{
            console.log("res", res)
            if (res) {
                const user = {
                    acct_no: this.state.accountNo,
                    password: this.state.password
                };
                console.log(user)
    
                axios.post(`${url}/login`, user )
                    .then(res => {
                        console.log("Res.data inside login", res.data)
                        if (res.status === 200 && res.data.message!=="No value present") {
                            this.props.history.push({
                                pathname: '/home',
                                search: '?query=home',
                                //state:{data: response.data}
                                state: { data: res.data }
                            })
                        } else {
                            alert('Error in login')
                        }
                    })
    
            }
        }

        );  
    }
    validate() {
        console.log("Inside validate")
        let isValid = true;
        const errors = {
            accountNoError: '',
            passwordError: ''
        }

        if (this.state.accountNo.length >= 6 && this.state.accountNo.length <= 8) {
            if (this.state.password.length > 4) {
                isValid = true;
            } else {
                isValid = false;
                errors.passwordError = 'password should be more than 4 characters'
            }
        } else {
            isValid = false;
            errors.accountNoError = 'account number should have 6 to 8 digits'
        }
        
        this.setState({
            ...this.state,
            ...errors
        })
        console.log("isValid inside validate",isValid)
        return Promise.resolve(isValid);

    }
    render() {
        return (
            <div>
                <header >
                    <h1>Login to My Bank</h1>
                </header>
                <form class="loginform">
                    <div className="form-group">
                        <span className="pull-right text-danger"><small>{this.state.accountNoError}</small></span>
                        <br></br>
                        <label htmlFor="accountNo">Account Number </label>
                        <input
                            type="text"
                            id="accountNo"
                            onChange={this.handleChange}
                            value={this.state.accountNo}
                            className="form-control"
                            placeholder="Enter the account number" />
                    </div>
                    <div className="form-group">
                        <span className="pull-right text-danger"><small>{this.state.passwordError}</small></span>
                        <br></br>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            onChange={this.handleChange}
                            value={this.state.password}
                            className="form-control"
                            placeholder="Enter the password" />
                    </div>

                    <button id="submit" type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Login</button>

                </form>
            </div>
        )
    }
}

export default Login
