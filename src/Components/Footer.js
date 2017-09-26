import React from "react";
import { Grid, Nav, NavItem } from "react-bootstrap";
import "./app.css";
import "./footer.css";

function Footer(/*props*/) {
  return (
    <footer>
      <div className="pre-cont">pre-cont - add google translate</div>
      <div className="main">
        <div className="container">
          <h2>Explore Westminster</h2>

          <ul>
            <div className="col-sm-3 col-xs-6">
              <li>
                <a href="">Contact us</a>
              </li>
              <li>
                <a href="">Council Tax</a>
              </li>
            </div>
            <div className="col-sm-3 col-xs-6">
              <li>
                <a href="">Licensing</a>
              </li>
              <li>
                <a href="">Planning</a>
              </li>
            </div>
            <div className="col-sm-3 col-xs-6">
              <li>
                <a href="">Births, deasths and marriages</a>
              </li>
              <li>
                <a href="">Libraries</a>
              </li>
            </div>
            <div className="col-sm-3 col-xs-6">
              <li>
                <a href="">Parking</a>
              </li>
              <li>
                <a href="">Recycling, rubbish and waste</a>
              </li>
            </div>
          </ul>
        </div>
      </div>

      <div className="post-cont">
        <div className="container">
          <ul>
            <li>
              <a href="">Disclaimer</a>
            </li>
            <li>
              <a href="">Privacy</a>
            </li>
            <li>
              <a href="">Freedom of Information</a>
            </li>
            <li>
              <a href="">Copyright</a>
            </li>
            <li>
              <a href="">Accessibility</a>
            </li>
            <li>
              <a href="">Newsletters</a>
            </li>
            <li>
              <a href="">Applications and payments</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="last-bar">
        <div className="container">
          <div className="logo icon-brand-logo" />
          <div className="copyright">© Westminster City Council</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
