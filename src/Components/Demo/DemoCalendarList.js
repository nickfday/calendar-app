import React, { Component } from "react";
import { searchFilter, filterMultiSelect } from "../Misc/Helper";
import { DemoCalendarRow } from "./DemoCalendarRow";
import moment from "moment";
import Pagination from "react-js-pagination";

class DemoCalendarList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1
    };
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  render() {
    var self = this;
    let dateArray = [];
    let updatedevents = self.props.events.slice();

    // Format Dates
    updatedevents.map(i => {
      i.formattedDate = [];
      i.date_repeat.split(", ").map(y => {
        i.formattedDate.push(y.split(" to "));
      });
    });

    // newArray based on start date
    updatedevents.map(i => {
      i.formattedDate.map(z => {
        dateArray.push([z, i]);
      });
    });

    // list events
    let activePage = this.state.activePage;
    let itemsCountPerPage = 5;

    function filterEvents(eventState, event, startDate, endDate) {
      //this.handlePageChange(1);

      if (!searchFilter(eventState.titleText, event.title)) return false;

      //Search by Address
      if (!searchFilter(eventState.addressText, event.location)) return false;

      //Event filter
      if (!filterMultiSelect(eventState.selectedEventTypes, event.event_type))
        return false;

      //Audience Filter
      if (!filterMultiSelect(eventState.selectedAudienceTypes, event.audience))
        return false;

      //Date Filter
      if (
        moment(eventState.startDate) > moment(startDate) ||
        moment(eventState.endDate) < moment(endDate)
      )
        return false;

      filteredEvents.push(
        <DemoCalendarRow
          event={event}
          startDate={startDate}
          endDate={endDate}
        />
      );
    }

    let filteredEvents = [];

    let listEvents = dateArray.sort().map(i => {
      filterEvents(this.props.eventState, i[1], i[0][0], i[0][1]);
    });

    let filteredEventsCount = filteredEvents.length;

    filteredEvents = filteredEvents.slice(
      activePage * itemsCountPerPage - itemsCountPerPage,
      activePage * itemsCountPerPage
    );

    return (
      <div>
        {filteredEvents}
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={5}
          totalItemsCount={filteredEventsCount}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        />
      </div>
    );
  }
}

export default DemoCalendarList;
