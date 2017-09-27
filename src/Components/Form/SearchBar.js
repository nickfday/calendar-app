import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import "./style/SearchBar.css";
//import "./westminster-main-sm.css";

const SearchBarStyle = {
  float: "right",
  marginTop: "12px"
};

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      query: ""
    };

    this.handleTitleTextInput = this.handleTitleTextInput.bind(this);
  }

  handleTitleTextInput(e) {
    console.log("text change");
    this.setState({
      query: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    window.location =
      "https://www.westminster.gov.uk/search?collection=wcc-web-website&query=" +
      this.state.query;
  }

  render() {
    return (
      <div className="search-box search-box-small" style={SearchBarStyle}>
        <input
          type="text"
          placeholder="What would you like to do?"
          onChange={this.handleTitleTextInput.bind(this)}
        />
        <a
          className="btn"
          onClick={this.handleSubmit.bind(this)}
          //onClick={e => this.handleSubmit(e, this.state.query)}
          href=""
        >
          <span
            className="glyphicon glyphicon-search search"
            aria-hidden="true"
          />
        </a>
      </div>
    );
  }
}

export default SearchBar;