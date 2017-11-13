import React from 'react';
import axios from 'axios';
import * as env from '../../env';

export function APIFetch(path, type) {
  return axios.get(path).then(function(response) {
    manipulateData(response.data);
    if (type == 'list') {
      return {
        response: response,
        eventTypes: getListData(response.data, 'event_type'),
        audienceTypes: getListData(response.data, 'audience')
      };
    } else if (type == 'single') {
    }
    // return {
    //   response: response,
    //   eventTypes:
    // }
  });
}

function getListData(object, key) {
  console.log('get list data');
  return getEventTypes(object, key);
}

function getSingleData(object) {
  console.log('get single data');
}

function manipulateData(object) {
  console.log('manipulate data');
}

function getEventTypes(event, key) {
  console.log('key is ' + key);
  let eventTypes = [];
  event.map(eventItem => {
    console.log('key is ' + key);
    if (eventItem[key]) {
      eventItem[key].split(', ').map(eventType => {
        console.log('key is ' + key);
        if (eventTypes.indexOf(eventType) === -1) eventTypes.push(eventType);
        return false;
      });
      return false;
    }
  });
  return eventTypes;
  console.log(eventTypes);

  // this.setState({
  //   eventTypes
  // });
}
