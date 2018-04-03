import axios from 'axios';
import { sortDesc, sortAsc, getPageTotal, getpageChunk, searchInPermission, searchInUserGroup, searchInClient } from '../../utility/helper';
import {  message, notification } from 'antd';


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
export const GET_CLIENT_LIST = 'GET_CLIENT_LIST';

let PATH = require('../../utility/Constants');


/*
Clients
*/
const clientSuccessNotification = (type, secret) => {
    
    notification[type]({
      duration: 60,  
      message: 'Client created',
      description: `client secret: ${secret}`,
    });
 };


 export const getClients = () => (dispatch, getState) => {
    let pagination = getState().pagination;

    reLoadClients().then(result => {
        
        //debugger
        let pageTotal = getPageTotal(result.data);
        var res = JSON.stringify(result.data);
        dispatch( ({type: SET_PAGE_TOTAL, total: pageTotal}) );
        let pageChunk = getpageChunk(result.data, pagination); 
        dispatch( ({type: GET_CLIENT_LIST, client: pageChunk, originalClient: JSON.parse(res) }) );
        //console.log(pageChunk);
        //dispatch( ({type: GET_CLIENT_LIST, client: result.data}) );

    }).catch((err) => {
        console.error.bind(err);
    });
 }
 
 function reLoadClients(){  
    let url = `${PATH.BASE_PATH}${PATH.API_PATH.client.getall}`;
    return axios.get(url);
 };
 
 export const createClient = (client) => (dispatch, getState) => {
    let url = `${PATH.BASE_PATH}${PATH.API_PATH.client.create}`;
    axios.post(url, client).then(response=>{
    
        reLoadClients().then(result => {
            dispatch( ({type: GET_CLIENT_LIST, client: result.data}) );
            //message.success('Client Created successfully');  
            
            clientSuccessNotification('success', response.data.clientSecret);      
        }).catch((err) => {
            console.error.bind(err);
            message.error('Client Creation failed!');
        });
    }).catch((err) => {
        console.error.bind(err);
    });  
 }
 
 export const deleteClient = (id) => (dispatch, getState) => {
    let url = `${PATH.BASE_PATH}${PATH.API_PATH.client.delete}${id}`;
    axios.delete(url, id).then(response=>{
        reLoadClients().then(result => {
            dispatch( ({type: GET_CLIENT_LIST, client: result.data}) );    
            message.success('Client deleted successfully');                            
        }).catch((err) => {
            console.error.bind(err);
            message.error('Client delete operation failed!');            
        });
    }).catch((err) => {
        console.error.bind(err);
    });  
 }
 
 export const updateClient = (client) => (dispatch, getState) => {
    let url = `${PATH.BASE_PATH}${PATH.API_PATH.client.update}${client.id}`;
    axios.put(url, client).then(response=>{
        reLoadClients().then(result => {
            dispatch( ({type: GET_CLIENT_LIST, client: result.data}) );
            message.success('Client updated successfully');                                                  
        }).catch((err) => {
            console.error.bind(err);
            message.error('Client updation failed!');                        
        });
    }).catch((err) => {
        console.error.bind(err);
    });
 }

 export const searchClient = (pattern) => (dispatch, getState) => {
     
    let clients = getState().clients;    
    let searchedResult = searchInClient(pattern, clients.originalClient);
    dispatch( ({type: GET_CLIENT_LIST, client: searchedResult, originalClient: clients.originalClient }) )        
 }



