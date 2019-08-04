import React, { Component } from "react";
import "./style/SearchBar.css";
//import "./westminster-main-sm.css";

const SearchBarStyle = {
  //marginTop: "12px"
};

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      visible: true
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
      <div
        for="edit-search-block-form--2"
        className={`search-box search-box-small ${
          this.props.displayMobileSearch ? "mobile-active" : "mobile-hidden"
        }`}
        style={SearchBarStyle}
      >
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            type="text"
            placeholder="Search"
            onChange={this.handleTitleTextInput.bind(this)}
            id="edit-search-block-form--2"
          />
          <a
            className="fa fa-search"
            onClick={this.handleSubmit.bind(this)}
            href=""
          ></a>
          <input type="submit" hidden />
        </form>
      </div>
    );
  }
}

export default SearchBar;
