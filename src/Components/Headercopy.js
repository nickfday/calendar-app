import React, { Component } from "react";
import SearchBar from "./Form/SearchBar";
import { Glyphicon } from "react-bootstrap";

class Header extends React.Component {
  render() {
    return (
      <div class="top">
        <div class="col-xs-1">
          <Glyphicon glyph="align-justify" />
        </div>

        <div class="col-xs-10">
          <div class="header__logo">
            <a href="/" title="Home" class="logo">
              <img src="https://www.westminster.gov.uk/sites/default/themes/wcc2019/img/wcc_logo.png" />
            </a>
          </div>
        </div>

        <div class="hidden-xs col-sm-5">
          <nav class="navbar">
            <ul class="nav navbar-nav">
              <li class="active">
                <a href="#">
                  Link <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="section-menu__item section-menu__item--applynpay">
                <a href="/apply-and-pay">Apply and pay</a>
              </li>
              <li class="section-menu__item section-menu__item--reportit">
                <a href="/report-it">Report it</a>
              </li>
              <li class="section-menu__item section-menu__item--lnp">
                <a href="/licensing-and-planning">Licensing and planning</a>
              </li>
              <li class="section-menu__item section-menu__item--find">
                <a href="/find-it">Find</a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="col-sm-right">
          <SearchBar />
        </div>
      </div>
    );
  }
}

export default Header;
