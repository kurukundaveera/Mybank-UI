import React, { Component } from 'react';
import { shallow } from 'enzyme';

import Register from '../../Components/Register/Register'

let wrapper;
    beforeEach(()=>{
        wrapper=shallow(<Register/>);
});


describe('It should render register component',()=>{
    it('should render input form',()=>{
        expect(wrapper.find('form')).toHaveLength(1)
    })
    it('should render 5 input fields',()=>{
        expect(wrapper.find('input')).toHaveLength(5)
    })
    
    it('should render login',()=>{
        expect(wrapper).toMatchSnapshot();
    })
})

describe('When submit button is clicked', () => {
    beforeEach(() => {
      wrapper.find('#email').simulate('change', { target: {'value':'darsana@gmail.com' } });
    //   wrapper.find('#firstName').simulate('change', { target: { name:'firstName',value: 'Darsana' } });
    //   wrapper.find('#lastName').simulate('onChange', { target: { name:'lastName',value: 'Mohan' } });
    //   wrapper.find('#mobileNo').simulate('onChange', { target: { name:'mobileNo',value: '9912312325' } });
    //   wrapper.find('#password').simulate('onChange', { target: { name:'password',value: 'darsana@123' } });
      const fakeEvent = { preventDefault: () => console.log('preventDefault') };
      const submit = wrapper.find('#registersubmit');
      submit.simulate('click', fakeEvent);
    });

    // it('should have excepted email', () => {
    //   console.log("Darsana state", wrapper.state())
    //   expect(wrapper.state().email).toEqual('darsana@gmail.com');
    // });

    // it('should have excepted firstName', () => {
    //     expect(wrapper.state().firstName).toEqual('Darsana');
    // });
    // it('should have excepted lastName', () => {
    //     expect(wrapper.state().lastName).toEqual('Mohan');
    // });
    // it('should have excepted mobileNo', () => {
    //     expect(wrapper.state().mobileNo).toEqual('9912312325');
    // });
    // it('should have excepted password', () => {
    //     expect(wrapper.state().password).toEqual('darsana@123');
    // });

  });

