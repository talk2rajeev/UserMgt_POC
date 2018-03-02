import getUserList from '../../../src/store/reducers/index';
/*
const getUserList = (state=initialUser, action) => {
    switch(action.type){
        case GET_USERLIST:
            return { users: action.users ,originalUsers: action.originalUsers} 
        case CREATE_USER:
            return { ...state}     
        case REMOVE_USER:
            return { ...state }   
        case SORT_USER:
            return { users: action.users ,originalUsers: action.originalUsers}   
        case SEARCH_USER:
            return { users: action.users ,originalUsers: action.originalUsers}             
        default: 
            return state;
    }
}
*/
let defaultStore = {
    "authentication": {"authentication": {}}, 
    "modal": {"editUserModal": false}, 
    "pagination": {"pagination": {"curPage": 1, "pageSize": 10, "totalPage": 1}}, 
    "permissions": [], 
    "roles": [], 
    "selectedUser": {"users": []}, 
    "selectedUserGroup": {}, 
    "transfer": {"AssignUserToGroupTransfer": false, "groupedUsers": [], "groupname": ""}, 
    "usergroupslist": {"usergroups": []}, 
    "userlist": {"users": []}
};

describe('Get User Reducer', ()=>{
    it('It has default state', ()=>{
        expect(getUserList(undefined, {type: 'unexpected'})).toEqual(
            defaultStore  
        )
    })

    it('createUser :: It has all default states', ()=>{
        expect(getUserList(undefined, {type: 'CREATE_USER' })).toEqual(
            defaultStore  
        )
    })
    it('removeUser :: It has all default states', ()=>{
        expect(getUserList(undefined, {type: 'REMOVE_USER' })).toEqual(
            defaultStore  
        )
    })
    
    it('sortUser :: It has all default states', ()=>{
        defaultStore.selectedUser.originalUsers = undefined;
        defaultStore.selectedUser.users = undefined;
        expect(getUserList(undefined, {type: 'SORT_USER' })).toEqual(
            {"authentication": {"authentication": {}}, "modal": {"editUserModal": false}, "pagination": {"pagination": {"curPage": 1, "pageSize": 10, "totalPage": 1}}, "permissions": [], "roles": [], "selectedUser": {"originalUsers": [], "users": []}, "selectedUserGroup": {}, "transfer": {"AssignUserToGroupTransfer": false, "groupedUsers": [], "groupname": ""}, "usergroupslist": {"usergroups": []}, "userlist": {"users": []}}  
        )
    })

})