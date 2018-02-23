import axios from 'axios';
import { sortDesc, sortAsc } from '../../utility/helper';
import {  message } from 'antd';


export const GET_USERLIST = "GET_USERLIST";
export const CREATE_USER = "CREATE_USER";
export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SELECT_USER = 'SELECT_USER';
export const SORT_USER = 'SORT_USER';
export const SEARCH_USER = 'SEARCH_USER';
export const GET_ROLES = 'GET_ROLES';
export const CREATE_NEW_ROLES = 'CREATE_NEW_ROLES';
export const GET_PERMISSIONS = 'GET_PERMISSIONS';
export const CREATE_NEW_PERMISSION = 'CREATE_NEW_PERMISSION';
export const DELETE_ROLES_PERM = 'DELETE_ROLES_PERM';
export const DELETE_ROLE = 'DELETE_ROLE';
export const GET_USER_GROUP = 'GET_USER_GROUP';
export const SELECTED_USER_GROUP = 'SELECTED_USER_GROUP';


let PATH = require('../../utility/Constants');

/*
Users
*/
export const getUsers = () => dispatch => {

    let url = `${PATH.BASE_PATH}${PATH.API_PATH.user.getall}`;
    
    //axios.get(`http://localhost:3000/user/getall`)
    axios.get(url)
      .then((response) => {
            dispatch( ({type: GET_USERLIST, users: response.data ,originalUsers:response.data}) )
      })
      .catch((err) => {
        console.error.bind(err);
      })

};


export const createNewUser = (user) => {
    
    let url = `${PATH.BASE_PATH}${PATH.API_PATH.user.update}`;
    
    axios.post(`http://localhost:3000/user/create`, user)
      .then((response) => {
            //dispatch( ({ type: CREATE_USER, users: response.data, originalUsers: response.data }) )
      })
      .catch((err) => {
        console.error.bind(err);
      })
        
}


export const authenticateUser = (user) => dispatch => {
    //let authentication = login(user)
    let authentication = {isLoggedIn: true, msg: 'login successfully'};
    dispatch( ({type: AUTHENTICATE_USER, authentication: authentication}) )
}


export const removeUser = (id) => (dispatch, getState) => {
    
    /*
    let users = getState().userlist.originalUsers;
    let newUsers = users.filter(function( obj ) {
        return obj.id !== parseInt(id);
    });
    dispatch( ({type: REMOVE_USER, users: newUsers, originalUsers:newUsers}) )
    */

    let url = `${PATH.BASE_PATH}${PATH.API_PATH.user.delete}`;
    
    axios.delete(`http://localhost:3000/user/delete`, {data: { id: id }} )
    .then((response) => {
        dispatch( ({type: REMOVE_USER, users: response.data, originalUsers: response.data}) )
    }).catch((err) => {
        console.error.bind(err);
    });

}


export const selectUser = (user) => (dispatch, getState) => {
    dispatch( ({type: SELECT_USER, user: user}) )
}

 
export const openModal = (type) => (dispatch) => {
    dispatch( ({type: OPEN_MODAL, modaltype: type}) )
}


export const closeModal = (type) => (dispatch) => {
    dispatch( ({type: CLOSE_MODAL, modaltype: type}) )
}


export const searchUsers = (searchValue) => (dispatch, getState) => {
    
    let users = getState().userlist.originalUsers;
    var searchedUsers;
    
    if(searchValue == ''){
     dispatch( ({type: SEARCH_USER, users: getState().userlist.originalUsers ,originalUsers:getState().userlist.originalUsers}) )
    }
    if(searchValue != ''){
        searchedUsers= users.filter(function(item){
           return item.name.toLowerCase().includes(searchValue.toLowerCase());
        });
     dispatch( ({type: SEARCH_USER, users: searchedUsers ,originalUsers:getState().userlist.originalUsers}) );
    }
    
}


export const sortUser = (sortType) => (dispatch, getState) => {
    let users = getState().userlist.users;
    if(sortType === 'desc'){
        dispatch( ({type: SORT_USER, users: sortDesc(users) ,originalUsers:getState().userlist.originalUsers}) )
    }
    if(sortType === 'asc'){
        dispatch( ({type: SORT_USER, users: sortAsc(users) ,originalUsers:getState().userlist.originalUsers}) )       
    }
}

export const deleteRoleFromUser = (uid, rid) => (dispatch, getState) => {

    let url = `${PATH.BASE_PATH}${PATH.API_PATH.user.delete}`;    
    
    axios.delete(`http://localhost:3000/user/role/delete`, {data: { id: uid, rid, rid }} )
      .then((response) => {
            dispatch( ({ type: GET_USERLIST, users: response.data ,originalUsers: response.data }) )
      })
      .catch((err) => {
        console.error.bind(err);
    })

}

export const submitEditedUser = () => (dispatch, getState) => {
    let user = getState().selectedUser.user;

    let url = `${PATH.BASE_PATH}${PATH.API_PATH.user.update}`;
    
    axios.put(`http://localhost:3000/user/update`, user )
      .then((response) => {
            dispatch( ({ type: GET_USERLIST, users: response.data ,originalUsers: response.data }) )
      })
      .catch((err) => {
        console.error.bind(err);
    })
}

/*
User Group
*/
export const getUserGroup = () => dispatch => {

    let url = `${PATH.BASE_PATH}${PATH.API_PATH.usergroup.getall}`;
    
    axios.get(`http://localhost:3000/usergroup/getall`)
      .then((response) => {
            dispatch( ({type: GET_USER_GROUP, userGroup: response.data, originalUserGroup: response.data}) )
      })
      .catch((err) => {
        console.error.bind(err);
    })
}

