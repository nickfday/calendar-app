import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
//import 'bootstrap/dist/css/bootstrap-theme.css';
import "./header.css";
import "./Calendar/calendar-list.css";
import SearchBar from "./Form/SearchBar";
//import 'https://www.westminster.gov.uk/sites/www.westminster.gov.uk/themes/wcc/css/main-sm.css?opu6pq';

class Layout extends Component {
  render() {
    return (
      <div>
        <div className="top-bar">
          <div className="container">
            <div className="logo-wrap">
              <a href="/" title="Home" className="logo icon-logo">
                &nbsp;
              </a>
            </div>
            <div className="col-sm-right">
              <SearchBar />
            </div>
            <div className="switch icon-arrow-down hide-md-up" />
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
