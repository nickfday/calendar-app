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

//import { getEvents } from '../Misc/Helper';

class CalendarSingle extends Component {
  constructor() {
    super();
    this.state = {
      events: null
    };
    this.getEvents = this.getEvents.bind(this);
  }

  getEvents() {
    this.setState({
      events: 'nick'
    });
  }

  fetchArticles() {
    const self = this;
    console.log('fetching');
    //const self = this;
    APIFetch(env.API.domain + env.API.endPoint, 'single')
      .then(function(i) {
        console.log(i);
        let item = i.data.find(
          x =>
            x.path.replace(/\s+/g, '-').toLowerCase() ===
            self.props.location.pathname
              .slice(6)
              .replace(/\s+/g, '-')
              .toLowerCase()
        );

        self.setState({
          articles: item,
          loaded: true
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  checkAvailableProps() {
    const self = this;
    if (this.props.location.state) {
      self.setState({
        events: this.props.location.state.events,
        loaded: true
      });
    } else {
      this.fetchArticles();
    }
  }

  componentDidMount() {
    this.checkAvailableProps();
  }

  componentWillMount() {
    //this.getEvents();
    //getEvents();
  }

  render() {
    console.log(this.props);
    const item = this.state.events;
    if (item) {
      let startDate = this.props.location.state.startDate;
      let endDate = this.props.location.state.endDate;
      console.log(item);
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
                    <h1>{item.title}</h1>
                  </div>
                  <div className="col-xs-3">
                    <DatePanel date={startDate} />
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
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default CalendarSingle;
