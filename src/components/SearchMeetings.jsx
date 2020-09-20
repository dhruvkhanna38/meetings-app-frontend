/* eslint-disable default-case */
import React, { Component } from 'react';
import {getMeetings, getEmails} from '../services/meetings.js'
import {getMeetingsByDateAndDesc, removeUser, addUser} from "../services/meetings.js"
import Meetings from './Meetings'

class SearchMeetings extends Component {
    constructor(props){
        super(props);
        this.state = {
            Status: "Fetching",
            Meetings:'',
            viewDate: 'All',
            description:'',
            emails:null
        }
        this.viewDateInputRef = React.createRef()
        this.descInputRef = React.createRef()
        
    }

    updateCredentials= ()=>{
        this.setState({
            viewDate:this.viewDateInputRef.current.value,
            description:this.descInputRef.current.value
        })
    }

    getMeetingsFunction = async (event)=>{
        event.preventDefault();
        this.componentDidMount();
    }

    addMemberHelper = async (id, email)=>{
        try{
            await addUser(id, email);
            alert("User Added");
            this.componentDidMount();
        }catch(error){
            alert("Error Adding User");
        }
    }

    removeUserHelper = async (id)=>{
        try{
            await removeUser(id);
            alert("User Excused");
            this.componentDidMount();
        }catch(error){
            alert("Error Excusing User");
        }
    }

    componentDidMount= async ()=>{
        try{
                let emailsArr = [];
                let emails = await getEmails();
                emails.forEach(email=>{
                    emailsArr.push(email.email);
                });
                await this.setState({
                    emails:emailsArr
                });

                let meetings = await getMeetingsByDateAndDesc(this.state.viewDate, this.state.description)
                await this.setState({
                    Meetings:meetings,
                    Status:'Fetched'
                });
            }catch(error){
                alert("Enter Valid Search Parameters");
            }
    }

        render(){
            let el = {};
            switch(this.state.Status){
                case 'Fetching' : el = this.state.Status;
                                    break;
                case 'Fetched' : el = (
                    this.state.Meetings.map((meeting, i)=>{
                        return (
                            <div className="container mt-2 mb-2" key={meeting._id}>
                                <div className="card" >
                                    <div className="card-header">
                                        {meeting.description}
                                    </div>
                                <div className="card-body">
                                    <div className="card" >
                                            <div className="card-header">
                                                Members
                                            </div>
                                            <ul className="list-group list-group-flush">
                                                {meeting.emails.map(email=><li className="list-group-item" key={email}>{email}</li>)}
                                            </ul>
                                    </div>
                                <h5 className="card-title alert alert-primary mt-2">Timings: {meeting.startHour}:{meeting.startMin} - {meeting.endHour}:{meeting.endMin}</h5>
                                <p className="card-text alert alert-success">Date: {meeting.dateOfMeeting}</p>
                                <button className="btn btn-danger mb-5" onClick={()=>{this.removeUserHelper(meeting._id)}}>Excuse Yourself</button>
                                <div className="form-group alert alert-primary">
                                <label forhtml="viewDate">Select Members</label>
                                <select className="form-control" id={meeting._id} name="members">
                                                    {this.state.emails.map(email=>{
                                                        return <option>{email}</option>
                                                    })}
                                </select>
                                <button className="btn btn-primary mt-2" onClick={()=>{this.addMemberHelper(meeting._id,document.getElementById(`${meeting._id}`).value)}}>Add Members</button>
                                        </div>
                                    </div>
                                </div>
                        </div>
                      )
                    })
                );
            }
            return(
                <div className="container">
                <div className="row my-4">
                    <div className="col-12">
                        <h3>
                            Search For Meetings
                        </h3>
                        <hr />
                    </div>
                </div>
                <div className="col-12">
                    <form onSubmit={this.getMeetingsFunction}>
                        <div className="form-group row">
                            <label forhtml="viewDate" className="col-sm-3 col-form-label">View Meetings For</label>
                            <select className="form-control col-sm-9" id="viewDate" name="viewDate" ref={this.viewDateInputRef} onChange={this.updateCredentials}>
                                <option>All</option>
                                <option>Today</option>
                                <option>Past</option>
                                <option>Upcoming</option>
                            </select>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="search" className="col-sm-3 col-form-label">Search For</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="search" id="search" 
                                ref={this.descInputRef} onChange={this.updateCredentials}
                                placeholder="Search using words which describe the meeting" />
                            </div>
                        </div>
                        
                        <div className="form-group row">
                            <button className="btn btn-primary w-100">Submit</button>
                        </div>
                    </form>
                </div>
                <div>
                        {el}         
                </div>
            </div>
            )
        }
}

export default SearchMeetings;