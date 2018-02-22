import * as env from '../../env';
import { APIFetch } from './CalendarHelper';
import { animateScroll } from 'react-scroll';
import axios from 'axios';
import BigCalendar from 'react-big-calendar';
import CalendarDisplay from './CalendarDisplay';
import { CalendarRow } from './CalendarRow';
import Filter from './Filter/Filter';
import moment from 'moment';
import React, { Component } from 'react';
import { searchFilter, filterMultiSelect } from '../Misc/Helper';
import queryString from 'query-string';
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      addressText: '',
      audienceTypes: [],
      calendarConfig: '',
      endDate: null,
      events: [],
      eventTypes: [],
      filtersButtonOpen: false,
      isListViewOn: true,
      loaded: false,
      selectedAudienceTypes: '',
      selectedEventTypes: '',
      startDate: moment(),
      visibleEvents: [],
      titleText: ''
    };
    this.handleAddressTextInput = this.handleAddressTextInput.bind(this);
    this.handleAudienceInput = this.handleAudienceInput.bind(this);
    this.handleCalendarViewSwitch = this.handleCalendarViewSwitch.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.handleEventTypeInput = this.handleEventTypeInput.bind(this);
    this.handleFiltersButtonOpen = this.handleFiltersButtonOpen.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSelectedEventTypes = this.handleSelectedEventTypes.bind(this);
    this.handleSelectedAudienceTypes = this.handleSelectedAudienceTypes.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleTitleTextInput = this.handleTitleTextInput.bind(this);
  }

  handleFiltersButtonOpen() {
    this.setState(prevState => ({
      filtersButtonOpen: !prevState.filtersButtonOpen
    }));
  }

  handlePageChange(pageNo) {
    this.setState({
      activePage: pageNo
    });
    animateScroll.scrollToTop(10);
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
        self.setState({
          events: response.response,
          loaded: true,
          eventTypes: response.eventTypes,
          audienceTypes: response.audienceTypes
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getEvents();
    this.getQueryStrings();
    this.getCalendarConfig();
  }

  getCalendarConfig() {
    const self = this;
    axios(env.API.domain + '/api/event-calendar-config').then(function(response) {
      self.setState({
        calendarConfig: response.data.description
      });
    });
  }

  getQueryStrings() {
    let search = queryString.parse(this.props.location.search);
    for (let key in search) {
      if (key === 'event_type') {
        this.setState({
          selectedEventTypes: [
            {
              label: search[key].toString(),
              value: search[key].toString()
            }
          ]
        });
      }
      if (key === 'audience') {
        this.setState({
          selectedAudienceTypes: [
            {
              label: search[key].toString(),
              value: search[key].toString()
            }
          ]
        });
      }
      if (key === 'location') {
        this.setState({
          addressText: search[key].toString()
        });
      }
    }
  }

  render() {
    let visibleEvents = [];
    let filteredCalenderEvents = [];
    const self = this;
    const eventsPerPage = 10;
    // const calendarButtons = document.querySelectorAll('.rbc-btn-group button');
    // calendarButtons[1].textContent = 'Previous';

    this.state.events.forEach(function(event) {
      if (!searchFilter(self.state.titleText, event.title)) return false;
      if (!searchFilter(self.state.addressText, event.location)) return false;
      if (moment(self.state.startDate) > moment(event.startDate) || moment(self.state.endDate) < moment(event.endDate)) return false;
      if (!filterMultiSelect(self.state.selectedEventTypes, event.event_type)) return false;
      if (!filterMultiSelect(self.state.selectedAudienceTypes, event.audience)) return false;

      visibleEvents.push(<CalendarRow event={event} key={event.uuid + event.startDate} />);
      filteredCalenderEvents.push({
        title: event.title,
        id: event.uuid,
        uuid: event.uuid,
        event: event,
        path: event.path,
        start: moment(event.startDate).toDate(),
        end: moment(event.endDate).toDate(),
        url_alias: event.url_alias
      });
    });

    let paginatedEvents = visibleEvents.slice(this.state.activePage * eventsPerPage - eventsPerPage, this.state.activePage * eventsPerPage);
    let displayFilters = (
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
        handlePageChange={this.handlePageChange}
      />
    );

    return (
      <CalendarDisplay
        activePage={this.state.activePage}
        eventsPerPage={eventsPerPage}
        loaded={this.state.loaded}
        displayFilters={displayFilters}
        paginatedEvents={paginatedEvents}
        calendarConfig={this.state.calendarConfig}
        isListViewOn={this.state.isListViewOn}
        filtersButtonOpen={this.state.filtersButtonOpen}
        handleFiltersButtonOpen={this.handleFiltersButtonOpen}
        handleReset={this.handleReset.bind(this)}
        handlePageChange={this.handlePageChange.bind(this)}
        handleCalendarViewSwitch={this.handleCalendarViewSwitch}
        visibleEvents={visibleEvents}
        filteredCalenderEvents={filteredCalenderEvents}
        self={this}
      />
    );
  }
}

export default Calendar;
