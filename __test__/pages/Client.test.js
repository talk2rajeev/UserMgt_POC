import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ConnectedClient, {_Client} from '../../src/pages/Client';
import ClientTable from '../../src/components/ClientTable';
import { Popconfirm, Tooltip } from 'antd';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const store = configureStore([
    thunk,
])();


configure({ adapter: new Adapter() });
let onClick = jest.fn();


const props = {
    clients : {
        clients: [
            {_id: '321DAD', accessToken: '90', clientId: 'wf4rfw', clientSecret: 'fsasfsdf', logoutURI: 'fsdaf', name: '', redirectUrl: '', refreshToken: ''}
        ], 
        originalClient:  [
            {_id: '321DAD', accessToken: '90', clientId: 'wf4rfw', clientSecret: 'fsasfsdf', logoutURI: 'fsdaf', name: '', redirectUrl: '', refreshToken: ''}        
        ]
    },
    pagination: {pagination: {curPage:1, pageSize: 10, totalPage: 4}},
    searchClient: ()=>{},
    setPageNumber: ()=>{},
    updateClient: ()=>{},
    getPagination: ()=>{},
    getClients: ()=>{},
    deleteClient: ()=>{},
    createClient: ()=>{}
};


describe('Cleint component rendered', ()=>{
    it('client comp has len 1', ()=>{
        const wrapper = shallow(
            <_Client {...props}  />
        );
    });
    expect(wrapper).toHaveLength(1);
})  

let a = {
    clients: [{id: '1', name: 'cl1'}],
    setClientId: ()=>{},
    confirmClientDelete: ()=>{},
    cancelClientDelete: ()=>{},
    openEditClientModal: ()=>{}    
}
describe('Cleint has CleintTable child', ()=>{
    it('It render ClientTable', ()=>{
        const wrapper = expect(shallow(<ClientTable {...a}/>)).toHaveLength(1);
    })
})


// describe('Edit icon clicked', ()=>{
//     it('Edit icon clicked', ()=>{
//         const wrapper = shallow(<ClientTable {...props}/>);
//         const icon = wrapper.find('.fa-pencil');
//         icon.simulate('click');
//     })
// })


// describe('confirm Delete icon clicked', ()=>{
//     it('confirm Delete icon clicked', ()=>{
//         const wrapper = shallow(<ClientTable {...props}/>);
//         const icon = wrapper.find(Popconfirm);
//         icon.simulate('click');
//     })
// })

// describe('popconfirm component check', ()=>{
//     it('popconfirm component check', ()=>{
//         const wrapper = shallow(<ClientTable {...props}/>);
//         expect(wrapper.find(Popconfirm)).toHaveLength(1);
//     })
// })
