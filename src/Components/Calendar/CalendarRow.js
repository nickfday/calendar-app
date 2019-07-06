import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BSModal from "../Misc/BSModal";
import CSSTransitionGroup from "react-addons-css-transition-group";
import { Link } from "react-router-dom";
import { DatePanel } from "../Misc/DatePanel";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";

export const CalendarRow = props => {
  return (
    <CSSTransitionGroup
      component="div"
      transitionName="row"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionLeaveTimeout={500}
      transitionEnterTimeout={500}
      className="row event-row clearfix"
    >
      <div className="col-xs-3 col-md-2">
        <DatePanel date={props.event.startDate} />
      </div>
      <div className="event-info col-xs-9 col-md-10">
        <h3>
          <Link
            to={{
              pathname: props.event.path,
              state: {
                events: props.event
              }
            }}
          >
            <span>{ReactHtmlParser(props.event.title)}</span>
          </Link>
        </h3>
        <p>{ReactHtmlParser(props.event.summary)}</p>
        {props.event.location && (
          <BSModal
            buttonLabel={props.event.location}
            map={
              "https://www.google.com/maps/embed/v1/place?key=AIzaSyD8cbhTTREwAxNI3IxRLwMGfE1xb_eOINc&q=" +
              props.event.location
            }
          />
        )}
      </div>
    </CSSTransitionGroup>
  );
};
