/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import {signup} from "../services/auth.js"

class Signup extends Component {

    constructor(props){
        super(props);
        this.state = {
            name:'',
            email :'',
            password : '',
            errors:{
                emailErrors:[], 
                passwordErrors :[],
                nameErrors :[]
            },
            isValid : false
        }
        this.emailInputRef = React.createRef();
        this.passwordInputRef = React.createRef();
        this.nameInputRef = React.createRef();
    }
    validate = ()=>{
        const {email, password, name} = this.state
        const errors = {
            emailErrors:[], 
            passwordErrors :[],
            nameErrors:[]
        }
        let isValid = true;

        if( email.trim() === '' ) {
            errors.emailErrors.push( 'Email cannot be empty' );
            isValid = false;
        }
        if(!validateEmail(email)){
            errors.emailErrors.push( 'Invalid Email' );
            isValid = false;
        }
        const flag = password.toLowerCase().includes('password');
        if(flag){
            errors.passwordErrors.push("Password cannot contain the word password")
            isValid = false;
        }
        if(password.trim() === ''){
            errors.passwordErrors.push("Password cannot be Empty")
            isValid = false;
        }
        if(name.trim()===''){
            errors.nameErrors.push("Name Cannot be blank");
            isValid = false;
        }
        this.setState({
            isValid,
            errors
        })
    }

    signup = async (event)=>{
        event.preventDefault();
        try{
            await signup(this.state);
            this.props.history.push("/");
            window.location.reload();
        }catch(error){
            alert("Invalid Credentials");
        }
    }

    updateCredentials = ()=>{
        this.setState({
            email:this.emailInputRef.current.value, 
            password:this.passwordInputRef.current.value,
            name:this.nameInputRef.current.value
        },this.validate);
    }
    
    
    render() {
        
        return (
            <div>
                <div className="text-center">
                        <form onSubmit={this.signup}   className="form-signin">
                            <img className="mb-4" src="https://www.logo.wine/a/logo/Telstra/Telstra-Logo.wine.svg" alt="" width="72" height="72"/>
                            <h1 className="h3 mb-3 font-weight-normal">Please sign up</h1>
                            <label for="emailid" className="sr-only">Name</label>
                            <input  ref={this.nameInputRef} onChange={this.updateCredentials}  type="text" name="name" className="form-control" placeholder="Name"  required autoFocus/>
                            {this.state.errors.nameErrors.map( err => <div className="alert alert-danger alert-sm">{err}</div> )}
                            <label for="emailid" className="sr-only">Email address</label>
                            <input ref={this.emailInputRef} onChange={this.updateCredentials}  type="email" name="emailid" className="form-control" placeholder="Email address"  required/>
                            {this.state.errors.emailErrors.map( err => <div className="alert alert-danger alert-sm">{err}</div> )}
                            <label for="password" className="sr-only">Password</label>
                            <input ref={this.passwordInputRef} onChange={this.updateCredentials}  type="password" name="password" className="form-control" placeholder="Password"  required/>
                            {this.state.errors.passwordErrors.map( err => <div className="alert alert-danger alert-sm">{err}</div> )}
                            <button type="submit" className="btn btn-lg btn-primary btn-block">Sign Up</button>
                            <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
                        </form>
                </div>
            </div>
        );
    }
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default Signup;