import React, { Component } from 'react';
import axios from 'axios';
//import "./style/DemoCalendarRow.css";
import BSModal from '../Misc/BSModal';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { splitMap } from '../Misc/Helper';
import { DatePanel } from '../Misc/DatePanel';
import * as env from '../../env';

const DisplaySingleEvent = props => {
  console.log(props.event.formattedDate[0][1]);

  console.log(props.event);

  const item = props.event;

  //const endDate = item.formattedDate[0][1];
  const endDate = item.formattedDate[0][1];

  let startDate = '';
  if (props.event) {
    startDate = item.formattedDate[0][0];
  } else {
    startDate = window.location.search.slice(6);
  }

  return (
    <div className="content exercise-list container">
      <div className="inner-content">
        <div className="wcc-breadcrumb">
          <a href={env.API.domain}>Home</a>
          &nbsp;>&nbsp;
          <Link to="/">All events</Link>
        </div>
        <CSSTransitionGroup
          component="div"
          transitionName="row"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionLeaveTimeout={500}
          transitionEnterTimeout={500}
          className="event-row clearfix"
        >
          <div className="event-info">
            <div className="row">
              <div className="col-xs-9">
                <h1>{props.event.title}</h1>
              </div>
              <div className="col-xs-3">
                <DatePanel date={startDate} />
              </div>
            </div>
            {/* Location */}
            {props.event.location && (
              <BSModal
                buttonLabel={item.location}
                map={
                  'https://www.google.com/maps/embed/v1/place?key=AIzaSyD8cbhTTREwAxNI3IxRLwMGfE1xb_eOINc&q=' +
                  item.location
                }
              />
            )}
            <div className="clearfix" />
            <p>
              {moment(startDate).format('h:mma')} to{' '}
              {endDate && moment(endDate).format('h:mma')}
            </p>
            <div className="clearfix" />
            {/* How to Book */}
            <h3>How to book</h3>
            {item.how_to_book && (
              <div>
                <p dangerouslySetInnerHTML={{ __html: item.how_to_book }} />
              </div>
            )}
            {!item.how_to_book && <p>No booking needed</p>}
            {/* Price */}
            <h3>Price</h3>
            {item.price && (
              <div>
                <p dangerouslySetInnerHTML={{ __html: item.price }} />
              </div>
            )}
            {!item.price && <p>Free</p>}
            {item.body && (
              <div>
                <h3>Description</h3>
                <p dangerouslySetInnerHTML={{ __html: item.body }} />
              </div>
            )}
            {splitMap(item.event_type, ', ', 'event-item')}
            <br />
            <div className="clearfix" />
            {splitMap(item.audience, ', ', 'audience-item')}
            <div className="clearfix" />
            <div className="clearfix" />
            <div className="margin-top-10">
              <Link to="/">Back to all events</Link>
            </div>
          </div>
        </CSSTransitionGroup>
      </div>
    </div>
  );
};

class CalendarSingle extends Component {
  constructor() {
    super();
    this.state = {
      events: null,
      fetchEvents: null,
      startDate: null,
      endDate: null
    };
  }

  componentDidMount() {
    if (!this.props.location.state) {
      let pathUUID = this.props.location.pathname;
      //if (pathUUID.indexOf("/events/" !== -1)) {
      var UUID = pathUUID.slice(1);
      this.fetchSingleEvent(UUID);
      //}
    } else {
      this.setState({
        events: this.props.location.state
      });
      //this.setItemValue(this.props.location.state, "events");
    }
  }

  fetchSingleEvent(UUID) {
    //alert(UUID);
    axios
      .get(env.API.domain + env.API.endPoint + '?alias=' + UUID)
      .then(response => {
        this.setState({
          fetchEvents: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    // .then(function(response) {
    //   self.handleEventDate(self);
    // });
  }

  handleEventDate(self) {
    //const self = this;
    var updatedevents = self.state.fetchEvents.slice();
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
      fetchEvents: updatedevents
    }));
  }

  render() {
    if (this.state.events !== null) {
      return (
        <DisplaySingleEvent
          event={this.state.events.events}
          //startDate={this.state.events.startDate}
          //endDate={this.state.events.endDate}
        />
      );
    } else if (this.state.fetchEvents !== null) {
      return (
        <DisplaySingleEvent
          event={this.state.fetchEvents[0]}
          //startDate={this.state.fetchEvents[0].sortedDates[0][0]}
          //endDate={this.state.fetchEvents[0].sortedDates[0][1]}
        />
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}
export default CalendarSingle;
