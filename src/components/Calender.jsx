import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Component } from 'react';
import {getMeetingByDate} from "../services/meetings.js";
import {getMeetings} from "../services/meetings.js";
import "./main.css"

const moment = require("moment");



export default class DemoApp extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            Status:'Fetching',
            Meetings : null,
            weekendsVisible: true,
            eventsArr:[]
        } 
    }
    componentDidMount=  async ()=>{
        try{
            const meetings = await getMeetings();
            
            let eventsArr = [];
            
            meetings.forEach(meeting=>{
                eventsArr.push({title:meeting.description, 
                                date:meeting.dateOfMeeting.split("/").reverse().join("-"), 
                                time:`${meeting.startHour}:${meeting.startMin} - ${meeting.endHour}:${meeting.endMin}`, 

                                
                                })
            });
            
            await this.setState({
                Status:'Fetched',
                Meetings:meetings,
                eventsArr: eventsArr
            })
            
        }catch(error){
            alert("Invalid Date");
        }
    }

  render() {
    return (
      <div className='demo-app'>
        {this.renderSidebar()}
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            eventTimeFormat=  {{
                hour: "numeric",
                minute: "2-digit",
                meridiem: "short"}}
            events = {this.state.eventsArr}
            selectMirror={true}
            dayMaxEvents={true}
            select={this.handleDateSelect}
            
             // custom render function
           //called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </div>
      </div>
    )
  }

  renderSidebar() {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>Your List Of Meetings</h2>
        </div>
        <div className='demo-app-sidebar-section'>
          
          <ul>
            {this.state.eventsArr.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
    )
  }



  
  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

}


function renderSidebarEvent(event) {
  return (
      <div className="alert alert-primary">
            <h4><b>{event.title}</b></h4>
            <p><i>Date : {event.date}</i></p>
            <i>Timings : {event.time}</i>
      </div>
    
  )
}
