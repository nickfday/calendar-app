import React, { Component } from "react";
import { searchFilter, filterMultiSelect } from "../Misc/Helper";
import { CalendarRow } from "./CalendarRow";
import moment from "moment";
import Pagination from "react-js-pagination";
import BigCalendar from "react-big-calendar";
import CSSTransitionGroup from "react-addons-css-transition-group";

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class DemoCalendarList extends Component {
  componentDidMount() {
    this.addDateFormat();
  }

  addDateFormat() {
    this.props.events.events.map(function(e) {
      if (e.sortedDates) {
        e.start = new Date(
          e.sortedDates[0][0]
            .slice(0, 10)
            .split("-")
            .join()
        );
        e.end = new Date(
          e.sortedDates[0][1]
            .slice(0, 10)
            .split("-")
            .join()
        );
      } else {
        e.start = new Date(
          e.date
            .slice(0, 10)
            .split("-")
            .join()
        );
        e.end = new Date(
          e.date
            .slice(0, 10)
            .split("-")
            .join()
        );
      }
      return null;
    });
  }

  handleEvent(title, event, self, history) {
    history.push(
      `${event.path.replace(/\s+/g, "-").toLowerCase()}?date=${moment(
        this.props.startDate
      ).format("YYYY-MM-DD")}`
    );
  }

  render() {
    var self = this;
    let dateArray = [];
    let updatedevents = self.props.events.slice();

    // Format Dates
    updatedevents.map(i => {
      i.formattedDate = [];
      i.start = new Date("2017-08-08 11:00:00");
      i.end = new Date("2017-09-08 11:00:00");
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
    //let activePage = this.state.activePage;
    console.log("democalendarlist render");
    let activePage = this.props.activePage;
    let itemsCountPerPage = 5;

    function filterEvents(eventState, event, startDate, endDate) {
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
        <CalendarRow event={event} startDate={startDate} endDate={endDate} />
      );

      filteredCalenderEvents.push({
        title: event.title,
        uuid: event.uuid,
        event: event,
        path: event.path,
        //allDay: true,
        start: new Date(startDate),
        end: new Date(endDate)
      });
    }

    let filteredEvents = [];
    let filteredCalenderEvents = [];

    let listEvents = dateArray.sort().map(i => {
      filterEvents(this.props.eventState, i[1], i[0][0], i[0][1]);
    });

    let filteredEventsCount = filteredEvents.length;

    // No results
    if (filteredEventsCount == 0) {
      return (
        <p>
          No results - please adjust or&nbsp;
          <a href="" onClick={self.props.handleReset}>
            reset
          </a>{" "}
          filters.
        </p>
      );
    }

    filteredEvents = filteredEvents.slice(
      activePage * itemsCountPerPage - itemsCountPerPage,
      activePage * itemsCountPerPage
    );

    return (
      <div>
        {this.props.isListViewOn ? (
          <div>
            {filteredEvents}
            <div className="text-center">
              <Pagination
                activePage={this.props.activePage}
                itemsCountPerPage={5}
                totalItemsCount={filteredEventsCount}
                pageRangeDisplayed={5}
                onChange={this.props.handlePageChange.bind(this)}
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
                //{...this.props}
                events={filteredCalenderEvents}
                onSelectEvent={event =>
                  this.handleEvent(
                    event.title,
                    event,
                    self,
                    this.props.history
                  )}
                views={["month", "week", "day"]}
              />
            </CSSTransitionGroup>
          </div>
        )}
      </div>
    );
  }
}

export default DemoCalendarList;
