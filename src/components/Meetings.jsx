import React, { Component } from 'react';
import {getMeetings} from "../services/meetings.js"
import { Route, Link, Switch, BrowserRouter } from 'react-router-dom';
import AddMeeting from "./AddMeeting"
import SearchMeetings from "./SearchMeetings"
import {getEmails} from "../services/meetings.js"

class Meetings extends Component {

    
    render() {
        return (
            <BrowserRouter>
            <div>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-3">Meetings</h1>
                        
                        <hr className="my-2"/>
                        
                        <div>
                            <Link to="/meetings" className="btn btn-primary mr-2">Filter/Search Meetings</Link> 
                            <Link to="/meetings/add" className="btn btn-primary ml-2">Add Meeting</Link>
                        </div>
                        
                    </div>
                </div>
                <div>
                            <Switch>
                                <Route path='/meetings/add' component={AddMeeting}>
                                </Route>
                                <Route path="/meetings"  component={SearchMeetings}>
                                </Route>
                            </Switch>
                         </div>
                </div>
                </BrowserRouter>
        );
    }
}

export default Meetings;