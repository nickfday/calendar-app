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
  });
}

function getListData(object, key) {
  console.log('get list data');
  return getTypes(object, key);
}

function getSingleData(object) {
  console.log('get single data');
}

function manipulateData(object) {
  console.log('manipulate data');
  object.map(function(item) {
    let eventTypes = [];
    item.event_type.split(', ').map(function(j) {
      eventTypes.push(j);
    });
    item.event_type = eventTypes;
    console.log(eventTypes);
  });

  // ToDo - Make into one function

  console.log('MAPPING');
  object.map(function(item) {
    console.log(item);
    let audienceTypes = [];
    if (item.audience) {
      item.audience.split(', ').map(function(j) {
        audienceTypes.push(j);
      });
    }
    item.audience = audienceTypes;
  });

  // object.map(function(item) {
  //   console.log('map audience');
  //   let eventTypes = [];
  //   item.audience.split(', ').map(function(j) {
  //     eventTypes.push(j);
  //   });
  //   item.audience = eventTypes;
  //   console.log(eventTypes);
  // });
}

function stringToArray() {}

// Generates a list of event/audience types so events can be filtered

function getTypes(event, key) {
  console.log('event is  ' + event);
  console.log('key is ' + key);

  let keyTypes = [];
  event.map(item => {
    console.log('key is ' + key);
    console.log(item);

    if (item[key]) {
      item[key].map(type => {
        console.log('key is ' + key);
        if (keyTypes.indexOf(type) === -1) keyTypes.push(type);
        return false;
      });
      return false;
    }
  });
  console.log(keyTypes);
  return keyTypes;
}
