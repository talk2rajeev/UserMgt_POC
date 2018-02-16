
import { combineReducers } from 'redux'

import { 
    GET_USERLIST, 
    CREATE_USER,
    AUTHENTICATE_USER ,
    REMOVE_USER,
    OPEN_MODAL,
    CLOSE_MODAL,
    SELECT_USER,
    SORT_USER,
    SEARCH_USER,
    GET_ROLES,
    CREATE_NEW_ROLES,
    GET_PERMISSIONS,
    CREATE_NEW_PERMISSION,
    DELETE_ROLES_PERM
} from '../actions/index';


let initialUser = {
    users: []
};

const getUserList = (state=initialUser, action) => {
    switch(action.type){
        case GET_USERLIST:
            return { users: action.users ,originalUsers: action.originalUsers} 
        case CREATE_USER:
            return { users: action.users ,originalUsers: action.originalUsers}     
        case REMOVE_USER:
            return { users: action.users ,originalUsers: action.originalUsers}   
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


const allReducers = combineReducers({
    userlist: getUserList,
    authentication: userAuthentication,
    modal: modal,
    selectedUser: selectUser,
    roles: getRoles,
    permissions: getPermission
});

export default allReducers;