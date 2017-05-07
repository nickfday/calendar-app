import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//import './App.css';
//import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import NavList from './NavList';
import Home from './Home';
var Spinner = require('react-spinkit');

class Layout extends Component {
	constructor(){
		super();
		this.state = {
		  navItems: []
		}
	}

	 getNavItems(){
    this.setState({navItems: [
      {
        title: 'Home',
        link: '/'
      },
      {
        title: 'Exercise',
        link: 'exercise'
      }
    ]});
  }

	componentWillMount(){
    this.getNavItems();
  }

  componentDidMount(){
  	this.getNavItems();
  }

	render() {
		return (
			 <div>
    	<NavList navItems={this.state.navItems} />
    	</div>
		);
	}
}

export default Layout;
