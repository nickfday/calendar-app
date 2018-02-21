import React, { Component } from 'react';
import TextBox from './TextBox';
import MySelect from './MySelect';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Filter(props) {
  return (
    <form id="exerciseForm" className="calendar-form">
      <TextBox filterText={props.titleText} onFilterTextInput={props.onTitleTextInput} placeholder="Filter by name" />
      <TextBox filterText={props.addressText} onFilterTextInput={props.onAddressTextInput} placeholder="Filter by location" />

      <div className="form-group">
        <DatePicker
          selectsStart
          startDate={props.startDate}
          endDate={props.endDate}
          className="form-control"
          selected={props.startDate}
          onChange={props.handleStartDate}
          placeholderText="Start date"
          dateFormat="DD/MM/YYYY"
          isClearable={true}
          todayButton={'Today'}
        />
      </div>

      <div className="form-group">
        <DatePicker
          selectsEnd
          startDate={props.startDate}
          endDate={props.endDate}
          className="form-control"
          selected={props.endDate}
          onChange={props.handleEndDate}
          placeholderText="End date"
          dateFormat="DD/MM/YYYY"
          isClearable={true}
          todayButton={'Today'}
        />
      </div>

      <label className="sr-only" htmlFor="exampleInputEmail3">
        Event Type
      </label>
      <MySelect
        data={props.eventTypes}
        selectedItems={props.calenderState.selectedEventTypes}
        handleSelectedItem={props.handleSelectedEventTypes}
        placeholder="Event type"
        multiSelect={true}
        className="form-group event-select"
      />

      <label className="sr-only" htmlFor="exampleInputEmail3">
        Who it's for
      </label>
      <MySelect
        data={props.calenderState.audienceTypes}
        selectedItems={props.calenderState.selectedAudienceTypes}
        handleSelectedItem={props.handleSelectedAudienceTypes}
        placeholder="Audience type"
        className="form-group"
        multiSelect={true}
      />

      <button
        onClick={props.handleReset}
        className="btn btn-primary btn-wcc"
        disabled={
          !props.titleText &
          !props.addressText &
          !props.startDate &
          !props.endDate &
          !props.selectedEventTypes &
          !props.selectedAudienceTypes
        }
      >
        Reset
      </button>
    </form>
  );
}

export default Filter;
