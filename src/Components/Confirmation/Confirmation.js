import React, { Component } from 'react'
import './Confirmation.css'
export class Confirmation extends Component {
    constructor(props){
        super(props)
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.history.push({
            pathname: '/login',
            search: '?query=confirmation'

        })
    }
    render() {
        return (
            <div className="confirmation">
               <h3>Thank you for registering!</h3><br/>
               <h3>You can now login with your registered account number and password</h3>
                <p>Your userID/accountNo is {this.props.location.state.acc_no} . You can now login with your userid and password</p>
                <br></br><br></br><br></br>
                <button type="submit" className="btn btn-primary" onClick={this.handleSubmit} >Login</button>
            </div>
        )
    }
}

export default Confirmation
