import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EditClientModal from '../../src/components/EditClientModal';
import { Popconfirm, Tooltip } from 'antd';



configure({ adapter: new Adapter() });

const props = {
    client: {_id: 1, accessToken: '12', accessTokenHr: '23', accessTokenMin: '23', clientId: '', clientSecret: '', logoutURI: '', name: '', redirectUrl: '', refreshToken: '', refreshTokenHr: '', refreshTokenMin: ''},
    closeEditClientModal: ()=>{},
    copyToClipboard: ()=>{},
    inputEditClientChangeHandler: ()=>{},
    updateClientForm: ()=>{}
};

//let openEditClientModal = function openEditClientModal(){}

describe('EditClientModal is rendrered once', ()=>{
    it('rendered once', ()=>{
        const wrapper = shallow(<EditClientModal {...props}/>);
        expect(wrapper).toHaveLength(1);
    })
})  

describe('modal-container length 1', ()=>{
    it('length 1', ()=>{
        const wrapper = shallow(<EditClientModal {...props}/>);
        expect(wrapper.find('.modal-container')).toHaveLength(1);
    })

    it('length 1', ()=>{
        const wrapper = shallow(<EditClientModal {...props}/>);
        expect(wrapper.find('.modal')).toHaveLength(1);
    })

    it('length 1', ()=>{
        const wrapper = shallow(<EditClientModal {...props}/>);
        expect(wrapper.find('.modal-header')).toHaveLength(1);
    })

    it('length 1', ()=>{
        const wrapper = shallow(<EditClientModal {...props}/>);
        expect(wrapper.find('.modal-body')).toHaveLength(1);
    })

    it('length 1', ()=>{
        const wrapper = shallow(<EditClientModal {...props}/>);
        expect(wrapper.find('.modal-footer')).toHaveLength(1);
    })
})



describe('Edit icon clicked', ()=>{
    it('copy icon clicked', ()=>{
        const wrapper = shallow(<EditClientModal {...props}/>);
        const icon = wrapper.find('.copy1');
        icon.simulate('click');
    })

    it('copy icon clicked', ()=>{
        const wrapper = shallow(<EditClientModal {...props}/>);
        const icon = wrapper.find('.copy2');
        icon.simulate('click');
    })
})


describe('CreateClientForm has 7 inputs ', ()=>{
    it('It has  7 inputs ', ()=>{
        const wrapper = shallow(<EditClientModal {...props}/>);
        expect(wrapper.find('input')).toHaveLength(9);
    })
})

describe('onChange call func for input1', ()=>{
    it('onchange call func', ()=>{
        const wrapper = shallow(<EditClientModal {...props}/>);
        wrapper.find('.input1').simulate('change');
    })

    it('onchange call func', ()=>{
        const wrapper = shallow(<EditClientModal {...props}/>);
        wrapper.find('.input2').simulate('change');
    })

    it('onchange call func', ()=>{
        const wrapper = shallow(<EditClientModal {...props}/>);
        wrapper.find('.input3').simulate('change');
    })

    it('onchange call func', ()=>{
        const wrapper = shallow(<EditClientModal {...props}/>);
        wrapper.find('.input4').simulate('change');
    })

    it('onchange call func', ()=>{
        const wrapper = shallow(<EditClientModal {...props}/>);
        wrapper.find('.input5').simulate('change');
    })

    it('onchange call func', ()=>{
        const wrapper = shallow(<EditClientModal {...props}/>);
        wrapper.find('.input6').simulate('change');
    })

    it('onchange call func', ()=>{
        const wrapper = shallow(<EditClientModal {...props}/>);
        wrapper.find('.input7').simulate('change');
    })

    it('onchange call func', ()=>{
        const wrapper = shallow(<EditClientModal {...props}/>);
        wrapper.find('.input8').simulate('change');
    })
})

