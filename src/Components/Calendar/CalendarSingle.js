import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./calendar-list.css";
import { splitMap } from "../Misc/Helper";
import moment from "moment";
import BSModal from "../Misc/BSModal";
import CSSTransitionGroup from "react-addons-css-transition-group";
import axios from "axios";

class CalendarSingle extends Component {
  componentWillMount() {
    let pathUUID = this.props.location.pathname;
    if (pathUUID.indexOf("/event/" !== -1)) {
      var UUID = pathUUID.slice(7);
      this.fetchSingleEvent(UUID);
    }
  }

  fetchSingleEvent(UUID) {
    //alert(UUID);
    const self = this;
    axios
      .get(
        "http://finley-day.com/api/calendar/views/calendar_json.json?uuid=" +
          UUID
      )
      //http://alphawcc.dev/api/calendar/views/calendar_json.json?parameters[uuid]=97014f68-b7d3-4d9f-89c4-869e58d9c8ac
      .then(function(response) {
        self.setState({
          events: response.data,
          loaded: true
        });
      });
  }

  // Render endTime only if differs to startTime
  // renderTime() {
  //   let startTime = moment(eventItem.date).format('h:ma');
  //   let endTime = moment(eventItem.end_date).format('h:ma');
  //     if (startTime === endTime) {
  //       return(
  //         <span>{startTime}</span>
  //       );
  //     }
  //       else {
  //         return(
  //         <span>{startTime} to {endTime}</span>
  //       );
  //     }
  //   }

  render() {
    var eventItem;

    try {
      if (typeof this.state.events !== "undefined") {
        eventItem = this.state.events[0];
      }
    } catch (e) {
      return <div />;
    }

    try {
      if (typeof this.props.location.state.events !== "undefined") {
        eventItem = this.props.location.state.events;
      }
    } catch (e) {}

    try {
      if (typeof this.props.history.event !== "undefined") {
        eventItem = this.props.history.event;
      }
    } catch (e) {}

    return (
      <CSSTransitionGroup
        component="div"
        transitionName="row"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionLeaveTimeout={500}
        transitionEnterTimeout={500}
        className="content exercise-list container"
      >
        {/*<div className="content exercise-list container"> */}
        <div className="sp-breadcrumbs" />
        <div className="sp-head row">
          <Link to="/" className="go-up icon-arrow-left" />
          <h1>
            {eventItem.title}
          </h1>
        </div>
        <div className="event-row clearfix">
          <div className="col-xs-2">
            <div className="date-info pull-left">
              <div className="custom-dayOfWeek">
                {moment(eventItem.date).format("ddd")}
              </div>
              <div className="custom-day">
                {moment(eventItem.date).format("D")}
              </div>
              <div className="custom-month">
                {moment(eventItem.date).format("MMM")}
              </div>
              <div className="custom-year">
                {moment(eventItem.date).format("YYYY")}
              </div>
            </div>
          </div>

          <div className="event-info col-xs-7">
            <div>
              {/*{ this.renderTime() } */}
              <br />
              <BSModal
                buttonLabel={eventItem.location}
                map={
                  "https://www.google.com/maps/embed/v1/place?key=AIzaSyD8cbhTTREwAxNI3IxRLwMGfE1xb_eOINc&q=" +
                  eventItem.location
                }
              />

              <section>
                <h4>Price</h4>
                {eventItem.price}
              </section>

              <section>
                <h4>How to Book</h4>
                {eventItem.how_to_book}
              </section>

              <hr />

              <section>
                {eventItem.body}
              </section>
            </div>
            <div />
            <br />
            {splitMap(eventItem.event_type, ", ", "event-item")}
            <br />
            <div className="clearfix" />

            {splitMap(eventItem.audience, ", ", "audience-item")}

            <div className="clearfix" />
            <div className="clearfix" />

            <Link to="/">Back to All Events</Link>
          </div>

          <div className="col-xs-3">
            <div>
              <img
                src={eventItem.featured_image}
                alt={eventItem.featured_image_alt_text}
              />
            </div>
          </div>
        </div>
      </CSSTransitionGroup>
    );
  }
}

export default CalendarSingle;
