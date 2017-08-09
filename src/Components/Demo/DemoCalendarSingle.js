import React, { Component } from "react";
import axios from "axios";
import "./style/DemoCalendarRow.css";
import BSModal from "../Misc/BSModal";
import CSSTransitionGroup from "react-addons-css-transition-group";
import { Link } from "react-router-dom";
import moment from "moment";
import { splitMap } from "../Misc/Helper";

class DemoCalendarSingle extends Component {
  constructor() {
    super();
    this.state = {
      events: null
    };
  }

  componentWillMount() {
    if (!this.props.location.state) {
      console.log("Fetch...");
      let pathUUID = this.props.location.pathname;
      if (pathUUID.indexOf("/event/" !== -1)) {
        var UUID = pathUUID.slice(7);
        this.fetchSingleEvent(UUID);
      }
    } else {
      console.log("Props Found");
      this.setItemValue(this.props.location.state);
    }
  }

  setItemValue(data) {
    console.log("set item value");
    console.log(data);
    // this.setState((prevState, props) => ({
    //   events: data
    // }));
    this.setState({
      events: data
    });
  }

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
        // self.setState((prevState, props) => ({
        //   events: response.data,
        //   loaded: true
        // }));
        self.setItemValue(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
    // .then(function(response) {

    // });
  }

  render() {
    console.log(this.state);

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
        <div className="col-xs-2">
          <div className="date-info">
            <div className="custom-dayOfWeek">
              {moment(this.state.events.startDate).format("ddd")}
            </div>
            <div className="custom-day">
              {moment(this.state.events.startDate).format("D")}
            </div>
            <div className="custom-month">
              {moment(this.state.events.startDate).format("MMM")}
            </div>
            <div className="custom-year">
              {moment(this.state.events.startDate).format("YYYY")}
            </div>
          </div>
        </div>

        <div className="event-info col-xs-7">
          <h3>
            {this.state.events.events.title}
          </h3>
          <div>
            {this.state.events.events.body}
          </div>
          <BSModal
            buttonLabel={this.state.events.events.location}
            map={
              "https://www.google.com/maps/embed/v1/place?key=AIzaSyD8cbhTTREwAxNI3IxRLwMGfE1xb_eOINc&q=" +
              this.state.events.events.location
            }
          />
          {splitMap(this.state.events.events.event_type, ", ", "event-item")}
          <br />
          <div className="clearfix" />
          {splitMap(this.state.events.events.audience, ", ", "audience-item")}
        </div>
        <Link to="/">Back to All Events</Link>
      </CSSTransitionGroup>
    );
  }
}
export default DemoCalendarSingle;
