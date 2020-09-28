import React, { Component } from 'react';
import Meetings from './Meetings'
import {addMeeting} from "../services/meetings.js"
import {getEmail} from "../services/auth.js"
import {getEmails} from "../services/meetings.js"
import { Route, Link, Switch } from 'react-router-dom';
const moment = require('moment');



class AddMeeting extends Component {

    constructor(props){
        super(props);
        this.state = {
         dateOfMeeting:moment().format('DD/MM/YYYY'),
         startHour : 0 ,
         startMin : 0 , 
         endHour: 0, 
         endMin :0, 
         description : "",
         emails:[],
         errors: {
             startHourErrors:[],
             startMinErrors:[],
             endHourErrors:[],
             endMinErrors:[],
             descErrors:[],
             emailErrors:[]
         },
         isValid: false
        }
        this.dateInputRef = React.createRef();
        this.shInputRef = React.createRef();
        this.smInputRef = React.createRef();
        this.ehInputRef =React.createRef();
        this.emInputRef = React.createRef();
        this.descInputRef = React.createRef();
        this.emailInputRef = React.createRef();
        this.state.emails.push(getEmail());
        
    }

    createEmailArray = ()=>{
        let emailsArray = this.emailInputRef.current.value;
        let emailsArr = emailsArray.split(',');
        emailsArr = emailsArr.filter(email=>email!=="")
        return emailsArr;
    }
    validate = async ()=>{
        const {startHour, startMin, endHour, endMin, description,email} = this.state;
        const errors = {
            startHourErrors:[],
             startMinErrors:[],
             endHourErrors:[],
             endMinErrors:[],
             descErrors:[],
             emailErrors:[]
        }

        let isValid = true;

        if(!startHour){
            errors.startHourErrors.push("Cannot Be Empty")
            isValid = false;
        }
        if(startHour<0 || startHour>=23){
            errors.startHourErrors.push("Start Hour should be between 0 and 23")
            isValid = false;
        }
        if(!endHour){
            errors.endHourErrors.push("Cannot Be Empty")
            isValid = false;
        }
        if(endHour<0 || endHour>=23){
            errors.endHourErrors.push("End Hour should be between 0 and 23")
            isValid = false;
        }
        if(!startMin){
            errors.startMinErrors.push("Cannot Be Empty")
            isValid = false;
        }
        if(startMin<0 || startMin>=59){
            errors.startMinErrors.push("Start Min should be between 0 and 59")
            isValid = false;
        }
        if(!endMin){
            errors.endMinErrors.push("Cannot Be Empty")
            isValid = false;
        }
        if(endMin<0 || endMin>=59){
            errors.endMinErrors.push("End Min should be between 0 and 59")
            isValid = false;
        }
        if( description.trim() === "" ) {
            errors.descErrors.push( 'Description cannot be empty' );
            isValid = false;
        }
        if(endHour < startHour){
            errors.endHourErrors.push('End Hour must be greater than Start Hour');
            isValid = false;
        }
        if(startHour > endHour){
            errors.startHourErrors.push("Start Hour cannot be lesser than End Hour");
            isValid = false;
        }
        
        this.setState({
            isValid,
            errors
        })
    }
    
    updateCredentials =()=>{
        this.setState({
            dateOfMeeting:moment(new Date(this.dateInputRef.current.value)).format('DD/MM/YYYY'), 
            startHour:Number(this.shInputRef.current.value),
            startMin:Number(this.smInputRef.current.value),
            endHour:Number(this.ehInputRef.current.value),
            endMin:Number(this.emInputRef.current.value),
            description:this.descInputRef.current.value,
        }, this.validate)
    }

    addMeetingFunction = async (event)=>{
        event.preventDefault();
        try{
            const emailsArr = await this.createEmailArray();
            await this.setState({
                emails:emailsArr
            })
            await addMeeting(this.state);
            alert("Meeting Submitted");
            this.props.history.push("/meetings")
        }catch(error){
            alert("Enter Valid Meeting Data");
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row my-4">
                    <div className="col-12">
                        <h3>
                            Add Meeting
                        </h3>
                        <hr />
                    </div>
                </div>
                <div className="col-12">
                    <form onSubmit={this.addMeetingFunction}>
                        <div className="form-group row">
                            <label htmlFor="date" className="col-sm-3 col-form-label">Date</label>
                            <div className="col-sm-9">
                                <input type="date" className="form-control" name="date" id="date" placeholder="Select Date" ref={this.dateInputRef} onChange={this.updateCredentials}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="startTime" className="col-sm-3 col-form-label">Start Time</label>
                            <div className="col-sm-9">
                                <input type="number" className="form-control" name="startHour" id="startHour" placeholder="Enter Start Hours" ref={this.shInputRef} onChange={this.updateCredentials}  required/>
                                {this.state.errors.startHourErrors.map( err => <div className="alert alert-danger alert-sm">{err}</div> )}
                                <input type="number" className="form-control" name="startMin" id="startMin" placeholder="Enter Start Minutes" ref={this.smInputRef} onChange={this.updateCredentials} required/>
                                {this.state.errors.startMinErrors.map( err => <div className="alert alert-danger">{err}</div> )}
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="endTime" className="col-sm-3 col-form-label">End Time</label>
                            <div className="col-sm-9">
                                <input type="number" className="form-control" name="endHour" id="endHour" placeholder="Enter Ending Hours" ref={this.ehInputRef} onChange={this.updateCredentials} required/>
                                {this.state.errors.endHourErrors.map( err => <div className="alert alert-danger">{err}</div> )}
                                <input type="number" className="form-control" name="endMin" id="endMin" placeholder="Enter Ending Minutes" ref={this.emInputRef} onChange={this.updateCredentials} required/>
                                {this.state.errors.endMinErrors.map( err => <div className="alert alert-danger">{err}</div> )}
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="emails" className="col-sm-3 col-form-label">Emails of Attendees</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="emails" id="emails" placeholder="john@example.com,jane@example.com" ref={this.emailInputRef} onChange={this.updateCredentials} />
                                {this.state.errors.emailErrors.map( err => <div className="alert alert-danger">{err}</div> )}

                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="description" className="col-sm-3 col-form-label">Description</label>
                            <div className="col-sm-9">
                                <textarea className="form-control" id="description" name="description" rows="3" placeholder="What is the Agenda of the meeting?" ref={this.descInputRef} onChange={this.updateCredentials} required></textarea>
                                {this.state.errors.descErrors.map( err => <div className="alert alert-danger">{err}</div> )}
                            </div>
                        </div>
                        <div className="form-group row">
                            <button className="btn btn-primary btn-lg w-100">Submit</button>
                        </div>
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
export default AddMeeting;