export const selectedUserGroup = (usergroup) => dispatch => {
    dispatch( ({type: SELECTED_USER_GROUP, userGroup: usergroup}) )
}

/*
Roles
*/
export const getRoles = () => dispatch => {

    let url = `${PATH.BASE_PATH}${PATH.API_PATH.role.getall}`;

    axios.get(`http://localhost:3000/role/getall`)
      .then((response) => {
            dispatch( ({type: GET_ROLES, roles: response.data ,originalRoles:response.data}) )
      })
      .catch((err) => {
        console.error.bind(err);
      })

};

export const createNewRoles = (role) => dispatch => {

    let url = `${PATH.BASE_PATH}${PATH.API_PATH.role.create}`;
    
    axios.post(`http://localhost:3000/role/create`, role)
      .then((response) => {
            dispatch( ({type: GET_ROLES, roles: response.data ,originalRoles:response.data}) )
      })
      .catch((err) => {
        console.error.bind(err);
      });

}

export const deletePermFromRoles = (id, pid) => (dispatch, getState)  => {
    
    let url = `${PATH.BASE_PATH}${PATH.API_PATH.role.delete}`;
    
    let promise = axios.delete(`http://localhost:3000/role/perm/delete`, {data: { id: id, pid: pid }} )
    promise.then((response) => {
            dispatch( ({ type: DELETE_ROLES_PERM }) );
            getRoles();
      })
      .catch((err) => {
        console.error.bind(err);
    });
    
};

export const deleteRole = (id) => (dispatch, getState)  => {
    
    let url = `${PATH.BASE_PATH}${PATH.API_PATH.role.delete}`;
    
    let promise = axios.delete(`http://localhost:3000/role/delete`, {data: { id: id }} )
    promise.then((response) => {
            dispatch( ({ type: DELETE_ROLE }) );
            getRoles();
      })
      .catch((err) => {
        console.error.bind(err);
    });
    
};

/*
Permission 
*/
export const getPermissions = () => dispatch => {

    let url = `${PATH.BASE_PATH}${PATH.API_PATH.permission.getall}`;

    //axios.get(`http://localhost:3000/permission/getall`)
    axios.get(url)
      .then((response) => {
            dispatch( ({type: GET_PERMISSIONS, permissions: response.data, originalPermissions: response.data}) );
      })
      .catch((err) => {
        console.error.bind(err);
      })
};

export const createNewPermission = (name) => dispatch => {

    let url = `${PATH.BASE_PATH}${PATH.API_PATH.permission.create}`;
    
    //axios.post(`http://localhost:3000/permission/create`, {name: name})
    axios.post(url, {name: name, clientId: ""})
      .then((response) => {
            //dispatch( ({type: GET_PERMISSIONS, permissions: response.data, originalPermissions: response.data}) );
      })
      .catch((err) => {
        console.error.bind(err);
      })

      window.location.reload;
};


export const editPermissionName = (permname, permid) => (dispatch, getState) => {
    
    let permissions = getState().permissions.permissions;
    
    let newPermissions = permissions.map((item)=>{
        if(item.id.toString() === permid){
            item.edited=true;
            item.name = permname;
        }
        return item;
    });

    dispatch( ({type: GET_PERMISSIONS, permissions: newPermissions, originalPermissions: newPermissions}) );
}

export const saveEditedPermissionName = (pid, pname) => (dispatch, getState) => {
    debugger
    let url = `${PATH.BASE_PATH}${PATH.API_PATH.permission.update}`;
    
    axios.put(`http://localhost:3000/permission/update{pid}`,  { name: pname } )
    //axios.put(`http://localhost:3000/permission/update`,  { id: pid, name: pname } )
      .then((response) => {
            dispatch( ({type: GET_PERMISSIONS, permissions: response.data, originalPermissions: response.data}) );
      })
      .catch((err) => {
            console.error.bind(err);
    })

}

export const hideEditPermissionBtn = (id) => (dispatch, getState) => {
    let permissions = getState().permissions.permissions;
    let newPermissions = permissions.map((item)=>{
        if(item.id === id){
            item.edited=undefined;
        }
        return item;
    }); 
    dispatch( ({type: GET_PERMISSIONS, permissions: newPermissions, originalPermissions: newPermissions}) );
}

export const deletePermission1 = (event, id, e) => (dispatch, getState) => {
    //let headers = { "Content-Type": "application/json;charset=UTF-8"};
    debugger
    let url = `${PATH.BASE_PATH}${PATH.API_PATH.permission.delete}`;
    /*
    axios.delete(`http://localhost:3000/permission/delete`, {data: { id: permid }}, headers )
    //axios.delete(url, {data: { id: permid }}, headers )
      .then((response) => {
            dispatch( ({type: GET_PERMISSIONS, permissions: response.data, originalPermissions: response.data}) );
      })
      .catch((err) => {
            console.error.bind(err);
    })
    */
}

export function deletePermission( id ){
    
    let url = `${PATH.BASE_PATH}${PATH.API_PATH.permission.delete}${id}`;
    
    axios.delete(url)
      .then((response) => {
          //debugger;
          //console.log(response);
         message.success('Permission deleted successfully');
          
            //dispatch( ({type: GET_PERMISSIONS, permissions: response.data, originalPermissions: response.data}) );
      })
      .catch((err) => {
            console.error.bind(err);
    })
    
}