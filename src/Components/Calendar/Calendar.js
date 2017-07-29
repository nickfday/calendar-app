import React, { Component } from "react";
import Filter from "./Filter/Filter";
import axios from "axios";
import { Link } from "react-router-dom";
import CalendarList from "./CalendarList";
var Loader = require("react-loader");

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      loaded: false,
      titleText: "",
      addressText: "",
      eventTypes: [],
      audienceTypes: [],
      selectedAudienceTypes: "",
      selectedEventTypes: "",
      startDate: null,
      endDate: null,
      isListViewOn: true,
      visibleEvents: []
    };

    //test

    this.handleCalendarViewSwitch = this.handleCalendarViewSwitch.bind(this);
    this.handleTitleTextInput = this.handleTitleTextInput.bind(this);
    this.handleAddressTextInput = this.handleAddressTextInput.bind(this);
    this.handleEventTypeInput = this.handleEventTypeInput.bind(this);
    this.handleSelectedEventTypes = this.handleSelectedEventTypes.bind(this);
    this.handleAudienceInput = this.handleAudienceInput.bind(this);
    this.handleSelectedAudienceTypes = this.handleSelectedAudienceTypes.bind(
      this
    );
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);

    this.handleReset = this.handleReset.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  handleCalendarViewSwitch() {
    this.setState(prevState => ({
      isListViewOn: !prevState.isListViewOn
    }));
  }

  handleStartDate(startDate) {
    this.setState({
      startDate: startDate
    });
  }

  handleEndDate(endDate) {
    this.setState({
      endDate: endDate
    });
  }

  handleTitleTextInput(titleText) {
    this.setState({
      titleText: titleText
    });
  }

  handleAddressTextInput(addressText) {
    this.setState({
      addressText: addressText
    });
  }

  handleEventTypeInput(eventType) {
    this.setState({
      eventType: eventType
    });
  }

  handleSelectedEventTypes(selectedEventTypes) {
    this.setState({
      selectedEventTypes: selectedEventTypes
    });
  }

  handleSelectedAudienceTypes(selectedAudienceTypes) {
    this.setState({
      selectedAudienceTypes: selectedAudienceTypes
    });
  }

  handleAudienceInput(audience) {
    this.setState({
      audience: audience
    });
  }

  handleSelectTextInput(primaryMuscle) {
    this.setState({
      primaryMuscle: primaryMuscle
    });
  }

  handleReset(event) {
    event.preventDefault();
    this.setState({
      titleText: "",
      addressText: "",
      selectedEventTypes: "",
      selectedAudienceTypes: "",
      startDate: null,
      endDate: null
    });
  }

  handleSort(col) {
    this.state.events.sort(function(a, b) {
      if (a[col] < b[col]) return -1;
      if (a[col] > b[col]) return 1;
      return 0;
    });
    this.setState({
      events: this.state.events
    });
  }

  getEvents() {
    const self = this;
    axios
      .get(
        "http://nick:eventcalendar@finley-day.com/api/calendar/views/calendar_json.json"
      )
      .then(function(response) {
        self.setState({
          events: response.data,
          loaded: true
        });
      })
      .catch(function(error) {
        console.log(error);
      })
      .then(function(response) {
        self.handleEventDate(self);
        self.getEventTypes(self);
        self.getAudienceTypes(self);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleEventDate(self) {
    //const self = this;
    var updatedevents = self.state.events.slice();
    updatedevents.map(function(i) {
      i.splitDates = [];
      i.sortedDates = [];
      i.splitDates.push(i.date_repeat.split(", "));
      i.splitDates[0].map(function(y) {
        i.sortedDates.push(y.split(" to "));
        return null;
      });
      return null;
      //i.date = i.sortedDates;
    });

    self.setState({
      events: updatedevents
      //events: null
    });
  }

  getEventTypes() {
    let eventTypes = [];
    this.state.events.map(eventItem => {
      if (eventItem.event_type) {
        eventItem.event_type.split(", ").map(eventType => {
          if (eventTypes.indexOf(eventType) === -1) eventTypes.push(eventType);
          return false;
        });
        return false;
      }
      return false;
    });

    this.setState({
      eventTypes
    });
  }

  getAudienceTypes() {
    let audienceTypes = [];
    this.state.events.map(eventItem => {
      eventItem.audience.split(", ").map(audienceType => {
        if (audienceTypes.indexOf(audienceType) === -1)
          audienceTypes.push(audienceType);
        return false;
      });
      return false;
    });
    this.setState({
      audienceTypes
    });
  }

  componentWillMount() {
    this.getEvents();
  }

  render() {
    return (
      <div className="content exercise-list container">
        <div className="sp-breadcrumbs" />
        <Loader type="ball-pulse" loaded={this.state.loaded}>
          <div className="sp-head row">
            <Link to="/" className="go-up icon-arrow-left" />
            <h1>Events</h1>
          </div>

          <div className="row margin-bottom-20">
            <div className="col-sm-9">
              <p>
                Browse the events calendar to find out about big council-run
                events. We also list a wide variety of groups, meet-ups, classes
                and workshops run by and on behalf of the Westminster community.
              </p>
            </div>
            <div className="col-sm-3 text-right">
              <button
                className="btn btn-primary"
                onClick={this.handleCalendarViewSwitch}
              >
                {this.state.isListViewOn
                  ? "Switch to Calendar View"
                  : "Switch to List View"}
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-3">
              <Filter
                calenderState={this.state}
                titleText={this.state.titleText}
                addressText={this.state.addressText}
                onTitleTextInput={this.handleTitleTextInput}
                onAddressTextInput={this.handleAddressTextInput}
                onEventTypeInput={this.handleEventTypeInput}
                onAudienceInput={this.handleAudienceInput}
                eventTypes={this.state.eventTypes}
                audienceTypes={this.state.audience}
                handleSelectedEventTypes={this.handleSelectedEventTypes}
                selectedEventTypes={this.state.selectedEventTypes}
                handleSelectedAudienceTypes={this.handleSelectedAudienceTypes}
                selectedAudienceTypes={this.state.selectedAudienceTypes}
                handleReset={this.handleReset}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                handleStartDate={this.handleStartDate}
                handleEndDate={this.handleEndDate}
              />
            </div>

            <div className="col-sm-9">
              <CalendarList
                events={this.state}
                handleReset={this.handleReset}
                history={this.props.history}
                location={this.props.location}
                props={this.props}
              />
            </div>
          </div>
        </Loader>
      </div>
    );
  }
}

export default Calendar;
