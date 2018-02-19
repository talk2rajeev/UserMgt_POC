import axios from 'axios';
import { sortDesc, sortAsc } from '../../utility/helper';

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

/*
Users
*/
export const getUsers = () => dispatch => {
    
    axios.get(`http://localhost:3000/user/getall`)
      .then((response) => {
            dispatch( ({type: GET_USERLIST, users: response.data ,originalUsers:response.data}) )
      })
      .catch((err) => {
        console.error.bind(err);
      })

};


export const createUser = (user) => {
    axios.get(`http://localhost:3000/user/create`)
      .then((response) => {
            dispatch( ({type: CREATE_USER, users: response.data ,originalUsers: response.data}) )
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





/*
Roles
*/
export const getRoles = () => dispatch => {

    axios.get(`http://localhost:3000/role/getall`)
      .then((response) => {
            dispatch( ({type: GET_ROLES, roles: response.data ,originalRoles:response.data}) )
      })
      .catch((err) => {
        console.error.bind(err);
      })

};

export const createNewRoles = (role) => dispatch => {
    
    axios.post(`http://localhost:3000/role/create`, role)
      .then((response) => {
            dispatch( ({type: GET_ROLES, roles: response.data ,originalRoles:response.data}) )
      })
      .catch((err) => {
        console.error.bind(err);
      });

}

export const deletePermFromRoles = (id, pid) => (dispatch, getState)  => {
    
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

    axios.get(`http://localhost:3000/permission/getall`)
      .then((response) => {
            dispatch( ({type: GET_PERMISSIONS, permissions: response.data, originalPermissions: response.data}) );
      })
      .catch((err) => {
        console.error.bind(err);
      })
};

export const createNewPermission = (name) => dispatch => {
    axios.post(`http://localhost:3000/permission/create`, {name: name})
      .then((response) => {
            dispatch( ({type: GET_PERMISSIONS, permissions: response.data, originalPermissions: response.data}) );
      })
      .catch((err) => {
        console.error.bind(err);
      })
    //dispatch( ({type: CREATE_NEW_PERMISSION, permission: name}) )
};

export const editPermissionName = (permname, permid) => (dispatch, getState) => {
    
    let permissions = getState().permissions.permissions;
    
    let newPermissions = permissions.map((item)=>{
        if(item.id === parseInt(permid)){
            item.edited=true;
            item.name = permname;
        }
        return item;
    });

    dispatch( ({type: GET_PERMISSIONS, permissions: newPermissions, originalPermissions: newPermissions}) );
}

export const saveEditedPermissionName = (permid, permname) => (dispatch, getState) => {
    debugger
    axios.put(`http://localhost:3000/permission/update`,  { id: permid, name: permname } )
      .then((response) => {
            dispatch( ({type: GET_PERMISSIONS, permissions: response.data, originalPermissions: response.data}) );
      })
      .catch((err) => {
            console.error.bind(err);
    })

}

export const hideEditPermissionBtn = (id, name) => (dispatch, getState) => {
    let permissions = getState().permissions.permissions;
    let newPermissions = permissions.map((item)=>{
        if(item.id === parseInt(id)){
            item.edited=undefined;
        }
        return item;
    }); 
    dispatch( ({type: GET_PERMISSIONS, permissions: newPermissions, originalPermissions: newPermissions}) );
}

export const deletePermission = (permid) => (dispatch, getState) => {
    let headers = { "Content-Type": "application/json;charset=UTF-8"};
    let body = {id: permid};
    axios.delete(`http://localhost:3000/permission/delete`, {data: { id: permid }}, headers )
      .then((response) => {
            dispatch( ({type: GET_PERMISSIONS, permissions: response.data, originalPermissions: response.data}) );
      })
      .catch((err) => {
            console.error.bind(err);
    })
}