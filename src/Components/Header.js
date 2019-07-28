import React, { Component } from "react";
import SearchBar from "./Form/SearchBar";
import { Glyphicon } from "react-bootstrap";
import $ from "jquery";
import "./funnelback.css";
import MediaQuery from "react-responsive";
import SearchToggle from "./Form/SearchToggle";

//import "./newheader.css";

const SearchBarStyle = {
  marginTop: "12px"
};

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      query: "",
      displayMobileSearch: false
    };

    this.handleTitleTextInput = this.handleTitleTextInput.bind(this);
    this.handleSearchToggle = this.handleSearchToggle.bind(this);
  }

  componentDidMount() {
    $("#main-menu-toggle").click(function(event) {
      event.preventDefault();
      window.location.hash = "#main-menu";
      window.scrollTo(0, 0);
    });
  }

  handleSearchToggle(e) {
    console.log("handle toggle");
    this.setState(prevState => ({
      displayMobileSearch: !prevState.displayMobileSearch
    }));
  }

  handleTitleTextInput(e) {
    console.log("text change");
    this.setState({
      query: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    window.location =
      "https://www.westminster.gov.uk/search?collection=wcc-web-website&query=" +
      this.state.query;
  }

  render() {
    return (
      <div>
        <header role="banner">
          <div className="mobile-overlay"></div>
          <div className="top-bar">
            <div className="row header__row">
              <div className="inner cf">
                <div className="large-1 small-1 columns header__menu-toggle">
                  <a
                    href="https://www.westminster.gov.uk/#main-menu"
                    id="main-menu-toggle"
                    className="menu-toggle"
                    aria-label="Open main menu"
                  >
                    <span className="sr-only">Open main menu</span>
                    <span className="fa fa-bars" aria-hidden="true"></span>
                  </a>
                </div>

                <div className="large-3 small-10 columns">
                  <div className="header__logo">
                    <a
                      href="https://www.westminster.gov.uk/"
                      title="Home"
                      className="logo"
                    >
                      <img src="https://www.westminster.gov.uk/sites/default/themes/wcc2019/img/wcc_logo.png" />
                    </a>
                  </div>

                  <a
                    href="https://www.westminster.gov.uk/#main-menu-toggle"
                    className="backdrop"
                    tabIndex="-1"
                    aria-hidden="true"
                    hidden=""
                  ></a>
                </div>

                <div className="large-5 columns section-menu-wrapper">
                  <ul className="section-menu">
                    <li className="section-menu__item section-menu__item--applynpay">
                      <a href="https://www.westminster.gov.uk/apply-and-pay">
                        Apply and pay
                      </a>
                    </li>
                    <li className="section-menu__item section-menu__item--reportit">
                      <a href="https://www.westminster.gov.uk/report-it">
                        Report it
                      </a>
                    </li>
                    <li className="section-menu__item section-menu__item--lnp">
                      <a href="https://www.westminster.gov.uk/licensing-and-planning">
                        Licensing and planning
                      </a>
                    </li>
                    <li className="section-menu__item section-menu__item--find">
                      <a href="https://www.westminster.gov.uk/find-it">Find</a>
                    </li>
                  </ul>
                </div>

                {/* <div className="large-3 small-1 columns header__search-toggle">
                  <SearchToggle
                    handleSearchToggle={this.handleSearchToggle.bind(this)}
                    displayMobileSearch={this.displayMobileSearch}
                  />
                </div> */}

                <div className="large-3 columns">
                  <SearchBar
                    displayMobileSearch={this.state.displayMobileSearch}
                  />
                  <SearchToggle
                    handleSearchToggle={this.handleSearchToggle.bind(this)}
                    displayMobileSearch={this.displayMobileSearch}
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="navcontent">
          <nav id="main-menu" className="main-menu" aria-label="Main menu">
            <a
              href="#main-menu-toggle"
              id="main-menu-close"
              className="menu-close"
              aria-label="Close main menu"
            >
              <span className="sr-only">Close main menu</span>
              <span className="fa fa-close" aria-hidden="true"></span>
            </a>

            <div className="bignav">
              <div className="column">
                <h3 className="bignav__header bignav__header--applynpay">
                  Apply and pay
                </h3>
                <ul className="menu">
                  <li className="first leaf">
                    <a href="/benefits" title="">
                      Benefits
                    </a>
                  </li>
                  <li className="leaf">
                    <a href="/births-deaths-marriages-and-citizenship" title="">
                      Births, death, marriages and citizenship
                    </a>
                  </li>
                  <li className="leaf">
                    <a href="/businessrates" title="">
                      Business rates
                    </a>
                  </li>
                  <li className="leaf">
                    <a href="/council-tax" title="">
                      Council Tax
                    </a>
                  </li>
                  <li className="leaf">
                    <a href="/housing" title="">
                      Housing
                    </a>
                  </li>
                  <li className="leaf">
                    <a href="/parking-residents" title="">
                      Parking permits
                    </a>
                  </li>
                  <li className="last leaf">
                    <a href="/parking-tickets" title="">
                      Parking tickets
                    </a>
                  </li>
                </ul>{" "}
              </div>

              <div className="column">
                <h3 className="bignav__header bignav__header--reportit">
                  Report it
                </h3>
                <ul className="menu">
                  <li className="first leaf">
                    <a href="/report-it-animal-nuisance" title="">
                      Animal nuisance
                    </a>
                  </li>
                  <li className="leaf">
                    <a
                      href="https://webforms.westminster.gov.uk/report-drainage"
                      title=""
                      className="ext"
                      target="_blank"
                    >
                      Drainage or surface water
                    </a>
                  </li>
                  <li className="leaf">
                    <a
                      href="https://webforms.westminster.gov.uk/report-faulty-street-light"
                      title=""
                      className="ext"
                      target="_blank"
                    >
                      Faulty street light
                    </a>
                  </li>
                  <li className="leaf">
                    <a
                      href="https://webforms.westminster.gov.uk/report-fly-tipping"
                      title=""
                      className="ext"
                      target="_blank"
                    >
                      Fly tipping
                    </a>
                  </li>
                  <li className="leaf">
                    <a
                      href="https://webforms.westminster.gov.uk/report-food-safety"
                      title=""
                      className="ext"
                      target="_blank"
                    >
                      Food safety
                    </a>
                  </li>
                  <li className="leaf">
                    <a
                      href="https://webforms.westminster.gov.uk/report-missed-bin"
                      title=""
                      className="ext"
                      target="_blank"
                    >
                      Missed recycling or rubbish collection
                    </a>
                  </li>
                  <li className="leaf">
                    <a
                      href="https://webforms.westminster.gov.uk/report-noise"
                      title=""
                      className="ext"
                      target="_blank"
                    >
                      Noise
                    </a>
                  </li>
                  <li className="leaf">
                    <a
                      href="https://forms.westminster.gov.uk/Viewer-VicForms.asp?user=anon&amp;Form=Planning%20Complaint%20Form%20(1.0).wdf"
                      title=""
                      className="ext"
                      target="_blank"
                    >
                      Planning breach
                    </a>
                  </li>
                  <li className="leaf">
                    <a
                      href="https://webforms.westminster.gov.uk/report-pothole"
                      title=""
                      className="ext"
                      target="_blank"
                    >
                      Pothole
                    </a>
                  </li>
                  <li className="leaf">
                    <a
                      href="https://webforms.westminster.gov.uk/report-smoke-and-odours"
                      title=""
                      className="ext"
                      target="_blank"
                    >
                      Smoke and odours
                    </a>
                  </li>
                  <li className="leaf">
                    <a
                      href="https://webforms.westminster.gov.uk/request-street-washing"
                      title=""
                      className="ext"
                      target="_blank"
                    >
                      Street washing
                    </a>
                  </li>
                  <li className="leaf">
                    <a href="/report-it-street-works" title="">
                      Street works
                    </a>
                  </li>
                  <li className="last leaf">
                    <a href="/report-it-vehicles" title="">
                      Vehicles
                    </a>
                  </li>
                </ul>{" "}
              </div>

              <div className="column">
                <h3 className="bignav__header bignav__header--lnp">
                  Licensing and <br /> planning
                </h3>
                <ul className="menu">
                  <li className="first leaf">
                    <a href="/apply-for-licence-online" title="">
                      Apply for, renew or update a licence
                    </a>
                  </li>
                  <li className="leaf">
                    <a href="/licensing-charter" title="">
                      The Licensing Charter
                    </a>
                  </li>
                  <li className="leaf">
                    <a href="/pay-your-annual-fee" title="">
                      Pay your annual licence fee
                    </a>
                  </li>
                  <li className="leaf">
                    <a
                      href="/view-licence-applications-temporary-event-notices-and-licences"
                      title=""
                    >
                      View licence applications
                    </a>
                  </li>
                  <li className="leaf">
                    <a
                      href="/planning-applications-decisions-archived-records"
                      title=""
                    >
                      Planning applications
                    </a>
                  </li>
                  <li className="leaf">
                    <a href="/planning-policy" title="">
                      Planning policy
                    </a>
                  </li>
                  <li className="leaf">
                    <a href="/comment-planning-application" title="">
                      Comment on a planning application
                    </a>
                  </li>
                  <li className="last leaf">
                    <a href="/planning-application-fees" title="">
                      Planning application fees
                    </a>
                  </li>
                </ul>{" "}
              </div>

              <div className="column">
                <h3 className="bignav__header bignav__header--find">Find</h3>
                <ul className="menu">
                  <li className="first leaf">
                    <a
                      href="https://parkright.westminster.gov.uk/whereitworks/42152"
                      title=""
                      className="ext"
                      target="_blank"
                    >
                      Parking spaces
                    </a>
                  </li>
                  <li className="leaf">
                    <a href="/libraries" title="">
                      Libraries
                    </a>
                  </li>
                  <li className="leaf">
                    <a
                      href="http://transact.westminster.gov.uk/env/streetsearch.aspx"
                      title=""
                      className="ext"
                      target="_blank"
                    >
                      Rubbish and recycling collection times
                    </a>
                  </li>
                  <li className="leaf">
                    <a
                      href="https://lbhf.maps.arcgis.com/apps/Viewer/index.html?appid=da1e9759943844e0a9ee9aac9a80d35d"
                      title=""
                      className="ext"
                      target="_blank"
                    >
                      Electric vehicle charge points
                    </a>
                  </li>
                  <li className="leaf">
                    <a
                      href="https://lbhf.maps.arcgis.com/apps/LocalPerspective/index.html?appid=c761924c7ddd4190965f8bd332ad5286"
                      title=""
                      className="ext"
                      target="_blank"
                    >
                      Libraries map
                    </a>
                  </li>
                  <li className="leaf">
                    <a href="/births-deaths-marriages-and-citizenship" title="">
                      Births, deaths, marriages and citizenship
                    </a>
                  </li>
                  <li className="leaf">
                    <a
                      href="https://www.westminster.gov.uk/information-about-westminster-cemeteries"
                      title=""
                    >
                      Cemeteries
                    </a>
                  </li>
                  <li className="leaf">
                    <a
                      href="/household-waste-recycling-centre-smugglers-way"
                      title=""
                    >
                      Recycling centre
                    </a>
                  </li>
                  <li className="leaf">
                    <a href="/conservation-areas" title="">
                      Conservation areas
                    </a>
                  </li>
                  <li className="leaf">
                    <a
                      href="http://transact.westminster.gov.uk/docstores/publications_store/sport/acitveguidemap.pdf"
                      title=""
                      className="ext"
                      target="_blank"
                    >
                      Leisure centres
                    </a>
                  </li>
                  <li className="leaf">
                    <a
                      href="http://public.londonworks.gov.uk/roadworks/home"
                      title=""
                      className="ext"
                      target="_blank"
                    >
                      Roadworks
                    </a>
                  </li>
                  <li className="leaf">
                    <a href="/distance-maps-school-admissions" title="">
                      Cut-off distance maps for school admissions
                    </a>
                  </li>
                  <li className="leaf">
                    <a
                      href="https://lbhf.maps.arcgis.com/apps/webappviewer/index.html?id=4d8967c3e0ec4e46ac5eed68a63b2439"
                      title=""
                      className="ext"
                      target="_blank"
                    >
                      Councillors and wards
                    </a>
                  </li>
                  <li className="leaf">
                    <a href="https://www.westminster.gov.uk/my-parks/" title="">
                      Parks
                    </a>
                  </li>
                  <li className="last leaf">
                    <a
                      href="https://tfl.gov.uk/modes/cycling/santander-cycles/find-a-docking-station"
                      title=""
                      className="ext"
                      target="_blank"
                    >
                      Cycle hire
                    </a>
                  </li>
                </ul>{" "}
              </div>
            </div>

            <div className="smallnav">
              <ul className="mobile-menu">
                <li className="mobile-menu__item mobile-menu__item--applynpay">
                  <a href="/apply-and-pay">Apply and pay</a>
                </li>
                <li className="mobile-menu__item mobile-menu__item--reportit">
                  <a href="/report-it">Report it</a>
                </li>
                <li className="mobile-menu__item mobile-menu__item--lnp">
                  <a href="/licensing-and-planning">Licensing and planning</a>
                </li>
                <li className="mobile-menu__item mobile-menu__item--find">
                  <a href="/find-it">Find</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;
