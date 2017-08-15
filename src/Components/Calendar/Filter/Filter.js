import React, { Component } from "react";
import TextBox from "./TextBox";
import MySelect from "./MySelect";
import DatePicker from "react-datepicker";
//import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";

class Filter extends Component {
  render() {
    return (
      <div className="panel panel-info">
        <div className="panel-heading">
          <h3 className="panel-title">Filter events</h3>
        </div>
        <div className="panel-body">
          <form id="exerciseForm" className="calendar-form">
            <TextBox
              filterText={this.props.titleText}
              onFilterTextInput={this.props.onTitleTextInput}
              placeholder="Search by name"
            />
            <TextBox
              filterText={this.props.addressText}
              onFilterTextInput={this.props.onAddressTextInput}
              placeholder="Search by address"
            />

            <div className="form-group">
              <DatePicker
                selectsStart
                startDate={this.props.startDate}
                endDate={this.props.endDate}
                className="form-control"
                selected={this.props.startDate}
                onChange={this.props.handleStartDate}
                placeholderText="Start date"
                dateFormat="DD/MM/YYYY"
                isClearable={true}
                todayButton={"Today"}
              />
            </div>

            <div className="form-group">
              <DatePicker
                selectsEnd
                startDate={this.props.startDate}
                endDate={this.props.endDate}
                className="form-control"
                selected={this.props.endDate}
                onChange={this.props.handleEndDate}
                placeholderText="End date"
                dateFormat="DD/MM/YYYY"
                isClearable={true}
                todayButton={"Today"}
              />
            </div>

            <label className="sr-only" htmlFor="exampleInputEmail3">
              Event Type
            </label>
            <MySelect
              data={this.props.eventTypes}
              selectedItems={this.props.calenderState.selectedEventTypes}
              handleSelectedItem={this.props.handleSelectedEventTypes}
              placeholder="Select event type"
              multiSelect={true}
              className="form-group event-select"
            />

            <label className="sr-only" htmlFor="exampleInputEmail3">
              Who it's for
            </label>
            <MySelect
              data={this.props.calenderState.audienceTypes}
              selectedItems={this.props.calenderState.selectedAudienceTypes}
              handleSelectedItem={this.props.handleSelectedAudienceTypes}
              placeholder="Select audience type"
              className="form-group"
              multiSelect={true}
            />

            <button onClick={this.props.handleReset}>Reset</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Filter;
