import React from "react";
import "./style/DemoCalendarRow.css";
import BSModal from "../Misc/BSModal";
import CSSTransitionGroup from "react-addons-css-transition-group";
import { Link } from "react-router-dom";
import moment from "moment";
import { splitMap } from "../Misc/Helper";

// export const DemoCalendarSingle = props => {
//   return <div>Single</div>;
// };

export const DemoCalendarRow = props => {
  return (
    <CSSTransitionGroup
      component="div"
      transitionName="row"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionLeaveTimeout={500}
      transitionEnterTimeout={500}
      className="event-row clearfix"
    >
      <div className="col-xs-3 col-md-2">
        <div className="date-info">
          <div className="custom-dayOfWeek">
            {moment(props.startDate).format("ddd")}
          </div>
          <div className="custom-day">
            {moment(props.startDate).format("D")}
          </div>
          <div className="custom-month">
            {moment(props.startDate).format("MMM")}
          </div>
          <div className="custom-year">
            {moment(props.startDate).format("YYYY")}
          </div>
        </div>
      </div>

      <div className="event-info col-xs-9 col-md-10">
        <h3>
          <Link
            to={{
              pathname: `/event/${props.event.uuid}`,
              state: {
                events: props.event,
                startDate: props.startDate,
                endDate: props.endDate
              }
            }}
          >
            {props.event.title}
          </Link>
        </h3>
        <p dangerouslySetInnerHTML={{ __html: props.event.summary }} />
        {props.event.location &&
          <BSModal
            buttonLabel={props.event.location}
            map={
              "https://www.google.com/maps/embed/v1/place?key=AIzaSyD8cbhTTREwAxNI3IxRLwMGfE1xb_eOINc&q=" +
              props.event.location
            }
          />}
      </div>
    </CSSTransitionGroup>
  );
};
