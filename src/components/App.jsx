import React from 'react';
import NavBar from './NavBar';
import Home from "./Home";
import Login from "./Login";
import Meetings from "./Meetings";
import Signup from "./Signup";
import { Route, withRouter, BrowserRouter} from 'react-router-dom';
import Calender from "./Calender";
import Profile from "./Profile";

class App extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
        <BrowserRouter>
            <div>
                <NavBar />
                <Route path="/" exact component={Home}>
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
            </div>
        </BrowserRouter>
    );
    }
    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    
}

export default withRouter(App);