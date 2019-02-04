import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';

it('Test example', () => {
  const wrapper = shallow(<Home />);
  expect(wrapper.is('section')).toBeTruthy();
});
