import React, { Component } from "react";
import CalendarRow from "./CalendarRow";
import moment from "moment";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class CalendarList extends Component {
  addDateFormat() {
    console.log(this.props);
    this.props.events.events.map(function(e) {
      //console.log(e.sortedDates);
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

    //addDateFormat();

    // Add date object for calendar format
    function addDateFormat() {
      eventArray.events.map(function(e) {
        //console.log(e.sortedDates[0]);
        //e.start = new Date(e.sortedDates[0][0].slice(0, 10).split("-").join());
        if (e.date.sortedDates) {
          e.start = new Date(
            e.sortedDates[0][0].slice(0, 10).split("-").join()
          );
        } else {
          e.start = new Date(e.date.slice(0, 10).split("-").join());
        }

        //e.end = new Date(e.sortedDates[0][0].slice(0, 10).split("-").join());
        e.end = new Date(e.date.slice(0, 10).split("-").join());
        return null;
      });
    }

    function checkDate(eventItem) {
      let rowDate = null;
      //console.log(eventItem.sortedDates);
      if (eventItem.sortedDates) {
        rowDate = moment(eventItem.sortedDates[0][0]);
      } else {
        rowDate = moment(eventItem.date);
      }
      return rowDate;
    }

    function filterMultiSelect(
      selectVal,
      itemVal,
      eventItem,
      uniqueArray,
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

    function renderItem(item) {
      self.props.events.visibleEvents.concat(item);

      eventItems.push(<CalendarRow events={item} key={item.uuid} />);
      eventCalendarArray.push(item);
    }

    function noResults(eventItems, self) {
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

    //function handleEvent(title, event, self, history) {
    //  history.event = event;
    //  history.push(`/event/${event.uuid}`);
    //}

    // Begin Loop of Events <-------------------------------------------

    eventArray.events.forEach((eventItem, index) => {
      var audienceMatch = true;
      var eventMatch = true;

      //Date Filter condition
      let selectedStartDate = moment(eventArray.startDate);
      let selectedEndDate = moment(eventArray.endDate);

      //let rowDate = moment(eventItem.date);
      let rowDate = checkDate(eventItem);

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
      eventMatch = filterMultiSelect(
        self.props.events.selectedEventTypes,
        eventItem.event_type,
        eventItem,
        this.eventMatch
      );

      //Select Audience Type
      audienceMatch = filterMultiSelect(
        self.props.events.selectedAudienceTypes,
        eventItem.audience,
        eventItem,
        uniqueAudienceMatched,
        this.audienceMatch
      );

      // Compare Audience + Event
      if (audienceMatch && eventMatch) {
        renderItem(eventItem);
      } else {
        return;
      }
    });
    // End Loop of Events  ------------------------------------------->

    noResults(eventItems, this);

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
