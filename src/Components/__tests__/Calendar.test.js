import React from 'react';
import ReactDom from 'react-dom';
import { CalendarRow } from '../Calendar/CalendarRow';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

const testItem = {
  alt_title: '<a href="/events/test-event-0">Test Event</a>',
  audience: ['Over 65s', 'Young Adults'],
  body: 'Body',
  endDate: '2017-11-23 10:30:00',
  event_type: ['Motivation'],
  how_to_book: null,
  location: 'greenwich park, london',
  path: '/events/test-event-22-11-17',
  price: null,
  startDate: '2017-11-22 10:30:00',
  summary: 'Summary\n',
  title: 'Test Event',
  uuid: '6b356675-cf3f-4e56-b448-f69754bd70ee'
};

describe('<CalendarRow />', () => {
  it('outputs the expected title', () => {
    //const wrapper = shallow(<BlogRow item={[testItem]} />);
    const wrapper = shallow(<CalendarRow event={[testItem]} />);
    expect(wrapper.find('h3').text()).toEqual('Test Event');
  });
});
