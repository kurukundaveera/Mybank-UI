import React, { Component } from 'react';
import { shallow } from 'enzyme';

import LandingPage from '../../Components/LandingPage/LandingPage';

const wrapper = shallow(<LandingPage />)
describe('It should render landing page component', () => {

    it('should render login', () => {
        expect(wrapper).toMatchSnapshot();
    })
})

describe('When submit button is clicked', () => {
    beforeEach(() => {
        const fakeEvent = { preventDefault: () => console.log('preventDefault') };
        const submit = wrapper.find('#register');
        submit.simulate('click', fakeEvent);
    });

});
