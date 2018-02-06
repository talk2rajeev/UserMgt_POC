import axios from 'axios';

export const GET_USERLIST = "GET_USERLIST";
export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SELECT_USER = 'SELECT_USER';
export const SORT_USER = 'SORT_USER';
export const SEARCH_USER = 'SEARCH_USER';


const getTasks = (posts) => ({type: GET_ALL_TASKS, posts});

export const getUsers = () => dispatch => {
    console.log('@@@@@@@@@@@@@@@@@ inside getUsers');
    
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => {
          console.log('################', response.data);
        dispatch( ({type: GET_USERLIST, users: response.data ,originalUsers:response.data}) )
      })
      .catch((err) => {
        console.error.bind(err);
      })
};

export const authenticateUser = (user) => dispatch => {
    //let authentication = login(user)
    let authentication = {isLoggedIn: true, msg: 'login successfully'};
    dispatch( ({type: AUTHENTICATE_USER, authentication: authentication}) )
}

export const removeUser = (id) => (dispatch, getState) => {
    
    let users = getState().userlist.originalUsers;
    
    let newUsers = users.filter(function( obj ) {
        return obj.id !== id;
    });
    dispatch( ({type: REMOVE_USER, users: newUsers, originalUsers:newUsers}) )
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
    debugger;
    if(searchValue == ''){
     dispatch( ({type: SEARCH_USER, users: getState().userlist.originalUsers ,originalUsers:getState().userlist.originalUsers}) )
    }
    if(searchValue != ''){
        debugger;
        searchedUsers= users.filter(function(item){
           return item.name.toLowerCase().includes(searchValue.toLowerCase());
        });
     dispatch( ({type: SEARCH_USER, users: searchedUsers ,originalUsers:getState().userlist.originalUsers}) )
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

function sortAsc(users){
    return users.sort(function(a, b){
        var titleA = a.name.toLowerCase(), titleB = b.name.toLowerCase();
    if (titleA < titleB) return -1;
    if (titleA > titleB) return 1;
    return 0;
       // return a.name>b.name;
    });
}
function sortDesc(users){
    return users.sort(function(a, b){
        var titleA = a.name.toLowerCase(), titleB = b.name.toLowerCase();
        if (titleA > titleB) return -1;
        if (titleA < titleB) return 1;
        return 0;
    });
    
}
