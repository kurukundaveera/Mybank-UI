import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';

import FundTransfer from '../../Components/FundTransfer/FundTransfer';

const wrapper = shallow(<FundTransfer/>)
describe('It should render fund transfer component', () => {

    it('should render fundtransfer page', () => {
        expect(wrapper).toMatchSnapshot();
    })

    it('should render input form',()=>{
        expect(wrapper.find('form')).toHaveLength(1)
    })
    it('should render 5 input fields',()=>{
        expect(wrapper.find('input')).toHaveLength(4)
    })
    
   
})

describe('When submit button is clicked it should call handle submit', () => {
    
    it('should handle submit',()=>{
        const comp = mount(<FundTransfer />);
       // const fakeEvent = { preventDefault: () => console.log('preventDefault') };
          const spy = jest.spyOn(comp.instance(), 'handleSubmit');
          comp.instance().forceUpdate();
          comp.find('#submit').simulate('click');
          expect(spy).toHaveBeenCalled();

    })

});
