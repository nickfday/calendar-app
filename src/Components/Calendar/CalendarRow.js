import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './calendar-list.css';
import { Button, Modal } from 'react-bootstrap';


class CalendarRow extends Component {

  constructor(props) {
    super();
    this.state = {
      showModal: false
    }
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  close() {
    //event.preventDefault();
    this.setState({ showModal: false });
  }

  open() {
    //event.preventDefault();
    this.setState({ showModal: true });
  }

  render() {
    const event = this.props.events;
    const eventURL = event.uuid.replace(/\s+/g, '-').toLowerCase();

    //extract year
    const eventYear = event.date.slice(0,4);
    //extract day
    const eventDay = event.date.slice(8, 11);
    //extract month
    const eventMonth = event.date.slice(5,7);
    //extract time
    const eventTime = event.date.slice(11,16);

    let audienceItem = event.audience.split(',').map(function(element){
      console.log('element: ' + element);
      return(
        <div className="audience-item">
          {element}
        </div>
        );
    });

    let eventItem = event.event_type.split(',').map(function(element){
      console.log('element: ' + element);
      return(
        <div className="event-item">
          {element}
        </div>
        );
    });


    //event.audienceSeperated

    return (
      <div className="event-row clearfix">
        <div className="col-xs-2">
          <div className="date-info pull-left">
            <div className="custom-dayOfWeek">
              Thu      </div>
            <div className="custom-day">
              {eventDay}      </div>
            <div className="custom-month">
              {eventMonth}      </div>
            <div className="custom-year">
              {eventYear}      </div>
          </div>
        </div>

        <div className="event-info col-xs-7">
         <h3>
           <Link to={{
             pathname: `/event/${eventURL}`,
             state: { events: event}
              }}>{event.title}
           </Link>
         </h3>
         <br />
         <div>
           {event.body}...
           <Link to={{
           pathname: `/event/${eventURL}`,
           state: { event: event}
            }}>Read More
         </Link>
         </div>
          <br />
         {/*<div>
          {eventDay} {eventMonth} {eventYear} {eventTime}
         </div> */}
          <br />
         <div>


         <div className="cursor-pointer" onClick={this.open}>
         <span className="glyphicon glyphicon-globe" aria-hidden="true"></span> {event.location}
         </div>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{event.location}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <iframe width="100%" height="400" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src="https://maps.google.com/maps?hl=en&amp;q=' + {event.location} + '&amp;z=14&amp;t=m&amp;output=embed">
             </iframe>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
         </div>
          <br />
         {eventItem}
          <br />
          <div className="clearfix"></div>

          {audienceItem}


      </div>

       <div className="col-xs-3">
       <div>
           <img src={event.featured_image} />
         </div>
       </div>


      </div>

    );
  }
}

CalendarRow.propTypes = {
  todo: PropTypes.object
}

export default CalendarRow;