import React from 'react';
import moment from 'moment';

export function DatePanel(props) {
  return (
    <div className="date-info">
      <div className="custom-dayOfWeek">{moment(props.date).format('ddd')}</div>
      <div className="custom-day">{moment(props.date).format('D')}</div>
      <div className="custom-month">
        {moment(props.date).format('MMM')} {moment(props.date).format('YYYY')}
      </div>
    </div>
  );
}
