import React, { Component } from "react";
import { searchFilter, filterMultiSelect } from "../Misc/Helper";
import { DemoCalendarRow } from "./DemoCalendarRow";
import moment from "moment";
import Pagination from "react-js-pagination";
import ReactPaginate from "react-paginate";

const EventFilters = props => {
  //Search by Name
  if (!searchFilter(props.eventState.titleText, props.event.title)) {
    return false;
  }

  //Search by Address
  if (!searchFilter(props.eventState.addressText, props.event.location)) {
    return false;
  }

  //Event filter
  if (
    !filterMultiSelect(
      props.eventState.selectedEventTypes,
      props.event.event_type
    )
  )
    return false;

  //Audience Filter
  if (
    !filterMultiSelect(
      props.eventState.selectedAudienceTypes,
      props.event.audience
    )
  )
    return false;

  //Date Filter
  if (
    moment(props.eventState.startDate) > moment(props.startDate) ||
    moment(props.eventState.endDate) < moment(props.endDate)
  )
    return false;

  return (
    <DemoCalendarRow
      event={props.event}
      startDate={props.startDate}
      endDate={props.endDate}
    />
  );
};

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

    dateArray.sort(function(a, b) {
      return moment(a[0][0]) < moment(b[0][0]);
    });

    // list events
    let activePage = this.state.activePage;
    let itemsCountPerPage = 5;

    let listEvents = dateArray
      .sort()
      .slice(
        activePage * itemsCountPerPage - itemsCountPerPage,
        activePage * itemsCountPerPage
      )
      .map(i => {
        return (
          <div>
            <EventFilters
              eventState={this.props.eventState}
              event={i[1]}
              startDate={i[0][0]}
              endDate={i[0][1]}
            />
          </div>
        );
      });

    return (
      <div>
        {listEvents}
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={5}
          totalItemsCount={dateArray.length}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        />
      </div>
    );
  }
}

export default DemoCalendarList;
