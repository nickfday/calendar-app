import React, { Component } from "react";
import CalendarRow from "./CalendarRow";
import moment from "moment";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class CalendarList extends Component {
  addDateFormat() {
    this.props.events.events.map(function(e) {
      if (e.sortedDates) {
        e.start = new Date(e.sortedDates[0][0].slice(0, 10).split("-").join());
        e.end = new Date(e.sortedDates[0][1].slice(0, 10).split("-").join());
      } else {
        e.start = new Date(e.date.slice(0, 10).split("-").join());
        e.end = new Date(e.date.slice(0, 10).split("-").join());
      }
      return null;
    });
  }

  searchFilter(searchVal, itemVal) {
      if (
        searchVal !== "" &&
        itemVal.toLowerCase().indexOf(searchVal.toLowerCase()) === -1
      ) {
        return false;
      } else {
        return true;
      }
    }

   handleEvent(title, event, self, history) {
      history.event = event;
      history.push(`/event/${event.uuid}`);
    }

   checkDate(eventItem) {
    let rowDate = null;
    //console.log(eventItem.sortedDates);
    if (eventItem.sortedDates) {
        rowDate = moment(eventItem.sortedDates[0][0]);
    } else {
        rowDate = moment(eventItem.date);
    }
    return rowDate;
    }

    filterMultiSelect(
    selectVal,
    itemVal,
    eventItem,
    uniqueArray,
    matchedTag,
    match
) {
    matchedTag = [];
    var uniqueMatched = [];
    match = true;
    // loop sorted selected audience
    Object.keys(selectVal).sort().map(selectedTag => {
        if (itemVal != null) {
            //loop all sorted tags
            itemVal.split(", ").sort().map(tag => {
                //if selected audience value == tag push onto matched event
                if (selectVal[selectedTag].value === tag) {
                    matchedTag.push(itemVal);
                    return false;
                } else {
                    return false;
                }
            });
            return false;
        }
        return false;
    });
    //Show eventItems
    if (matchedTag.length === selectVal.length) {
        uniqueMatched.push(eventItem);
    }

    if (uniqueMatched.length === 0) {
        match = false;
    }
    return match;
}


    noResults(eventItems, self, noResultsText) {
    if (eventItems.length === 0) {
        eventItems.push(
            <div className="eventItem" key={"no results"}>
                <div className="col-sm-12">
                    <p>
                        {noResultsText}{" "}
                        <a href="" onClick={self.props.handleReset}>
                            Reset
                        </a>
                    </p>
                </div>
            </div>
        );
    }
}

    renderItem(self, eventItems, eventItem, eventCalendarArray) {
    self.props.events.visibleEvents.concat(eventItem);

    eventItems.push(<CalendarRow events={eventItem} key={eventItem.uuid} />);
    eventCalendarArray.push(eventItem);
}

  componentDidMount() {
    this.addDateFormat();
  }

  componentDidUpdate() {
    this.addDateFormat();
  }











  render() {
    let eventArray = this.props.events;
    let eventItems = [];
    const noResultsText = "No results - please adjust filters";
    let self = this;
    let uniqueAudienceMatched = [];
    let matchedTag = [];
    let eventCalendarArray = [];









    // Begin Loop of Events <-------------------------------------------

    eventArray.events.forEach((eventItem, index) => {
      var audienceMatch = true;
      var eventMatch = true;

      //Date Filter condition
      let selectedStartDate = moment(eventArray.startDate);
      let selectedEndDate = moment(eventArray.endDate);

      //let rowDate = moment(eventItem.date);
      let rowDate = this.checkDate(eventItem);

      //Search by Name
      if (!this.searchFilter(eventArray.titleText, eventItem.title)) {
        return;
      }

      //Search by Address
      if (!this.searchFilter(eventArray.addressText, eventItem.location)) {
        return;
      }

      // Filter Dates
      if (selectedStartDate > rowDate || selectedEndDate < rowDate) {
        return;
      }

      //Select Event Type
      eventMatch = this.filterMultiSelect(
        self.props.events.selectedEventTypes,
        eventItem.event_type,
        eventItem,
        this.eventMatch,
        matchedTag
      );

      //Select Audience Type
      audienceMatch = this.filterMultiSelect(
        self.props.events.selectedAudienceTypes,
        eventItem.audience,
        eventItem,
        uniqueAudienceMatched,
        this.audienceMatch,
        matchedTag
      );

      // Compare Audience + Event
      if (audienceMatch && eventMatch) {
        this.renderItem(self, eventItems, eventItem, eventCalendarArray);
      } else {
        return;
      }
    });
    // End Loop of Events  ------------------------------------------->

    this.noResults(eventItems, this, noResultsText);

    //if list view toggle show eventItems else render calendar component
    return (
      <div className="">
        {this.props.events.isListViewOn
          ? <div>
              {eventItems}
            </div>
          : <BigCalendar
              {...this.props}
              //events={events}
              events={eventCalendarArray}
              onSelectEvent={event =>
                this.handleEvent(event.title, event, self, self.props.history)}
            />}
      </div>
    );
  }
}

export default CalendarList;
