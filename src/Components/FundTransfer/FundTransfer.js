import React, { Component } from 'react'
import './FundTransfer.css'
import axios from 'axios'
export class FundTransfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fromAccountNo: '',
            fromAccountNoError: '',
            toAccountNo: '',
            toAccountNoError: '',
            amount: '',
            amountError: '',
            comments: '',
            commentsError: '',
            isValid: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGoBack = this.handleGoBack.bind(this)
    }
    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value }, () => {
            console.log(this.state)
        });

    }
    handleGoBack(){
        this.props.history.push('/home')
    }
    handleSubmit(e) {
        let url = 'http://10.117.189.248:8095/bank'
        e.preventDefault()
        this.validate().then((res)=>{
            if(res){
            const transferdetails = {
                accountNo: parseInt(this.state.fromAccountNo),
                amount: parseInt(this.state.amount),
                merchantAccNo: parseInt(this.state.toAccountNo)
                
            };
            console.log(transferdetails);
           
            axios.post(`${url}/fundTransfer`,transferdetails ).then(res => {
                    console.log("Response from axios",res)
                    if (res.status === 200 && res.data.message.indexOf('debited')!= -1) {
                        alert("fund transfer successful",res.data.message)
                    } else {
                        alert(`Error in transferring fund... ${res.data.message}`)
                    }
                }).catch((err) => {
                    console.log("error in axios post")
                    alert("Error in transferring fund", err)
                })
            }
        }


        );
    
      
           
        }

    validate() {
        console.log("Inside validate")
        let isValid = true;
        const errors = {
            fromAccountNoError: '',
            toAccountNoError: '',
            amountError: '',
            commentsError: ''
        }
        if (this.state.amount > 0) {
            if (this.state.fromAccountNo.length >= 6 && this.state.fromAccountNo.length <= 8) {
                isValid = true;
            } else {
                isValid = false;
                errors.fromAccountNoError = "Account number should be between 6 to 8 digits"
            }
        } else {
            isValid = false;
            errors.amountError = "Amount should not be negative or zero"
        }

        
        // if (this.state.toAccountNo.length >= 6 && this.state.toAccountNo.length <= 8) {
        //     isValid = true;
        // } else {
        //     isValid = false;
        //     errors.toAccountNoError= "Account number should be between 6 to 8 digits"
        // }
        this.setState({
            ...this.state,
            ...errors
        })
        return Promise.resolve(isValid);
    }

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value }, () => {
            console.log(this.state)
        });
    }    
    render() {
        return (
            <div>
                <header >
                    <h1>Fund Transfer</h1>
                </header>
                <form className="fundtransferform">
                    <div className="row">
                        <div className="form-group col-xs-6">
                            <label htmlFor="fromAccountNo" >From Account number</label>
                            <br></br>
                            <span className="pull-right text-danger"><small>{this.state.fromAccountNoError}</small></span>
                            <input id="fromAccountNo"
                                className="form-control input-group-lg reg_name"
                                type="text"
                                name="fromAccountNo"
                                placeholder="Enter from Account Number"
                                onChange={this.handleChange}
                                value={this.state.fromAccountNo}
                
                            />
                        </div>

                        <div className="form-group col-xs-6">
                            <label htmlFor="toAccountNumber" >To Account Number</label>
                            <br></br>
                            <span className="pull-right text-danger"><small>{this.state.toAccountNoError}</small></span>
                            <input id="toAccountNo"
                                className="form-control input-group-lg reg_name"
                                type="text"
                                name="toAccountNo"
                                placeholder="Enter To Account Number"
                                value={this.state.toAccountNo}
                                onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-xs-6">
                            <label htmlFor="amount">Amount</label>
                            <br></br>
                            <span className="pull-right text-danger"><small>{this.state.amountError}</small></span>
                            <input id="amount"
                                className="form-control input-group-lg reg_name"
                                type="text"
                                name="amount"
                                placeholder="Enter the amount"
                                value={this.state.amount}
                                onChange={this.handleChange} />
                        </div>

                        <div className="form-group col-xs-6">
                            <label htmlFor="comments" >Comments</label>
                            <input id="comments"
                                className="form-control input-group-lg reg_name"
                                type="text"
                                name="comments"
                                placeholder="Enter comments"
                                value={this.state.comments}
                                onChange={this.handleChange} />
                        </div>
                    </div>
                    <button type="submit" id="submit" className="btn btn-primary" onClick={this.handleSubmit}  >Transfer Funds</button>&nbsp;&nbsp;&nbsp;

                </form>
            </div>
        )
    }
}

export default FundTransfer
