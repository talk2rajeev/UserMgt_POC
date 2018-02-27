import axios from 'axios';
import { sortDesc, sortAsc, getPageTotal, getpageChunk } from '../../utility/helper';
import {  message } from 'antd';


export const GET_USERLIST = "GET_USERLIST";
export const CREATE_USER = "CREATE_USER";
export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const GET_MODAL = 'GET_MODAL';
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
export const GET_USERGROUPLIST = "GET_USERGROUPLIST";
export const SELECTED_USER_GROUP = 'SELECTED_USER_GROUP';
export const REMOVE_USERGROUP = 'REMOVE_USERGROUP';
export const CREATE_NEW_GROUP = 'CREATE_NEW_GROUP';
export const SET_PAGE_NUMBER = 'SET_PAGE_NUMBER';
export const GET_PAGINATION = 'GET_PAGINATION';
export const SET_PAGE_TOTAL = 'SET_PAGE_TOTAL';

let PATH = require('../../utility/Constants');

/*
Users
*/
export const getUsers = () => (dispatch, getState) => {
    debugger
    let pagination = getState().pagination;
    reLoadUserList().then(result => {
        let pageTotal = getPageTotal(result.data);
        var res = JSON.stringify(result.data);
        dispatch( ({type: SET_PAGE_TOTAL, total: pageTotal}) );
        let pageChunk = getpageChunk(result.data, pagination); 
        dispatch( ({type: GET_USERLIST, users: pageChunk, originalUsers: JSON.parse(res) }) );           
    }).catch((err) => {
        console.error.bind(err);
    });
};


function reLoadUserList(){  
    let url = `${PATH.BASE_PATH}${PATH.API_PATH.user.getall}`;
    return axios.get(url);
};

export const createNewUser = (user) => dispatch => {

    let url = `${PATH.BASE_PATH}${PATH.API_PATH.user.create}`;    
    axios.post(url, user).then((response) => {
        reLoadUserList().then(result => {
            dispatch( ({type: GET_USERLIST, users: result.data, originalUsers: result.data}) )            
        }).catch((err) => {
            console.error.bind(err);
        });
    }).catch((err) => {
        console.error.bind(err);
    })
        
}


export const authenticateUser = (user) => dispatch => {
    //let authentication = login(user)
    let authentication = {isLoggedIn: true, msg: 'login successfully'};
    dispatch( ({type: AUTHENTICATE_USER, authentication: authentication}) )
}


