import React from 'react';
import axios from 'axios';
import moment from 'moment';
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
      return {
        response: response
      };
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
  // ToDo - Make into one function
  // Create types/audience in state
  console.log('manipulate data');
  object.map(function(item) {
    let eventTypes = [];
    item.event_type.split(', ').map(function(j) {
      eventTypes.push(j);
    });
    item.event_type = eventTypes;

    let audienceTypes = [];
    if (item.audience) {
      item.audience.split(', ').map(function(j) {
        audienceTypes.push(j);
      });
    }
    item.audience = audienceTypes;

    // Create a pathname
    item.path = 'events/' + item.title.replace(/\s+/g, '-').toLowerCase();
  }); // end map

  // Create new items based on date

  // search date_repeat field
  //split at comma
  //for each comma create new event
  // add new evnent to event array

  //get end date

  let formattedArray = [];

  object.map(function(item) {
    item.date_repeat.split(', ').map(function(date) {
      let splitDates = [];
      date.split(' to ').map(function(splitDate) {
        splitDates.push(splitDate);
        console.log(splitDate);
      });
      console.log(splitDates[0]);
      console.log(splitDates[1]);
      console.log(date);
      formattedArray.push({
        event: item,
        startDate: moment(splitDates[0]),
        endDate: moment(splitDates[1])
      });
    });
  });

  console.log(formattedArray);

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
