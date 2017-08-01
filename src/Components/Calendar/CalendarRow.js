import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./calendar-list.css";
import moment from "moment";
import { splitMap } from "../Misc/Helper";
import BSModal from "../Misc/BSModal";
import CSSTransitionGroup from "react-addons-css-transition-group";
import Spinner from "react-spinkit";

class CalendarRow extends Component {
  componentWillMount() {
    //alert('mount');
  }
  componentWillUpdate() {
    //getEventMoment();
  }

  getEventMoment() {
    if (this.props.events.sortedDates) {
      return moment(this.props.events.sortedDates[0][0]);
    }
  }

  render() {
    const event = this.props.events;

    const eventURL = event.uuid.replace(/\s+/g, "-").toLowerCase();
    let eventDateMoment = moment(event.date);

    //let eventDateMoment = this.getEventMoment();

    // console.log(event.sortedDates);

    return (
      <CSSTransitionGroup
        component="div"
        transitionName="row"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionLeaveTimeout={500}
        transitionEnterTimeout={500}
        className="event-row clearfix"
      >
        {/*<Spinner name="circle" fadeIn="quarter" /> */}
        <div className="col-xs-2">
          <div className="date-info">
            <div className="custom-dayOfWeek">
              {moment(eventDateMoment).format("ddd")}
            </div>
            <div className="custom-day">
              {moment(eventDateMoment).format("D")}
            </div>
            <div className="custom-month">
              {moment(eventDateMoment).format("MMM")}
            </div>
            <div className="custom-year">
              {moment(eventDateMoment).format("YYYY")}
            </div>
          </div>
        </div>

        <div className="event-info col-xs-7">
          <h3>
            <Link
              to={{
                pathname: `/event/${eventURL}`,
                state: { events: event }
              }}
            >
              {event.title}
            </Link>
          </h3>
          <br />
          Start Date: {event.sortedDates && event.sortedDates[0][0]} <br />
          <br />
          End Date: {event.sortedDates && event.sortedDates[0][1]}
          <div>
            {event.body}...
            <Link
              to={{
                pathname: `/event/${eventURL}`,
                state: { events: event }
              }}
            >
              Read More
            </Link>
          </div>
          <br />
          <br />
          <div>
            <BSModal
              buttonLabel={event.location}
              map={
                "https://www.google.com/maps/embed/v1/place?key=AIzaSyD8cbhTTREwAxNI3IxRLwMGfE1xb_eOINc&q=" +
                event.location
              }
            />
            <br />
            <br />
            <br />
          </div>
          <br />
          {splitMap(event.event_type, ", ", "event-item")}
          <br />
          <div className="clearfix" />
          {splitMap(event.audience, ", ", "audience-item")}
        </div>

        <div className="col-xs-3">
          <div>
            <img
              src={event.featured_image}
              alt={event.featured_image_alt_text}
            />
          </div>
        </div>
      </CSSTransitionGroup>
    );
  }
}

CalendarRow.propTypes = {
  todo: PropTypes.object
};

export default CalendarRow;
