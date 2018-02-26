import React from 'react';
import Loader from 'react-loader';
import MediaQuery from 'react-responsive';
import { Button, Glyphicon, Panel } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import BigCalendar from 'react-big-calendar';

export const CalendarDisplay = props => {
  return (
    <div className="content calendar-wrapper container">
      <div className="sp-breadcrumbs" />
      <Loader type="ball-pulse" loaded={props.loaded}>
        <div className="inner-content">
          <div className="row margin-bottom-20">
            <div className="col-sm-9">
              <h1>Events</h1>
              <p>{props.calendarConfig}</p>
            </div>
            <div className="col-sm-3 btn-switch">
              <button className="btn btn-primary btn-wcc" onClick={props.handleCalendarViewSwitch}>
                {props.isListViewOn ? 'Switch to calendar view' : 'Switch to list view'}
              </button>
            </div>
          </div>

          <MediaQuery maxWidth={767}>
            <div className="mobile">
              <Button bsStyle="info" onClick={props.handleFiltersButtonOpen}>
                Filters&nbsp;
                {props.filtersButtonOpen ? <Glyphicon glyph="minus" /> : <Glyphicon glyph="plus" />}
              </Button>
              <Panel collapsible expanded={props.filtersButtonOpen}>
                {props.displayFilters}
              </Panel>
            </div>
          </MediaQuery>

          <div className="row">
            <div className="col-sm-3">
              <MediaQuery minWidth={768}>
                <Panel header="Filters" bsStyle="info">
                  {props.displayFilters}
                </Panel>
              </MediaQuery>
            </div>

            <div className="col-sm-9">
              {props.isListViewOn ? (
                <div>
                  {props.paginatedEvents}
                  {props.visibleEvents.length === 0 && (
                    <p>
                      No results - please adjust or&nbsp;
                      <a href="" onClick={props.handleReset}>
                        reset
                      </a>{' '}
                      filters.
                    </p>
                  )}
                  <div className="text-center">
                    <Pagination
                      activePage={props.activePage}
                      itemsCountPerPage={props.eventsPerPage}
                      totalItemsCount={props.visibleEvents.length}
                      pageRangeDisplayed={props.eventsPerPage}
                      onChange={props.handlePageChange}
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
                    <EventBigCalendar
                      events={props.filteredCalenderEvents}
                      onSelectEvent={event => (window.location.href = '/events-calendar' / +event.path)}
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
};

// extend BigCalendar to manipulate DOM
class EventBigCalendar extends BigCalendar {
  componentDidMount() {
    const calendarButtons = document.querySelectorAll('.rbc-btn-group button');
    calendarButtons[1].textContent = 'Previous';
  }
}
