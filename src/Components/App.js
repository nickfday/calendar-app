import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import Header from "./Header";
import "./app.css";
import Footer from "./Footer";
import Reportit from "./Reportit";
import Calendar from "./Calendar/Calendar";
import CalendarSingle from "./Calendar/CalendarSingle";
import PageWrapper from "./PageWrapper";
import $ from "jquery";

/* polyfills.js */
import "core-js/fn/array/for-each.js";
import "core-js/fn/array/find.js";
import "core-js/fn/object/assign.js";
import "core-js/fn/object/keys.js";

const NoMatch = ({ location }) => (
  <div className="container content">
    <h3>
      404- No match for <code>{location.pathname}</code>
    </h3>
  </div>
);

class App extends Component {
  render() {
    return (
      <Router basename="/events-calendar">
        <div>
          {/* {<Layout />} */}
          {<Header />}
          <Switch>
            <Route exact path="/" component={PageWrapper(Calendar)} />
            <Route
              exact
              path="/events/:id"
              component={PageWrapper(CalendarSingle)}
            />
            <Route component={NoMatch} />
          </Switch>
          {/* <Reportit /> */}
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
