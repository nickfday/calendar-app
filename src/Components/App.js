import React, { Component } from 'react';
import {  BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './Layout';
import './app.css';
import Footer from './Footer';
import Calendar from './Calendar/Calendar';
import CalendarSingle from './Calendar/CalendarSingle';

const NoMatch = ({ location }) => (
  <div className="container content">
    <h3>404- No match for <code>{location.pathname}</code></h3>
  </div>
);

class App extends Component {
  render() {
		return(
			<Router>
	  	<div>
	  		{<Layout />}
	  		<Switch>
			    <Route exact path="/" component={Calendar}/>
			    <Route exact path="/event/:id" component={CalendarSingle} />
			    <Route component={NoMatch}/>
		    </Switch>
		    < Footer />
	    </div>
	  </Router>
			)
	}
}

export default App;
