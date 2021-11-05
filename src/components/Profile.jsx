/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react';
import {getProfile, setProfileNavbar, updateUserEmail,updatePassword} from "../services/meetings.js" 
import {logout} from "../services/auth.js"
import { Route, Link, Switch, BrowserRouter } from 'react-router-dom';
const baseURL ="https://calm-garden-60687.herokuapp.com";

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            Status:'Fetching',
            profile : null,
            image:null,
            email:'',
            imageURL:"https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            password:'',
            passwordVerify:'',
            errors:{
                emailErrors:[],
                passwordErrors:[]
            },
            isValid:false
        }
        this.imageInputRef = React.createRef();
        this.emailInputRef = React.createRef();
        this.currentPasswordInputRef = React.createRef();
        this.newPasswordInputRef =  React.createRef();
        this.newPasswordVerifyInputRef = React.createRef();
    }

    validate= ()=>{
        const {email, password, passwordVerify} = this.state;
        const errors = {
            emailErrors:[], 
            passwordErrors :[],
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
        if(password.trim() === ""){
            errors.passwordErrors.push("Password cannot be Empty")
            isValid = false;
        }
        if(password.length < 7){
            errors.passwordErrors.push("Password must be atleast 7 characters")
            isValid = false;
        }
        if(password !==passwordVerify){
            errors.passwordErrors.push("Passwords do not match")
            isValid = false;
        }
        this.setState({
            isValid,
            errors
        })
    }

    onPasswordSubmit = async(e)=>{
        e.preventDefault();
        const np = this.newPasswordVerifyInputRef.current.value;
        const npv = this.newPasswordInputRef.current.value;
        if(np!== npv){
            alert("Passwords Do Not Match");
            return;
        }
        const cp = this.currentPasswordInputRef.current.value;
        try{
            await updatePassword(cp, np);
            alert("Password Changed! Please Login Again");
            logout();
            this.props.history.push("/login");
        }catch(error){
            alert("Password sholud be atleast 7 characters long");
        }
    }
    updatePasswordVerify = ()=>{
        this.setState({
            passwordVerify:this.newPasswordVerifyInputRef.current.value
        }, this.validate)
    }

    updatePassword=()=>{
        this.setState({
            password:this.newPasswordInputRef.current.value
        },this.validate)
    }
    updateEmail = ()=>{
        this.setState({
            email:this.emailInputRef.current.value
        },this.validate)
    }

    onFileSelection = (e)=>{
        this.setState({image:e.target.files[0]})
    }

    onEmailSubmit = async (e)=>{
        e.preventDefault();
        try{
            await updateUserEmail(this.state.email)
            alert("Email Changed");
            this.componentDidMount();
            this.props.history.push("/profile")
        }catch(error){
            alert("Enter Valid Email");
        }   
    }

    onFormSubmit = async (e)=>{
        e.preventDefault(); // Stop form submit
        
        try{
            await setProfileNavbar(this.state.image);
            alert("Profile Image Updated");
            this.componentDidMount();
            this.props.history.push("/");
            window.location.reload();
        }catch(error){
            alert("Only .jpg, .jpeg and .png files less than 2MB size are allowed");
        }
    }

    componentDidMount = async ()=> {
        try{
            let profile = await getProfile();
            console.group(profile);
            let url = undefined;
            if(profile.user.avatar){
                url = `${baseURL}/users/${profile.user._id}/avatar`;
            }
            await this.setState({
                profile:profile,
                Status:'Fetched',
                imageURL:url || this.state.imageURL
            })
        }catch(error){
            alert("Cannot Get Profile");
        }
    }

    
    render() {
        const {profile, imageURL} = this.state;
        let el = {};
        // eslint-disable-next-line default-case
        switch(this.state.Status){
            case 'Fetching' : el = "Fetching User Profile"
                                break;
            case 'Fetched' : el = (
                        <div>
                            <Route path="/profile" exact={true}>
                                <div className="card w-50 mt-5 mx-auto h-25" >
                                    <img className="card-img-top rounded img-thumbnail w-50 m-auto" src={imageURL} alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title h3 breadcrumb">Name : {profile.user.name.toUpperCase()}</h5>
                                        <p className="card-text h3 breadcrumb">Email : {profile.user.email}</p>
                                        <form className="form-group row alert alert-info" onSubmit={this.onFormSubmit} encType="multipart/form-data">
                                            <label forhtml="avatar" className="col-form-label">Update Profile Picture</label>
                                            <input type="file" name="avatar" className="form-control-file" onChange={this.onFileSelection}/>
                                            <button className="btn btn-primary w-100 mt-3">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </Route>
                            <div>
                                <Switch>
                                
                                    <Route path='/profile/password' exact={true}>
                                        <div>
                                            <form onSubmit={this.onPasswordSubmit} className="alert alert-info w-50 m-5 mx-auto">
                                                        <div className="alert alert-dark" role="alert">
                                                            Change Password
                                                        </div>
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                {/* set defaultValue to default email */}
                                                                <span className="input-group-text" id="inputGroup-sizing-default">Old Password</span>
                                                            </div>
                                                            <input type="password"  ref={this.currentPasswordInputRef} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" required/>
                                                        </div>
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                {/* set defaultValue to default email */}
                                                                <span className="input-group-text" id="inputGroup-sizing-default">New Password</span>
                                                            </div>
                                                            <input type="password"  ref={this.newPasswordInputRef} onChange={this.updatePassword} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" required/>
                                                        </div>
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                {/* set defaultValue to default email */}
                                                                <span className="input-group-text" id="inputGroup-sizing-default">Confirm New Password</span>
                                                            </div>
                                                            <input type="password"  ref={this.newPasswordVerifyInputRef} onChange={this.updatePasswordVerify} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" required/>
                                                        </div>
                                                        <button className="btn btn-primary w-100 mt-3">Submit</button>
                                                        {this.state.errors.passwordErrors.map( err => <div className="alert alert-danger alert">{err}</div> )}
                                            </form>
                                        </div>
                                    </Route>
                                </Switch>
                            </div>

                        </div>
            )
                    break;
        }
        
        return (
            <BrowserRouter>
            <div>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-3">Profile Page</h1>
                        
                        <hr className="my-2"/>
                        
                        <div>
                            <Link to="/profile" className="btn btn-primary mr-2" exact="true">View Profile</Link>
                            <Link to="/profile/password" className="btn btn-primary mr-2 ml-2" exact="true">Change Password</Link> 
                        </div>
                    </div>
                </div>
                    
                                <div>
                                    {el}
                                </div>
                </div>
                </BrowserRouter>
            
        );
    }
}
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default Profile;