export const removeUser = (id) => (dispatch, getState) => {
    
    let url = `${PATH.BASE_PATH}${PATH.API_PATH.user.delete}${id}`;
    
    axios.delete(url)
    .then((response) => {
        reLoadUserList().then(result => {
            dispatch( ({type: GET_USERLIST, users: result.data, originalUsers: result.data}) )            
        }).catch((err) => {
            console.error.bind(err);
        });
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

export const getModalFlag = (type) => (dispatch) => {
    dispatch( ({type: GET_MODAL, modaltype: type}) )
}


export const searchUsers = (searchValue) => (dispatch, getState) => {
    debugger
    let users = getState().userlist.originalUsers;
    var searchedUsers;
    
    if(searchValue == ''){
     dispatch( ({type: SEARCH_USER, users: getState().userlist.originalUsers, originalUsers:getState().userlist.originalUsers}) )
    }
    if(searchValue != ''){
        searchedUsers= users.filter(function(item){
           return item.firstName.toLowerCase().includes(searchValue.toLowerCase()) || 
           item.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
           item.email.toLowerCase().includes(searchValue.toLowerCase());
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
    debugger
    let user = getState().selectedUser.user;

    let url = `${PATH.BASE_PATH}${PATH.API_PATH.user.update}${user._id}`;
    
    axios.put(url, user )
      .then((response) => {
        reLoadUserList().then(result => {
            dispatch( ({type: GET_USERLIST, users: result.data, originalUsers: result.data}) )            
        });
      })
      .catch((err) => {
        console.error.bind(err);
    })
}








/*
User Group
*/
export const getUserGroups = () => dispatch => {
    let url = `${PATH.BASE_PATH}${PATH.API_PATH.usergroup.getall}`;
    
    reloadUserGroup()
      .then((response) => {
        dispatch( ({type: GET_USERGROUPLIST, userGroups: response.data, originalUserGroups: response.data}) )
      })
      .catch((err) => {
        console.error.bind(err);
    })
};


 function reloadUserGroup(){
    let url = `${PATH.BASE_PATH}${PATH.API_PATH.usergroup.getall}`;
    
    return axios.get(url)
    
 }

 export const removeUserGroup = (id) => (dispatch, getState) => {
    debugger;
    let url = `${PATH.BASE_PATH}${PATH.API_PATH.usergroup.delete}${id}`;

    axios.delete(url)
    .then((response) => {
        reloadUserGroup()
        .then((result) => {
            dispatch( ({type: REMOVE_USERGROUP, userGroups: result.data, originalUserGroups: result.data}) )
            })
            .catch((err) => {
            console.error.bind(err);
        })
    })
    .catch((err) => {
            console.error.bind(err);
    }); 

    
 }


 export const openTransferUserGroup = (userGroupRow) => (dispatch) => {
    const usersInGroup = userGroupRow.Users.map((item,i)=>{
        return item.id ;
      
      })
      debugger;
    dispatch( ({type: OPEN_TRANSFER, groupname: userGroupRow.GroupName,usersOfUserGroup:usersInGroup}) )
 
 }

 
export function createNewGroup(group){
    
    debugger;

    return function(dispatch){
        let url = `${PATH.BASE_PATH}${PATH.API_PATH.usergroup.create}`;   
        axios.post(url, group)
        .then((response) => {
            reloadUserGroup()
            .then((result) => {
                dispatch( ({type: CREATE_NEW_GROUP, userGroups: result.data, originalUserGroups: result.data}) )
              })
              .catch((err) => {
                console.error.bind(err);
            })
        })
        .catch((err) => {
            console.error.bind(err);
        });  
    }
    
};








/*
Roles
*/
export const getRoles = () => dispatch => {

    loadRoles().then((result)=>{
        dispatch( ({type: GET_ROLES, roles: result.data, originalRoles: result.data}) );
    })

};

function loadRoles(){
    let url = `${PATH.BASE_PATH}${PATH.API_PATH.role.getall}`;    
    return axios.get(url);
}

export function createNewRoles(role){
    
    return function(dispatch){
        let url = `${PATH.BASE_PATH}${PATH.API_PATH.role.create}`;
    
        axios.post(url, role)
          .then((response) => {
                loadRoles()
                .then((result)=>{
                    dispatch( ({type: GET_ROLES, roles: result.data, originalRoles: result.data}) )
                })
                //dispatch( ({type: GET_ROLES, roles: response.data ,originalRoles:response.data}) )
          })
          .catch((err) => {
            console.error.bind(err);
        });
    }
    
    

}

export const deletePermFromRoles = (id, pid) => (dispatch, getState)  => {
    
    let url = `${PATH.BASE_PATH}${PATH.API_PATH.role.delete}`;
    
    let promise = axios.delete(`http://localhost:3000/role/perm/delete`, {data: { id: id, pid: pid }} )
    promise.then((response) => {
            dispatch( ({ type: DELETE_ROLES_PERM }) );
            
      })
      .catch((err) => {
        console.error.bind(err);
    });
    
};

export const deleteRole = (id) => (dispatch, getState)  => {
    
    let url = `${PATH.BASE_PATH}${PATH.API_PATH.role.delete}${id}`;

    axios.delete(url)
      .then((response) => {
            loadRoles().then((result)=>{
                dispatch( ({type: GET_ROLES, roles: result.data, originalRoles: result.data}) );
            })
      })
      .catch((err) => {
            console.error.bind(err);
    });
    
};

export const updateRole = (role) => (dispatch)  => {
    debugger
    let url = `${PATH.BASE_PATH}${PATH.API_PATH.role.update}${role._id}`;
    axios.put(url, role)
      .then((response) => {
            loadRoles().then((result)=>{
                dispatch( ({type: GET_ROLES, roles: result.data, originalRoles: result.data}) );
            })
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

function reLoadPermission(){  
    let url = `${PATH.BASE_PATH}${PATH.API_PATH.permission.getall}`;    
    return axios.get(url);
};

export const createNewPermission = (name) => dispatch => {

    let url = `${PATH.BASE_PATH}${PATH.API_PATH.permission.create}`;
    
    axios.post(url, {name: name, clientId: "", clientName: ""})
      .then((response) => {
            reLoadPermission().then((result)=>{
                dispatch( ({type: GET_PERMISSIONS, permissions: result.data, originalPermissions: result.data}) );
            })
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

export const saveEditedPermissionName = (permission) => (dispatch, getState) => {

    let url = `${PATH.BASE_PATH}${PATH.API_PATH.permission.update}${permission.id}`;
    
    axios.put(url,  { name: permission.name,  clientId: "", clientName: ""} )
      .then((response) => {
        reLoadPermission();
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


export const deletePermission = (id) => (dispatch, getState) => {
    let url = `${PATH.BASE_PATH}${PATH.API_PATH.permission.delete}${id}`;
    axios.delete(url)
      .then((response) => {
            reLoadPermission().then((result)=>{
                dispatch( ({type: GET_PERMISSIONS, permissions: result.data, originalPermissions: result.data}) );
            })
      })
      .catch((err) => {
            console.error.bind(err);
    })   
}


export const setPageNumber = (page) => (dispatch, getState) =>{
    dispatch( ({type: SET_PAGE_NUMBER, page: page}) );
}

export const setPageTotal = (total) => (dispatch, getState) =>{
    dispatch( ({type: SET_PAGE_TOTAL, total: total}) );
}

export const getPagination = () => (dispatch, getState) =>{
    let pagination = getState().pagination;
    dispatch( ({type: GET_PAGINATION, pagination: pagination}) );
}