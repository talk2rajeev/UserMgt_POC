import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EditRoleModal from '../../src/components/EditRoleModal';
import SelectTags from '../../src/components/SelectTags';
import { Popconfirm, Tooltip } from 'antd';



configure({ adapter: new Adapter() });
var getDefaultPermissions = function([]){
return []
}
const props = {
    role: {_id: 1, name: '12', permission: []},
    permissions: [],
    childInputChangehandler: ()=>{},
    closeModal: ()=>{},
    handleChange: ()=>{},
    updateEditedRole: ()=>{}
};
let arr = ['1','2'];

describe('test getDefaultPermissions func', ()=>{
    it('return getDefaultPermissions', ()=>{
        expect(getDefaultPermissions([])).toEqual([]);
    });

    it('return getDefaultPermissions', ()=>{
        expect(getDefaultPermissions(arr)).toEqual(arr);
    });
});



//let openEditClientModal = function openEditClientModal(){}

describe('EditRoleModal is rendrered once', ()=>{
    it('rendered once', ()=>{
        const wrapper = shallow(<EditRoleModal {...props}/>);
        expect(wrapper).toHaveLength(1);
    })
})  

describe('modal-container length 1', ()=>{
    it('length 1', ()=>{
        const wrapper = shallow(<EditRoleModal {...props}/>);
        expect(wrapper.find('.modal-container')).toHaveLength(1);
    })

    it('length 1', ()=>{
        const wrapper = shallow(<EditRoleModal {...props}/>);
        expect(wrapper.find('.modal')).toHaveLength(1);
    })

    it('length 1', ()=>{
        const wrapper = shallow(<EditRoleModal {...props}/>);
        expect(wrapper.find('.modal-header')).toHaveLength(1);
    })

    it('length 1', ()=>{
        const wrapper = shallow(<EditRoleModal {...props}/>);
        expect(wrapper.find('.modal-body')).toHaveLength(1);
    })

    it('length 1', ()=>{
        const wrapper = shallow(<EditRoleModal {...props}/>);
        expect(wrapper.find('.modal-footer')).toHaveLength(1);
    })
})


describe('SelectTags have length 1', ()=>{
    it('copy icon clicked', ()=>{
        const wrapper = shallow(<SelectTags data={["1", "2"]} defaultData={["1"]} />);
        expect(wrapper).toHaveLength(1);
    })
})

describe('SelectTags have handleChange ', ()=>{
    it('copy icon clicked', ()=>{
        shallow(<EditRoleModal {...props}/>).simulate('handleChange');
    })
})


describe('EditRoleModal has 1 input', ()=>{
    it('It has  1 input ', ()=>{
        const wrapper = shallow(<EditRoleModal {...props}/>);
        expect(wrapper.find('input')).toHaveLength(1);
    })
})

describe('btn clicked', ()=>{
    it('btn click func', ()=>{
        const wrapper = shallow(<EditRoleModal {...props}/>);
        wrapper.find('.btn-default').simulate('click');
    })

    it('btn click func', ()=>{
        const wrapper = shallow(<EditRoleModal {...props}/>);
        wrapper.find('.btn-success').simulate('click');
    })
})

describe('onChange call func for input1', ()=>{
    it('onchange call func', ()=>{
        const wrapper = shallow(<EditRoleModal {...props}/>);
        wrapper.find('.input1').simulate('change');
    })
})

describe('close modal func', ()=>{
    it('closeModal func', ()=>{
        const wrapper = shallow(<EditRoleModal {...props}/>);
        wrapper.find('.fa-close').simulate('click');
    })
})

