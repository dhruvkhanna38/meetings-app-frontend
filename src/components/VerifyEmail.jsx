/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {checkVerification, logout} from "../services/auth.js";

class VerifyEmail extends Component {

    verifyEmailHelper = async (e)=>{
        e.preventDefault();
        const response = await checkVerification(localStorage.getItem('emailToken'));
        const isVerified = response.data.isVerified;
        if(isVerified){
            alert("Verification Successful! You Will Now be redirected to the Login Page");
            await logout();
            this.props.history.push("/login");
        }
        else{
            alert("Email Not Verified! Click on the link in the email recieved in your inbox");
        }
    }

    render() {
        return (
            <div class="jumbotron">
                <h1 class="display-4">Telstra Meetings App</h1>
                <p class="lead">An Email with a verification link has been sent to your account. Open the link to complete your verification and click on the button below to complete your Signup.</p>
                <hr class="my-4"/>
                <p class="lead">
                    <a class="btn btn-primary btn-lg" onClick={this.verifyEmailHelper}>Complete Verification</a>
                </p>
            </div>
            
        );
    }
}

export default VerifyEmail;