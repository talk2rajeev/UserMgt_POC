import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateClientForm from '../../src/components/CreateClientForm';


configure({ adapter: new Adapter() });

let props = {
    inputChangeHandler: ()=>{},
    closeCreateClientBox: ()=>{},
    submitClientForm: ()=>{},
    closeCreateClientBox: ()=>{},
    submitClientForm: ()=>{}
};

describe('CreateClientForm has length 1', ()=>{
    it('It length=1', ()=>{
        const wrapper = shallow(<CreateClientForm />);
        expect(wrapper).toHaveLength(1);
    })
})

describe('CreateClientForm has 2 btns ', ()=>{
    it('It has 2 btns ', ()=>{
        const wrapper = shallow(<CreateClientForm />);
        expect(wrapper.find('.btn')).toHaveLength(2);
    })
})

describe('cancel btn clicked ', ()=>{
    it('onchange call func', ()=>{
        const wrapper = shallow(<CreateClientForm {...props}/>);
        wrapper.find('.btn-default').simulate('change');
    })

    it('submit btn clicked ', ()=>{
        const wrapper = shallow(<CreateClientForm {...props}/>);
        wrapper.find('.btn-primary').simulate('change');
    })
})



describe('CreateClientForm has 7 inputs ', ()=>{
    it('It has  7 inputs ', ()=>{
        const wrapper = shallow(<CreateClientForm {...props}/>);
        expect(wrapper.find('input')).toHaveLength(7);
    })
})

describe('onChange call func for input1', ()=>{
    it('onchange call func', ()=>{
        const wrapper = shallow(<CreateClientForm {...props}/>);
        wrapper.find('.input1').simulate('change');
    })

    it('onchange call func', ()=>{
        const wrapper = shallow(<CreateClientForm {...props}/>);
        wrapper.find('.input2').simulate('change');
    })

    it('onchange call func', ()=>{
        const wrapper = shallow(<CreateClientForm {...props}/>);
        wrapper.find('.input3').simulate('change');
    })

    it('onchange call func', ()=>{
        const wrapper = shallow(<CreateClientForm {...props}/>);
        wrapper.find('.input4').simulate('change');
    })

    it('onchange call func', ()=>{
        const wrapper = shallow(<CreateClientForm {...props}/>);
        wrapper.find('.input5').simulate('change');
    })

    it('onchange call func', ()=>{
        const wrapper = shallow(<CreateClientForm {...props}/>);
        wrapper.find('.input6').simulate('change');
    })

    it('onchange call func', ()=>{
        const wrapper = shallow(<CreateClientForm {...props}/>);
        wrapper.find('.input7').simulate('change');
    })

    it('onchange call func', ()=>{
        const wrapper = shallow(<CreateClientForm {...props}/>);
        wrapper.find('.input8').simulate('change');
    })
})
 
