import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import "./app.css";
import Footer from "./Footer";
import Calendar from "./Calendar/Calendar";
// import CalendarSingle from "./Calendar/CalendarSingle";
import DemoCalendarSingle from "./Demo/DemoCalendarSingle";

const NoMatch = ({ location }) =>
  <div className="container content">
    <h3>
      404- No match for <code>{location.pathname}</code>
    </h3>
  </div>;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "nick"
    };
  }
  render() {
    return (
      <Router>
        <div>
          {<Layout />}
          <Switch>
            <Route exact path="/" component={Calendar} name={this.state.name} />
            <Route
              exact
              path="/event/:id"
              component={DemoCalendarSingle}
              //component={CalendarSingle}
              name={this.state.name}
            />
            <Route component={NoMatch} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
