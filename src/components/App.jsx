/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import React from 'react';
import NavBar from './NavBar';
import ResponsiveDrawer from './Home'
import Login from "./Login";
import Meetings from "./Meetings";
import Signup from "./Signup";
import { Route, withRouter, BrowserRouter} from 'react-router-dom';
import Calender from "./Calender";
import Profile from "./Profile";
import VerifyEmail from "./VerifyEmail";

class App extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
        <BrowserRouter>
            <div>
                <NavBar />
                <Route path="/" exact component={ResponsiveDrawer}>
                </Route>
                <Route path="/login" exact component={Login}>
                </Route>
                <Route path="/meetings" component={Meetings}>
                </Route>
                <Route path="/signup" exact component={Signup}>
                </Route>
                <Route path="/calender" exact component={Calender}>
                </Route>
                <Route path="/profile" exact component={Profile}>
                </Route>
                <Route path="/verify-email" exact component={VerifyEmail}>
                </Route>
            </div>
        </BrowserRouter>
    );
    }
    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    
}

export default withRouter(App);