import React, { Component } from "react";

export default class SearchToggle extends Component {
  constructor(props) {
    super();
    this.handleSearchToggle = this.handleSearchToggle.bind(this);
    this.state = {
      displayMobileSearch: false
    };
  }

  handleSearchToggle() {
    this.setState(prevState => ({
      displayMobileSearch: !prevState.displayMobileSearch
    }));
  }

  render() {
    return (
      <div className="mobile-search-toggle">
        <div
          href="https://www.westminster.gov.uk/#search-block-form"
          //id="search-toggle"
          className="search-toggle-2019"
          aria-label="Open search box"
          onClick={() => this.props.handleSearchToggle()}
        >
          <span className="sr-only">Open search box</span>
          <span className="fa fa-search" aria-hidden="true"></span>
        </div>{" "}
      </div>
    );
  }
}
