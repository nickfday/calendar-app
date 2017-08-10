import React, { Component } from "react";
import axios from "axios";
import "./style/DemoCalendarRow.css";
import BSModal from "../Misc/BSModal";
import CSSTransitionGroup from "react-addons-css-transition-group";
import { Link } from "react-router-dom";
import moment from "moment";
import { splitMap } from "../Misc/Helper";
var Loader = require("react-loader");

const DisplaySingleEvent = props => {
  const item = props.event;
  const startDate = props.startDate;
  const endDate = props.endDate;

  return (
    <div className="content exercise-list container">
      <div className="sp-breadcrumbs wcc-breadcrumb">
        <a href="http://finley-day.com">Home</a>
        &nbsp;>&nbsp;
        <Link to="/">Events</Link>
      </div>

      <div className="sp-head row">
        <Link to="/" className="go-up icon-arrow-left" />
        <h1>
          {props.event.title}
        </h1>
      </div>

      <div className="inner-content">
        <CSSTransitionGroup
          component="div"
          transitionName="row"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionLeaveTimeout={500}
          transitionEnterTimeout={500}
          className="event-row clearfix"
        >
          <div className="col-xs-2">
            <div className="date-info">
              <div className="custom-dayOfWeek">
                {moment(startDate).format("ddd")}
              </div>
              <div className="custom-day">
                {moment(startDate).format("D")}
              </div>
              <div className="custom-month">
                {moment(startDate).format("MMM")}
              </div>
              <div className="custom-year">
                {moment(startDate).format("YYYY")}
              </div>
            </div>
          </div>

          <div className="event-info col-xs-10">
            <h3>
              {props.event.title}
            </h3>
            <p dangerouslySetInnerHTML={{ __html: props.event.body }} />
            <BSModal
              buttonLabel={item.location}
              map={
                "https://www.google.com/maps/embed/v1/place?key=AIzaSyD8cbhTTREwAxNI3IxRLwMGfE1xb_eOINc&q=" +
                item.location
              }
            />
            {splitMap(item.event_type, ", ", "event-item")}
            <br />
            <div className="clearfix" />
            {splitMap(item.audience, ", ", "audience-item")}
          </div>
        </CSSTransitionGroup>
      </div>
    </div>
  );
};

class DemoCalendarSingle extends Component {
  constructor() {
    super();
    this.state = {
      events: null,
      fetchEvents: null,
      startDate: null,
      endDate: null
    };
  }

  componentDidMount() {
    if (!this.props.location.state) {
      console.log("Fetch...");
      let pathUUID = this.props.location.pathname;
      if (pathUUID.indexOf("/event/" !== -1)) {
        var UUID = pathUUID.slice(7);
        this.fetchSingleEvent(UUID);
      }
    } else {
      console.log("Props Found");
      this.setState({
        events: this.props.location.state
      });
      //this.setItemValue(this.props.location.state, "events");
    }
  }

  // setItemValue(data, stateObject) {
  //   console.log("set item value");
  //   console.log(data);
  //   // this.setState((prevState, props) => ({
  //   //   events: data
  //   // }));
  //   this.setState({
  //     stateObject: data
  //   });

  //   console.log(this.state);
  // }

  fetchSingleEvent(UUID) {
    //alert(UUID);
    console.log(UUID);
    const self = this;
    axios
      .get(
        "http://finley-day.com/api/calendar/views/calendar_json.json?uuid=" +
          UUID
      )
      .then(response => {
        this.setState({
          fetchEvents: response.data
        });
        // self.setState((prevState, props) => ({
        //   fetchEvents: response.data
        // }));

        // self.setState((prevState, props) => ({
        //   events: response.data,
        //   loaded: true
        // }));
        //self.setItemValue(response.data, "fetchEvents");
      })
      .catch(function(error) {
        console.log(error);
      })
      .then(function(response) {
        self.handleEventDate(self);
      });
  }

  handleEventDate(self) {
    //const self = this;
    var updatedevents = self.state.fetchEvents.slice();
    updatedevents.map(function(i) {
      if (i.date_repeat) {
        i.splitDates = [];
        i.sortedDates = [];
        i.splitDates.push(i.date_repeat.split(", "));
        i.splitDates[0].map(function(y) {
          i.sortedDates.push(y.split(" to "));
          return null;
        });
        return null;
      }
      return null;
    });

    self.setState(() => ({
      fetchEvents: updatedevents
    }));
  }

  render() {
    if (this.state.events !== null) {
      return (
        <DisplaySingleEvent
          event={this.state.events.events}
          startDate={this.state.events.startDate}
          endDate={this.state.events.endDate}
        />
      );
    } else if (this.state.fetchEvents !== null) {
      console.log("Display Fetched...");
      return (
        <DisplaySingleEvent
          event={this.state.fetchEvents[0]}
          startDate={this.state.fetchEvents[0].sortedDates[0][0]}
          endDate={this.state.fetchEvents[0].sortedDates[0][1]}
        />
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}
export default DemoCalendarSingle;
