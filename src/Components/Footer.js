import React from "react";
import "./app.css";
import "./footer.css";

function Footer(/*props*/) {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="row">
          <div className="column">
            <div className="content">
              <div className="footer__logo">
                <img
                  src="https://www.westminster.gov.uk/sites/default/themes/wcc2019/img/wcc_logo_white.png"
                  alt="Westminster City Council Logo"
                />
              </div>
              <ul className="footer__section-menu">
                <li>
                  <a href="/apply-and-pay">Apply and pay</a>
                </li>
                <li>
                  <a href="/report-it">Report it</a>
                </li>
                <li>
                  <a href="/licensing-and-planning">Licensing and planning</a>
                </li>
                <li>
                  <a href="/find-it">Find</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="columns">
            <div className="footer__social">
              <a
                href="https://www.facebook.com/CityWestminster/"
                title="Facebook"
                className="ext"
                target="_blank"
              >
                <i className="fa fa-facebook" aria-hidden="true"></i>
              </a>
              <span className="ext"></span>
              <a
                href="https://twitter.com/CityWestminster"
                title="Twitter"
                className="ext"
                target="_blank"
              >
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </a>
              <span className="ext"></span>
              <a
                href="https://www.instagram.com/citywestminster"
                title="Instagram"
                className="ext"
                target="_blank"
              >
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
              <span className="ext"></span>
            </div>
          </div>
        </div>

        <div className="row footer__links">
          <div className="columns">
            <ul className="menu">
              <li className="first leaf">
                <a href="/accessibility" title="">
                  Accessibility
                </a>
              </li>
              <li className="leaf">
                <a href="/jobs" title="">
                  Careers
                </a>
              </li>
              <li className="leaf">
                <a href="/contact" title="">
                  Contact us
                </a>
              </li>
              <li className="leaf">
                <a href="/data-protection" title="">
                  Data protection
                </a>
              </li>
              <li className="leaf">
                <a href="/freedom-of-information" title="">
                  Freedom of information
                </a>
              </li>
              <li className="leaf">
                <a
                  href="https://www.westminster.gov.uk/sites/default/files/gender_pay_gap_2018_2019.pdf"
                  title=""
                  className="ext"
                  target="_blank"
                >
                  Gender pay gap
                </a>
                <span className="ext"></span>
              </li>
              <li className="leaf">
                <a href="/modern-slavery-statement" title="">
                  Modern slavery statement
                </a>
              </li>
              <li className="leaf">
                <a href="/stay-informed-westminster-newsletter" title="">
                  Newsletters
                </a>
              </li>
              <li className="last leaf">
                <a href="/terms-conditions" title="">
                  Terms and conditions
                </a>
              </li>
            </ul>{" "}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
