import React from 'react';
import './app.css';
import './footer.css';

function Footer(/*props*/) {
  return (
    <footer>
      <div className="pre-cont">
        <div className="container text-right">{/* <div id="google_translate_element" /> */}</div>
      </div>
      <div className="main">
        <div className="container">
          <h2>Explore Westminster</h2>
          <ul>
            <div className="col-sm-3 col-xs-6">
              <ul>
                <li>
                  <a href="/contact">Contact us</a>
                </li>
                <li>
                  <a href="/counciltax">Council Tax</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-3 col-xs-6">
              <ul>
                <li>
                  <a href="/licensing">Licensing</a>
                </li>
                <li>
                  <a href="/planning">Planning</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-3 col-xs-6">
              <ul>
                <li>
                  <a href="/births-deaths-marriages-and-citizenship">Births, deaths and marriages</a>
                </li>
                <li>
                  <a href="/libraries">Libraries</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-3 col-xs-6">
              <ul>
                <li>
                  <a href="/parking">Parking</a>
                </li>
                <li>
                  <a href="/household-recycling-rubbish-and-waste">Recycling, rubbish and waste</a>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>

      <div className="post-cont">
        <div className="container">
          <ul>
            <li>
              <a href="/disclaimer">Disclaimer</a>
            </li>
            <li>
              <a href="/website-privacy-policy">Privacy</a>
            </li>
            <li>
              <a href="/freedom-of-information">Freedom of Information</a>
            </li>
            <li>
              <a href="/copyright">Copyright</a>
            </li>
            <li>
              <a href="/accessibility">Accessibility</a>
            </li>
            <li>
              <a href="/stay-informed-westminster-newsletter">Newsletters</a>
            </li>
            <li>
              <a href="/online-applications-and-payments">Applications and payments</a>
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
