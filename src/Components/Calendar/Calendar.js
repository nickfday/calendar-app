import React, { Component } from 'react';
import Filter from './Filter/Filter';
import axios from 'axios';
import Scroll from 'react-scroll';
import { CalendarRow } from './CalendarRow';
import moment from 'moment';
import { Button, Glyphicon, Panel } from 'react-bootstrap';
import * as env from '../../env';
import { APIFetch, getVisibleEvents } from './CalendarHelper';
import MediaQuery from 'react-responsive';
import { searchFilter, filterMultiSelect } from '../Misc/Helper';
import Pagination from 'react-js-pagination';
import BigCalendar from 'react-big-calendar';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Loader from 'react-loader';

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

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
      .then(function(response) {
        console.log(response);
        self.setState({
          events: response.response,
          loaded: true,
          eventTypes: response.eventTypes,
          audienceTypes: response.audienceTypes
        });
      })
      .catch(function(error) {
        console.log(error);
      })
      .then(function(response) {
        // self.getEventTypes(self);
        //self.getAudienceTypes(self);
        //self.handleEventDate(self); //removed date repeat field
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentWillMount() {
    this.getEvents();
  }

  render() {
    let visibleEvents = [];
    let filteredCalenderEvents = [];
    const self = this;
    const eventsPerPage = 2;

    this.state.events.map(function(event) {
      if (!searchFilter(self.state.titleText, event.title)) return false;
      if (!searchFilter(self.state.addressText, event.location)) return false;
      if (
        moment(self.state.startDate) > moment(event.startDate) ||
        moment(self.state.endDate) < moment(event.endDate)
      )
        return false;
      if (!filterMultiSelect(self.state.selectedEventTypes, event.event_type))
        return false;
      if (!filterMultiSelect(self.state.selectedAudienceTypes, event.audience))
        return false;

      visibleEvents.push(
        <div>
          <CalendarRow event={event} key={event.uuid + event.startDate} />
        </div>
      );

      filteredCalenderEvents.push({
        title: event.title,
        uuid: event.uuid,
        event: event,
        path: event.path,
        start: event.startDate,
        end: event.endDate
      });
    });

    let paginatedEvents = visibleEvents.slice(
      this.state.activePage * eventsPerPage - eventsPerPage,
      this.state.activePage * eventsPerPage
    );

    return (
      <div className="content calendar-wrapper container">
        <div className="sp-breadcrumbs" />
        <Loader type="ball-pulse" loaded={this.state.loaded}>
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

              <div className="col-sm-3 btn-switch">
                <button
                  className="btn btn-primary btn-wcc"
                  onClick={this.handleCalendarViewSwitch}
                >
                  {this.state.isListViewOn
                    ? 'Switch to calendar view'
                    : 'Switch to list view'}
                </button>
              </div>
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
                {this.state.isListViewOn ? (
                  <div>
                    {paginatedEvents},
                    {visibleEvents.length === 0 && (
                      <p>
                        No results - please adjust or&nbsp;
                        <a href="" onClick={this.handleReset}>
                          reset
                        </a>{' '}
                        filters.
                      </p>
                    )}
                    <div className="text-center">
                      <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={eventsPerPage}
                        totalItemsCount={visibleEvents.length}
                        pageRangeDisplayed={eventsPerPage}
                        onChange={this.handlePageChange.bind(this)}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <CSSTransitionGroup
                      component="div"
                      transitionName="row"
                      transitionAppear={true}
                      transitionAppearTimeout={250}
                      transitionLeaveTimeout={250}
                      transitionEnterTimeout={250}
                      className="event-row clearfix"
                    >
                      <BigCalendar
                        {...filteredCalenderEvents}
                        events={filteredCalenderEvents}
                        onSelectEvent={event => this.history.push(event.path)}
                        views={['month', 'week', 'day']}
                      />
                    </CSSTransitionGroup>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Loader>
      </div>
    );
  }
}

export default Calendar;
