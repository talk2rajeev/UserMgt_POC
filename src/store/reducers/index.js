
import { combineReducers } from 'redux'

import { 
    GET_USERLIST, 
    CREATE_USER,
    AUTHENTICATE_USER ,
    REMOVE_USER,
    OPEN_MODAL,
    CLOSE_MODAL,
    GET_MODAL,
    SELECT_USER,
    SORT_USER,
    SEARCH_USER,
    GET_ROLES,
    CREATE_NEW_ROLES,
    GET_PERMISSIONS,
    CREATE_NEW_PERMISSION,
    DELETE_ROLES_PERM,
    DELETE_ROLE,
    GET_USER_GROUP,
    SELECTED_USER_GROUP,
    GET_USERGROUPLIST,
    REMOVE_USERGROUP,
    CREATE_NEW_GROUP,
    SORT_USERGROUP,
    SEARCH_USERGROUP,
    OPEN_TRANSFER,
    SET_PAGE_NUMBER,
    GET_PAGINATION,
    SET_PAGE_TOTAL,
    GET_CLIENT_LIST
} from '../actions/index';




let initialClient = [];
export const getClientList = (state=initialClient, action) => {
    switch(action.type){
        case GET_CLIENT_LIST:
            return { clients: action.client }             
        default: 
            return state;
    }
}




let initialUser = { users: [] };
export const getUserList = (state=initialUser, action) => {
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

const selectUser = (state=initialUser, action) => {
    switch(action.type){
        case SELECT_USER:
            return { user: action.user }  
        default: 
            return state;
    }
}

const userAuthentication = (state={authentication:{}}, action) => {
    switch(action.type){
        case AUTHENTICATE_USER:
            return { authentication: action.authentication } 
        default: 
            return state;
    }
}

const removeuser = (state={users:[]}, action) => {
    switch(action.type){
        case REMOVE_USER:
            return { users: action.users } 
        default: 
            return state;
    }
}

let initialModal = {
    editUserModal: false
}
const modal = (state=initialModal, action) => {
    //debugger
    switch(action.type){
        case OPEN_MODAL:
            if(action.modaltype == 'edituser'){
                return { editUserModal: true }; 
                //Object.assign({}, state.modal, editUserModal : true)
                
            } 
        case CLOSE_MODAL:
            if(action.modaltype === 'edituser'){
                return { editUserModal: false }; 
                //Object.assign({}, state.modal, editUserModal : true)
                
            }  
        case GET_MODAL:   
            return {...state}    
        default: 
            return state;
    }
}




let initialUserGroup = {
    usergroups: []
 };
const getUserGroupList = (state=initialUserGroup, action) => {
    switch(action.type){
        case GET_USERGROUPLIST:
            return { usergroups: action.userGroups ,originalUsergroups: action.originalUserGroups}
        case REMOVE_USERGROUP:
            return { usergroups: action.userGroups ,originalUsergroups: action.originalUserGroups}  
        case SORT_USERGROUP:
            return { usergroups: action.userGroups ,originalUsergroups: action.originalUserGroups}  
        case SEARCH_USERGROUP:
            return { usergroups: action.userGroups ,originalUsergroups: action.originalUserGroups}
        case CREATE_NEW_GROUP:
            return { usergroups: action.userGroups ,originalUsergroups: action.originalUserGroups}           
        default:
            return state;
    }
 }

 let initialTransfer = {
    AssignUserToGroupTransfer: false,
    groupname:"",
    groupedUsers:[]
 
 }
 const transfer = (state=initialTransfer, action) => {
    switch(action.type){
        case OPEN_TRANSFER:
            if(action.groupname != '')
                return { AssignUserToGroupTransfer: true ,groupname:action.groupname,groupedUsers:action.usersOfUserGroup};
        default:
            return state;
    }
 }



const initialSelectedUserGroup = {};
const getSelectedUserGroup = (state=initialSelectedUserGroup, action) => {
    switch(action.type){
        case SELECTED_USER_GROUP:
            return { selectedUserGroup: action.userGroup}                  
        default: 
            return state;
    }
}



const initialRole = [];
const getRoles = (state=initialRole, action) => {
    switch(action.type){
        case GET_ROLES:
            return { roles: action.roles ,originalRoles: action.originalRoles}   
        case CREATE_NEW_ROLES:
            let roles = state.roles;
            roles.push(action.role);
            return {...state, roles: roles} 
        case DELETE_ROLES_PERM:  
            return {...state} 
        case DELETE_ROLE:
            return {...state}                 
        default: 
            return state;
    }
}



const initialPermission = [];
const getPermission = (state=initialRole, action) => {
    switch(action.type){
        case GET_PERMISSIONS:
            return { permissions: action.permissions, originalPermissions: action.originalPermissions }   
        case CREATE_NEW_PERMISSION:
            let permissions = {...state.permissions};
            permissions.push(action.permission);
            return {...state, permissions: permissions}             
        default: 
            return state;
    }
}



const initialPagination = {pagination: {curPage: 1, totalPage: 1, pageSize: 10} };
const getPagination = (state=initialPagination, action) => {
    let pagination =null;
    
    switch(action.type){
        
        case GET_PAGINATION:
            return { pagination: action.pagination };  

        case SET_PAGE_NUMBER:
                pagination = {...state.pagination};
                pagination.curPage = action.page;
                return {...state, pagination: pagination};  

        case SET_PAGE_TOTAL:
                pagination = {...state.pagination};
                pagination.totalPage = action.total;
                return {...state, pagination: pagination};      

        default: 
            return state;
    }
}


const allReducers = combineReducers({
    clients: getClientList,
    userlist: getUserList,
    authentication: userAuthentication,
    modal: modal,
    selectedUser: selectUser,
    usergroupslist: getUserGroupList,
    transfer: transfer,
    selectedUserGroup: getSelectedUserGroup,
    roles: getRoles,
    permissions: getPermission,
    pagination: getPagination
});

export default allReducers;