import React from 'react';
import { Link } from 'react-router-dom';
import {isLoggedIn, logout} from "../services/auth.js"
import { Redirect , withRouter} from 'react-router-dom'
import {getProfile} from "../services/meetings";

const baseURL = "https://calm-garden-60687.herokuapp.com";

class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            profileImg: "https://icons.iconarchive.com/icons/icons8/windows-8/48/Photo-Video-Slr-Back-Side-icon.png",
            name:''
        }
    }
    

    logoutFunction = async()=>{
        try{
            await logout();
            this.props.history.push("/");
        }catch(error){
            console.log("Error Logging Out");
        }
    }
    

    componentDidMount = async ()=> {
            const profile = await getProfile();
            let profileURL = undefined;
            if(profile.user.profileImage){
             profileURL = `${baseURL}/users/${profile.user._id}/profile`;
            }
            this.setState({
                profileImg:profileURL || this.state.profileImg,
                name:profile.user.name
            })
    }

    // b4-navbar-minimal-ul
    render (){
        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark">
            <ul className="nav navbar-nav">
                <li className="nav-item ">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
               <li className="nav-item ">
                  {isLoggedIn?<Link className="nav-link" to="/meetings">Meetings</Link>:''}
                </li>
                <li className="nav-item ">
                  {isLoggedIn?<Link className="nav-link" to="/calender">Calender</Link>:''}
                </li>
            </ul>
            <div className="ml-auto"> 
                <ul className="nav navbar-nav form-inline" >
                    <li className="nav-item ">
                    {!isLoggedIn?<Link className="nav-link" to="/login">Login</Link>:''}
                    </li>
                    <li className="nav-item ">
                    {!isLoggedIn?<Link className="nav-link" to="/signup">Signup</Link>:''}
                    </li>
                    <li className="nav-item ">
                        {isLoggedIn?<Link className="nav-link " to="/profile">{this.state.name}</Link>:''}
                    </li>
                    <li className="nav-item">
                      {isLoggedIn?<img src={this.state.profileImg} alt="Avatar" className="rounded-circle mr-2" />:''}
                    </li>
                    <li className="nav-item ml-4">
                        {isLoggedIn?<button onClick={this.logoutFunction} className="btn btn-sm btn-info">Logout</button>:''}
                    </li>
                </ul>
            </div>
        </nav>)
    }
}

export default withRouter(NavBar);