/*
Users
*/
export const getUsers = () => (dispatch, getState) => {
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

export const createNewUser = (user) => (dispatch, getState) => {

    let url = `${PATH.BASE_PATH}${PATH.API_PATH.user.create}`;    
    axios.post(url, user).then((response) => {
        
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

// searchRolesinUsers(roles,searchValue)
// {
//     var flagS=false;
//     for(var i=0;i<roles.length;i++){
//            if(roles[i].name.toLowerCase().includes(searchValue.toLowerCase())){
//              flagS= true;
//              //break;
//              i=i+roles.length;
//       // return flagS;
             
//            }
//        }
//        return flagS;
// }

export const searchUsers = (searchValue) => (dispatch, getState) => {
    
    let users = getState().userlist.originalUsers;
    var searchedUsers;
    
    if(searchValue == ''){
     dispatch( ({type: SEARCH_USER, users: getState().userlist.originalUsers, originalUsers:getState().userlist.originalUsers}) )
    }
    if(searchValue != ''){
        searchedUsers= users.filter(function(item){
            
           return item.firstName.toLowerCase().includes(searchValue.toLowerCase()) || 
           item.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
           item.email.toLowerCase().includes(searchValue.toLowerCase()) ||
           item.roles.find(function(element) {
            return element.name.toLowerCase().includes(searchValue.toLowerCase());
          });
           //searchRolesinUsers(item.roles,searchValue);
           //item.roles[0].name.toLowerCase().includes(searchValue.toLowerCase());
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

    let url = `${PATH.BASE_PATH}${PATH.API_PATH.user.update}${user._id}`;
    
    axios.put(url, user )
      .then((response) => {
        reLoadUserList().then(result => {
            dispatch( ({type: GET_USERLIST, users: result.data, originalUsers: result.data}) );
            message.success('User Edited successfully');             
        });
      })
      .catch((err) => {
        console.error.bind(err);
    })
}








/*
User Group
*/
export const getUserGroups = () => (dispatch, getState) => {
    let url = `${PATH.BASE_PATH}${PATH.API_PATH.usergroup.getall}`;
    
    reloadUserGroup().then(result => {
        let pagination = getState().pagination;
        let pageTotal = getPageTotal(result.data);
        var res = JSON.stringify(result.data);
        dispatch( ({type: SET_PAGE_TOTAL, total: pageTotal}) );
        let pageChunk = getpageChunk(result.data, pagination); 
        dispatch( ({type: GET_USERGROUPLIST, userGroups: pageChunk, originalUserGroups: JSON.parse(res) }) )
    }).catch((err) => {
        console.error.bind(err);
    })
};


 function reloadUserGroup(){
    let url = `${PATH.BASE_PATH}${PATH.API_PATH.usergroup.getall}`;
    
    return axios.get(url)
    
 }


 export function editGroup(group){
    return function(dispatch){
        let url = `${PATH.BASE_PATH}${PATH.API_PATH.usergroup.update}${group._id}`;  
        axios.put(url, group)
        .then((response) => {
            reloadUserGroup().then(result => {
                let pagination = getState().pagination;
                let pageTotal = getPageTotal(result.data);
                var res = JSON.stringify(result.data);
                dispatch( ({type: SET_PAGE_TOTAL, total: pageTotal}) );
                let pageChunk = getpageChunk(result.data, pagination); 
                dispatch( ({type: GET_USERGROUPLIST, userGroups: pageChunk, originalUserGroups: JSON.parse(res) }) )
            }).catch((err) => {
                console.error.bind(err);
            })
        })
        .catch((err) => {
            console.error.bind(err);
        });  
    }   
 };

 export const removeUserGroup = (id) => (dispatch, getState) => {
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
      
    dispatch( ({type: OPEN_TRANSFER, groupname: userGroupRow.GroupName,usersOfUserGroup:usersInGroup}) )
 
 }

 
export function createNewGroup(group){
    
    return function(dispatch, getState){
        let url = `${PATH.BASE_PATH}${PATH.API_PATH.usergroup.create}`;   
        axios.post(url, group)
        .then((response) => {
            reloadUserGroup()
            .then((result) => {
                dispatch( ({type: CREATE_NEW_GROUP, userGroups: result.data, originalUserGroups: result.data}) );
                message.success('UserGroup created successfully');                                          
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

export const searchFromUserGroup = (pattern) => (dispatch, getState) => {
    let userGroups = getState().usergroupslist;    
    let searchedResult = searchInUserGroup(pattern, userGroups.originalUsergroups);
    dispatch( ({type: GET_USERGROUPLIST, userGroups: searchedResult, originalUserGroups: userGroups.originalUsergroups }) )        
}





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
export const getPermissions = () => (dispatch, getState) => {

    reLoadPermission().then(result => {
        
        let pagination = getState().pagination;
        let pageTotal = getPageTotal(result.data);
        var res = JSON.stringify(result.data);
        dispatch( ({type: SET_PAGE_TOTAL, total: pageTotal}) );
        let pageChunk = getpageChunk(result.data, pagination); 
        dispatch( ({type: GET_PERMISSIONS, permissions: pageChunk, originalPermissions: JSON.parse(res) }) );
    }).catch((err) => {
        console.error.bind(err);
    })
};

function reLoadPermission(){  
    let url = `${PATH.BASE_PATH}${PATH.API_PATH.permission.getall}`;    
    return axios.get(url);
};

export const createNewPermission = (permission) => (dispatch, getState) => {

    let url = `${PATH.BASE_PATH}${PATH.API_PATH.permission.create}`;
    
    axios.post(url, permission )
      .then((response) => {
            reLoadPermission().then((result)=>{
                let pagination = getState().pagination;
                let pageTotal = getPageTotal(result.data);
                var res = JSON.stringify(result.data);
                dispatch( ({type: SET_PAGE_TOTAL, total: pageTotal}) );
                let pageChunk = getpageChunk(result.data, pagination); 
                dispatch( ({type: GET_PERMISSIONS, permissions: pageChunk, originalPermissions: JSON.parse(res) }) );
                message.success('New Permission created successfully'); 
            })
      })
      .catch((err) => {
        console.error.bind(err);
      })

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
                let pagination = getState().pagination;
                let pageTotal = getPageTotal(result.data);
                var res = JSON.stringify(result.data);
                dispatch( ({type: SET_PAGE_TOTAL, total: pageTotal}) );
                let pageChunk = getpageChunk(result.data, pagination); 
                dispatch( ({type: GET_PERMISSIONS, permissions: pageChunk, originalPermissions: JSON.parse(res) }) );
            })
      })
      .catch((err) => {
            console.error.bind(err);
    })   
}

export const searchPermission = (pattern) => (dispatch, getState) => {
    let permission = getState().permissions;    
    //permissions: pageChunk, originalPermissions: JSON.parse(res)
    let searchedResult = searchInPermission(pattern, permission.originalPermissions);
    dispatch( ({type: GET_PERMISSIONS, permissions: searchedResult, originalPermissions: permission.originalPermissions }) );    
}


/*
Paginatiopn
*/
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