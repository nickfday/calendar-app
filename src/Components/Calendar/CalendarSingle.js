import React, { Component } from 'react';
import axios from 'axios';
import BSModal from '../Misc/BSModal';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { splitMap } from '../Misc/Helper';
import { DatePanel } from '../Misc/DatePanel';
import * as env from '../../env';
import { APIFetch } from './CalendarHelper';
import Loader from 'react-loader';

class CalendarSingle extends Component {
  constructor() {
    super();
    this.state = {
      events: null,
      loaded: false
    };
  }
  componentWillMount() {
    const self = this;
    if (typeof this.props.location.state === 'undefined') {
      console.log('FETCH PLZ');

      APIFetch(env.API.domain + env.API.endPoint, 'single').then(function(
        response
      ) {
        console.log(response);
        console.log(self.props.location.pathname);
        self.setState({
          events: response.response.find(
            event => event.path === self.props.location.pathname.slice(1)
          ),
          loaded: true
        });
      });
    }
  }
  render() {
    console.log(this.props);
    if (this.props.location.state) {
      // const item = this.props.location.state.events;
      // console.log(item);
      return (
        <DisplayCalendarSingle
          event={this.props.location.state.events}
          loaded={true}
        />
      );
    } else if (this.state.events) {
      return (
        <DisplayCalendarSingle
          event={this.state.events}
          loaded={this.state.loaded}
        />
      );
    } else {
      return (
        <div>
          <CSSTransitionGroup
            component="div"
            transitionName="row"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionLeaveTimeout={500}
            transitionEnterTimeout={500}
            className="event-row clearfix"
          >
            <h3>
              404 - No match for <code>{this.props.location.pathname}</code>
            </h3>
          </CSSTransitionGroup>
        </div>
      );
    }
  }
}

function DisplayCalendarSingle(props) {
  const item = props.event;
  console.log(item);
  return (
    <Loader type="ball-pulse" loaded={props.loaded}>
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
                  <h1>{item.title}</h1>
                </div>
                <div className="col-xs-3">
                  <DatePanel date={item.startDate} />
                </div>
              </div>
              {/* Location */}
              {item.location && (
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
                {moment(item.startDate).format('h:mma')} to{' '}
                {item.endDate && moment(item.endDate).format('h:mma')}
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

              {displayTags(item.event_type, 'event-item')}
              {displayTags(item.audience, 'audience-item')}
              {/* {splitMap(item.event_type, ', ', 'event-item')} */}
              <br />
              <div className="clearfix" />
              {/* {splitMap(item.audience, ', ', 'audience-item')} */}
              <div className="clearfix" />
              <div className="clearfix" />
              <div className="margin-top-10">
                <Link to="/">Back to all events</Link>
              </div>
            </div>
          </CSSTransitionGroup>
        </div>
      </div>
    </Loader>
  );
}

function displayTags(tags, className) {
  let tagArray = [];
  console.log('hi');
  tags.map(function(tag) {
    console.log(tag);
    tagArray.push(<div className={className}>{tag}</div>);
  });
  return tagArray;
}

export default CalendarSingle;
