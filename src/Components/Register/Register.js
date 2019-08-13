import React, { Component } from 'react'
import './Register.css'
import axios from 'axios';
export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            firstName: '',
            firstNameError: '',
            lastName: '',
            lastNameError: '',
            mobileNo: '',
            mobileNoError: '',
            isValid: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value }, () => {
            //console.log(this.state)
        });

    }
    handleSubmit(e) {
        let url = 'http://10.117.189.248:8095/bank'
        e.preventDefault()
        let isValid = this.validate();
        console.log("isvalid inside validate submit", isValid)
        if (isValid) {
            const accountHolder = {
                email_id: this.state.email,
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                mobile_no: this.state.mobileNo,
                password: this.state.password
            };
            console.log(accountHolder)
            axios.post(`${url}/register`, { accountHolder })
                .then(res => {
                    if(res.status === 200){
                        alert("Registration is successful")
                        this.props.history.push({
                            pathname: '/confirmation',
                            search: '?query=confirmation',
                            //state:{data: response.data}
                            state: { acc_no: res.data.acc_no }
                        })
                    } else{
                        console.log(res.status)
                    }
                }).catch((err)=>{
                    alert("Error in registration", err)
            })

    }
}
validate() {
    console.log("Inside validate")
    let isValid = true;
    const errors = {
        emailError: '',
        mobileNoError: '',
        passwordError: '',
        firstNameError: '',
        lastNameError: ''
    }
    if (this.state.email.indexOf('@') != -1) {
        if (this.state.firstName.length > 4) {
            if (this.state.lastName.length > 4) {
                if (this.state.mobileNo.length===10 ) {
                    isValid = true;
                } else {
                    isValid = false;
                    errors.mobileNoError='Mobile Number should be 10 digits and should be a number'
                }
            } else {
                isValid = false;
                errors.lastNameError = 'Last name should be more than 4 characters'
            }
        } else {
            isValid = false;
            errors.firstNameError = 'first name should be more than 4 characters'
        }
    } else {
        console.log("is valid is false")
        isValid = false;
        errors.emailError = "Email should have @ and password should have more than 4 characters"
    }
    
    
    

    this.setState({
        ...this.state,
        ...errors
    })
    return isValid;

}
render() {
    return (
        <div>
            <header >
                <h1>Register with My Bank</h1>
            </header>
            <form className="registerform">
                <div className="form-group">
                    <span className="pull-right text-danger"><small>{this.state.emailError}</small></span>  
                    <br></br>
                    <label htmlFor="email">Email </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.email}
                        className="form-control"
                        placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <span className="pull-right text-danger"><small>{this.state.firstNameError}</small></span>
                    <br></br>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        onChange={this.handleChange}
                        value={this.state.firstName}
                        className="form-control"
                        placeholder="Enter first name" />
                </div>
                <div className="form-group">
                    <span className="pull-right text-danger"><small>{this.state.lastNameError}</small></span>
                    <br></br>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        onChange={this.handleChange}
                        value={this.state.lastName}
                        className="form-control"
                        placeholder="Enter last name" />
                </div>
                <div className="form-group">
                    <span className="pull-right text-danger"><small>{this.state.mobileNoError}</small></span>
                    <br></br>
                    <label htmlFor="mobileNo">Mobile Number</label>
                    <input
                        type="text"
                        id="mobileNo"
                        onChange={this.handleChange}
                        value={this.state.mobileNo}
                        className="form-control"
                        placeholder="Enter the mobile number" />
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
                <button type="submit" id="registersubmit" className="btn btn-primary" onClick={this.handleSubmit}  >Register</button>

            </form>
        </div>
    )
}
}

export default Register
