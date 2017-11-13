import React, { Component } from 'react';
import Filter from './Filter/Filter';
import axios from 'axios';
import Scroll from 'react-scroll';
import CalendarList from './CalendarList';
import { Button, Glyphicon, Panel } from 'react-bootstrap';
import * as env from '../../env';
import { APIFetch } from './CalendarHelper';

import MediaQuery from 'react-responsive';

var Loader = require('react-loader');

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      events: [],
      loaded: false,
      titleText: '',
      addressText: '',
      eventTypes: [],
      audienceTypes: [],
      selectedAudienceTypes: '',
      selectedEventTypes: '',
      startDate: null,
      endDate: null,
      isListViewOn: true,
      visibleEvents: []
    };

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

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(pageNo) {
    this.setState({
      activePage: pageNo
    });
    //window.scrollTo(0, 0);
    Scroll.animateScroll.scrollToTop(10);
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
    this.handlePageChange(1);
  }

  handleEndDate(endDate) {
    this.setState({
      endDate: endDate
    });
    this.handlePageChange(1);
  }

  handleTitleTextInput(titleText) {
    this.setState({
      titleText: titleText
    });
    this.handlePageChange(1);
  }

  handleAddressTextInput(addressText) {
    this.setState({
      addressText: addressText
    });
    this.handlePageChange(1);
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
    this.handlePageChange(1);
  }

  handleSelectedAudienceTypes(selectedAudienceTypes) {
    this.setState({
      selectedAudienceTypes: selectedAudienceTypes
    });
    this.handlePageChange(1);
  }

  handleAudienceInput(audience) {
    this.setState({
      audience: audience
    });
  }

  handleReset(event) {
    event.preventDefault();
    this.setState({
      titleText: '',
      addressText: '',
      selectedEventTypes: '',
      selectedAudienceTypes: '',
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
    APIFetch(env.API.domain + env.API.endPoint, 'list')
      // axios
      //   .get(env.API.domain + env.API.endPoint)
      .then(function(response) {
        console.log(response);
        self.setState({
          events: response.response.data,
          loaded: true,
          eventTypes: response.eventTypes
        });
      })
      .catch(function(error) {
        console.log(error);
      })
      .then(function(response) {
        // self.getEventTypes(self);
        self.getAudienceTypes(self);
        self.handleEventDate(self); //removed date repeat field
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleEventDate(self) {
    //const self = this;
    var updatedevents = self.state.events.slice();
    updatedevents.map(function(i) {
      if (i.date_repeat) {
        i.splitDates = [];
        i.sortedDates = [];
        i.splitDates.push(i.date_repeat.split(', '));
        i.splitDates[0].map(function(y) {
          i.sortedDates.push(y.split(' to '));
          return null;
        });
        return null;
      }
      return null;
    });

    self.setState(() => ({
      events: updatedevents
    }));
  }

  getEventTypes() {
    let eventTypes = [];
    this.state.events.map(eventItem => {
      if (eventItem.event_type) {
        eventItem.event_type.split(', ').map(eventType => {
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
      if (eventItem.audience) {
        eventItem.audience.split(', ').map(audienceType => {
          if (audienceTypes.indexOf(audienceType) === -1)
            audienceTypes.push(audienceType);
          return false;
        });
        return false;
      }
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
      <div className="content calendar-wrapper container">
        <div className="sp-breadcrumbs" />
        <Loader type="ball-pulse" loaded={this.state.loaded}>
          {/*<div className="sp-head row">
            <Link to="/" className="go-up icon-arrow-left" />
            <h1>Events</h1>
          </div>*/}

          <div className="inner-content">
            <div className="row margin-bottom-20">
              <div className="col-sm-9">
                <h1>Events</h1>
                <p className="">
                  {/* Make Editable via Drupal */}
                  Find out about upcoming events in Westminster.
                </p>
              </div>

              {/* Switch button */}

              {/* <div className="col-sm-3 btn-switch">
                <button
                  className="btn btn-primary btn-wcc"
                  onClick={this.handleCalendarViewSwitch}
                >
                  {this.state.isListViewOn
                    ? "Switch to calendar view"
                    : "Switch to list view"}
                </button>
              </div> */}
            </div>

            <MediaQuery maxWidth={767}>
              <div className="mobile">
                <Button
                  bsStyle="info"
                  onClick={() => this.setState({ open: !this.state.open })}
                >
                  Filters&nbsp;
                  {!this.state.open && <Glyphicon glyph="plus" />}
                  {this.state.open && <Glyphicon glyph="minus" />}
                </Button>
                <Panel collapsible expanded={this.state.open}>
                  <div>You are sized like a tablet or mobile phone though</div>
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
                    handleSelectedAudienceTypes={
                      this.handleSelectedAudienceTypes
                    }
                    selectedAudienceTypes={this.state.selectedAudienceTypes}
                    handleReset={this.handleReset}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    handleStartDate={this.handleStartDate}
                    handleEndDate={this.handleEndDate}
                    handlePageChange={this.handlePageChange}
                  />
                </Panel>
              </div>
            </MediaQuery>

            <div className="row">
              <div className="col-sm-3">
                <MediaQuery minWidth={768}>
                  <Panel header="Filters" bsStyle="info">
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
                      handleSelectedAudienceTypes={
                        this.handleSelectedAudienceTypes
                      }
                      selectedAudienceTypes={this.state.selectedAudienceTypes}
                      handleReset={this.handleReset}
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      handleStartDate={this.handleStartDate}
                      handleEndDate={this.handleEndDate}
                      handlePageChange={this.handlePageChange}
                    />
                  </Panel>
                </MediaQuery>
              </div>

              <div className="col-sm-9">
                <CalendarList
                  events={this.state.events}
                  eventState={this.state}
                  activePage={this.state.activePage}
                  handlePageChange={this.handlePageChange}
                  handleReset={this.handleReset}
                  handleVisibleEventsChange={this.handleVisibleEventsChange}
                  visibleEvents={this.state.visibleEvents}
                  isListViewOn={this.state.isListViewOn}
                  history={this.props.history}
                  location={this.props.location}
                />
                {/*<CalendarList
                events={this.state}
                handleReset={this.handleReset}
                history={this.props.history}
                location={this.props.location}
                props={this.props}
              />*/}
              </div>
            </div>
          </div>
        </Loader>
      </div>
    );
  }
}

export default Calendar;
