import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { searchFilter, filterMultiSelect } from '../Misc/Helper';
import * as env from '../../env';

export function APIFetch(path, type) {
  return axios.get(path).then(function(response) {
    //manipulateData(response.data);
    if (type == 'list') {
      return {
        response: manipulateData(response.data),
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

  let formattedArray = [];

  object.forEach(function(item) {
    item.date_repeat.split(', ').forEach(function(date, index) {
      let splitDates = [];
      date.split(' to ').forEach(function(splitDate, index) {
        splitDates.push(splitDate);
        item.startDate = moment(splitDates[0]);
        item.endDate = moment(splitDates[1]);
      });

      delete item.date_repeat;
      formattedArray.push(Object.assign({}, item));
    });
  });
  console.log(formattedArray);

  return formattedArray;
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
