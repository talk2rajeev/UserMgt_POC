import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import client from '../../src/pages/Client';
import ClientTable from '../../src/components/ClientTable';
import { Popconfirm, Tooltip } from 'antd';



configure({ adapter: new Adapter() });
let onClick = jest.fn();
let clients = [{_id: 1, name: 'something'}];


const props = {
    clients: [{_id: 1, name: 'something'}],
    openEditClientModal: ()=>{},
    confirmClientDelete: ()=>{},
    cancelClientDelete: ()=>{},
    setClientId: ()=>{},
    onConfirm: ()=>{},
    onCancel: ()=>{}
};

//let openEditClientModal = function openEditClientModal(){}

describe('Cleint Table has length 1', ()=>{
    it('It .table class', ()=>{
        const wrapper = shallow(<ClientTable {...props}/>);
        expect(wrapper).toHaveLength(1);
    })
})  

describe('Cleint Table has cleint props', ()=>{
    it('It has id and name', ()=>{
        const wrapper = shallow(<ClientTable {...props}/>);
        expect(wrapper.find('.table')).toHaveLength(1);
    })
})

describe('Cleint Table has cleint props', ()=>{
    it('It has id and name', ()=>{
        const wrapper = shallow(<ClientTable {...props}/>);
        expect(wrapper.find('.table')).toHaveLength(1);
    })
})

describe('Cleint Table has cleint props', ()=>{
    it('It has id and name', ()=>{
        const wrapper = shallow(<ClientTable {...props}/>);
        expect(wrapper.find('tr').children()).toHaveLength(5+1);

    })
})

describe('Edit icon clicked', ()=>{
    it('Edit icon clicked', ()=>{
        const wrapper = shallow(<ClientTable {...props}/>);
        const icon = wrapper.find('.fa-pencil');
        icon.simulate('click');
    })
})

describe('Delete icon clicked', ()=>{
    it('Delete icon clicked', ()=>{
        const wrapper = shallow(<ClientTable {...props}/>);
        const icon = wrapper.find('.fa-trash');
        icon.simulate('click');
    })
})

describe('confirm Delete icon clicked', ()=>{
    it('confirm Delete icon clicked', ()=>{
        const wrapper = shallow(<ClientTable {...props}/>);
        const icon = wrapper.find(Popconfirm);
        icon.simulate('click');
    })
})

describe('popconfirm component check', ()=>{
    it('popconfirm component check', ()=>{
        const wrapper = shallow(<ClientTable {...props}/>);
        expect(wrapper.find(Popconfirm)).toHaveLength(1);
    })
})

describe('popconfirm component check', ()=>{
    it('popconfirm component check', ()=>{
        const wrapper = shallow(<ClientTable {...props}/>);
        wrapper.find(Popconfirm).simulate('click');
    })
})

describe('popconfirm component check', ()=>{
    it('popconfirm component check', ()=>{
        const wrapper = shallow(<ClientTable {...props}/>);
        wrapper.find(Popconfirm).simulate('onConfirm');
    })
})

describe('popconfirm component check', ()=>{
    it('popconfirm component check', ()=>{
        const wrapper = shallow(<ClientTable {...props}/>);
        wrapper.find(Popconfirm).simulate('onCancel');
    })
})

describe('popconfirm Cancel Text check', ()=>{
    it('popconfirm Cancel Text check', ()=>{
        const wrapper = shallow(<Popconfirm cancelText="No" okText="Yes" />);
        expect(wrapper.props().cancelText).toEqual('No');   
    })
})

describe('popconfirm oktext check', ()=>{
    it('popconfirm oktext check', ()=>{
        const wrapper = shallow(<Popconfirm cancelText="No" okText="Yes" />);
        expect(wrapper.props().okText).toEqual('Yes');
    })
})
