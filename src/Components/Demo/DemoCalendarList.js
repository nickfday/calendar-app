import React, { Component } from "react";
import { searchFilter, filterMultiSelect } from "../Misc/Helper";
import moment from "moment";

const EventRow = props => {
  return (
    <div>
      {props.event.title} - {props.startDate} - {props.endDate}
    </div>
  );
};

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
    <EventRow
      event={props.event}
      startDate={props.startDate}
      endDate={props.endDate}
    />
  );
};

class DemoCalendarList extends Component {
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
    let listEvents = dateArray.map(i => {
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
        <br />
      </div>
    );
  }
}

export default DemoCalendarList;
