import React, { Component } from "react";

class TextBox extends Component {
  handleFilterTextInputChange(e) {
    this.props.onFilterTextInput(e.target.value);
  }

  render() {
    //Prevent Enter from submitting
    function handleKeyPress(e) {
      if (e.key === "Enter") {
        e.preventDefault();
      }
    }
    return (
      <div className="form-group">
        <label className="sr-only" htmlFor="exampleInputEmail3">
          {this.props.placeholder}
        </label>
        <input
          type="text"
          className="form-control"
          placeholder={this.props.placeholder}
          value={this.props.filterText}
          onChange={this.handleFilterTextInputChange.bind(this)}
          onKeyPress={handleKeyPress}
        />
      </div>
    );
  }
}

export default TextBox;
