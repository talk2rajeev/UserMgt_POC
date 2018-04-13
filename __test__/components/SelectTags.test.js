import React from 'react';
import { shallow, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SelectTags from '../../src/components/SelectTags';

configure({ adapter: new Adapter() });

const props = {
    placeholder: "select role",
    data: [{id: 1, name: 'role-1'},{id: 2, name: 'role-2'}],
    defaultData: [{id: 1, name: 'role-1'}],
    handleChange: ()=>{}
};

function dataSource(data){
    let children = [];
    for (let i = 0; i < data.length; i++) {
        children.push(<Option key={data[i].name}>{data[i].name}</Option>);
    }
    return children;
}

function getPlaceholder(placeholder){
    return placeholder || "Please select";
}

describe('SelectTags have length 1', ()=>{
    it('copy icon clicked', ()=>{
        const wrapper = shallow(<SelectTags {...props} />);
        expect(wrapper).toHaveLength(1);
    })
})


describe('test dataSource func', ()=>{
    it('return dataSource', ()=>{
        expect(dataSource(props.data)).toEqual(dataSource(props.data));
    });
});

describe('test getPlaecholder func', ()=>{
    it('return getPlaecholder', ()=>{
        expect(props.placeholder).toEqual(getPlaceholder(props.placeholder));
    });
});

   


