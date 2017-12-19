import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

export function APIFetch(path, type) {
  return axios.get(path).then(function(response) {
    if (type === 'list') {
      return {
        response: manipulateData(response.data),
        eventTypes: getListData(response.data, 'event_type'),
        audienceTypes: getListData(response.data, 'audience')
      };
    } else if (type === 'single') {
      return {
        response: manipulateData(response.data)
      };
    }
  });
}

function getListData(object, key) {
  return getTypes(object, key);
}

function manipulateData(object) {
  // ToDo - Make into one function
  // Create types/audience in state
  object.forEach(function(item) {
    let eventTypes = [];
    item.event_type.split(', ').forEach(function(j) {
      eventTypes.push(j);
    });
    item.event_type = eventTypes;

    let audienceTypes = [];
    if (item.audience) {
      item.audience.split(', ').forEach(function(j) {
        audienceTypes.push(j);
      });
    }
    item.audience = audienceTypes;
  }); // end map

  let formattedArray = [];

  object.forEach(function(item) {
    item.date_repeat.split(', ').forEach(function(date, index) {
      let splitDates = [];
      date.split(' to ').forEach(function(splitDate, index) {
        splitDates.push(splitDate);
        item.startDate = splitDates[0];
        item.endDate = splitDates[1];
        item.path =
					'/events/' +
					item.title.replace(/\s+/g, '-').toLowerCase() +
					'-' +
					moment(item.startDate)
					  .format('D M YY')
					  .replace(/\s+/g, '-');
      });

      delete item.date_repeat;
      formattedArray.push(Object.assign({}, item));
    });
  });
  return _.sortBy(formattedArray, 'startDate');
}

// Generates a list of event/audience types so events can be filtered

function getTypes(event, key) {
  let keyTypes = [];
  event.forEach(item => {
    if (item[key]) {
      item[key].map(type => {
        if (keyTypes.indexOf(type) === -1) keyTypes.push(type);
        return false;
      });
      return false;
    }
  });
  return keyTypes;
}
