import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import NavItem from './NavItem';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class NavList extends Component {
  render() {
    let NavItems;
    if (this.props.navItems) {
      NavItems = this.props.navItems.map(project => {
        return <NavItem project={project} key={project.title} />;
      });
    }
    return (
      <Navbar
        //className="bg-inverse"
        fixedTop={true}
        collapseOnSelect
      >
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">WCC Calendar</Link>
          </Navbar.Brand>
          <Navbar.Toggle className="navbar-toggler-icon" />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav>{NavItems}</Nav>
          <form className="form-inline my-2 my-lg-0 pull-right">
            <input className="form-control mr-sm-2" type="text" placeholder="Search" />
            <button className="btn btn-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

NavList.propTypes = {
  navItems: PropTypes.array,
  onDelete: PropTypes.func
};

export default NavList;
