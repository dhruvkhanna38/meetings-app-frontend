/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-no-undef */
import React, { Component } from 'react';
import {login} from "../services/auth.js";
import {Redirect ,Link} from 'react-router-dom';
import "./Login.css"

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            email :'',
            password : ''
        }
        this.emailInputRef = React.createRef();
        this.passwordInputRef = React.createRef();
    }

    
    login = async (event)=>{
        event.preventDefault();
        try{
            await login(this.state)
            window.location.reload();
        }catch(error){
            alert("Invalid Credentials");
        }
    }

    

    updateCredentials = ()=>{
        this.setState({
            email:this.emailInputRef.current.value, 
            password:this.passwordInputRef.current.value
        });
    }
    
    
    render() {

            <div>
                <div className="text-center">
                        <form  onSubmit={this.login} className="form-signin">
                            <img className="mb-4" src="https://www.logo.wine/a/logo/Telstra/Telstra-Logo.wine.svg" alt="" width="72" height="72"/>
                            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                            <label for="emailid" className="sr-only">Email address</label>
                            <input ref={this.emailInputRef} type="email" name="emailid" className="form-control" placeholder="Email address" onChange={this.updateCredentials} required autofocus/>
                            <label for="password" className="sr-only">Password</label>
                            <input ref={this.passwordInputRef} type="password" name="password" className="form-control" placeholder="Password" onChange={this.updateCredentials} required/>
                            <div className="checkbox mb-3">
                                <label>
                                <input type="checkbox" value="remember-me"/> Remember me
                                </label>
                            </div>
                            <p className="mt-4 mb-3 text-muted"> New User ? <Link to="/signup">Sign Up</Link></p>
                            <button className="btn btn-lg btn-primary btn-block">Sign in</button>
                            <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
                        </form>
                    </div>
                </div>
        return (
            <div>
                <div className="text-center">
                        <form  onSubmit={this.login} className="form-signin">
                            <img className="mb-4" src="https://www.logo.wine/a/logo/Telstra/Telstra-Logo.wine.svg" alt="" width="72" height="72"/>
                            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                            <label for="emailid" className="sr-only">Email address</label>
                            <input ref={this.emailInputRef} type="email" name="emailid" className="form-control" placeholder="Email address" onChange={this.updateCredentials} required autofocus/>
                            <label for="password" className="sr-only">Password</label>
                            <input ref={this.passwordInputRef} type="password" name="password" className="form-control" placeholder="Password" onChange={this.updateCredentials} required/>
                            <div className="checkbox mb-3">
                                <label>
                                <input type="checkbox" value="remember-me"/> Remember me
                                </label>
                            </div>
                            <p className="mt-4 mb-3 text-muted"> New User ? <Link to="/signup">Sign Up</Link></p>
                            <button className="btn btn-lg btn-primary btn-block">Sign in</button>
                            <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
                        </form>
                    </div>
                </div>
        );
    }
}



export default Login;