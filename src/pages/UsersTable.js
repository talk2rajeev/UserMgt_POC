import React, {Component}  from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Popconfirm, message } from 'antd';

import { getUsers, removeUser, openModal, closeModal, selectUser, sortUser, searchUsers, createUser } from '../store/actions';
import UserTableRow from '../components/UserTableRow.jsx';
import EditUserModal from '../components/EditUserModal';




function confirm(e) {
    debugger
  console.dir(e.target.textContent);
  message.success('You just deleted '+ e.target.textContent);
}

function cancel(e) {
  console.dir(e.target.textContent);
  message.error('You clicked no '+ e.target.textContent);
}


class UsersTable extends Component {

    constructor(props){
        super(props);

        this.editUser = this.editUser.bind(this);
        this.sortUser = this.sortUser.bind(this);
        this.searchUsers = this.searchUsers.bind(this);
        this.confirm = this.confirm.bind(this);
        this.cancel = this.cancel.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        this.state = {userIdToDelete: 0}
    }

    componentDidMount(){
        this.props.getUsers();
    }

    editUser(id, user){
        this.props.openModal("edituser");
        this.props.selectUser(user);
       // alert(id);
        
    }

    sortUser(e, sortType){
        
        this.props.sortUser(e);
        this.forceUpdate();
        
    }
    searchUsers(){
        let searchValue=this.refs.pattern.value;
        this.props.searchUsers(searchValue);
        //if(document.getElementById(sKey).innerHTML.toLowerCase().includes(document.getElementById("searchTheKey").value.toLowerCase())){

    }

    confirm(e){
        e.preventDefault();
        //console.log(e.target.textContent, id);
        const userid = this.state.userIdToDelete;
        this.props.removeUser(userid);
        message.success('User deleted successfully');
    }

    cancel(e){
        e.preventDefault();
        console.dir(e.target.textContent);
    }

    deleteUser(event, id){
        event.preventDefault();
        this.setState({userIdToDelete: event.target.dataset.userid});
    }

    render() {
        if(!this.props.users)
            return <div>Loading......</div>
        else
            return(
                
                <div>
                    <div className="pull-left search-input-container">
					    <button className="btn btn-sm btn-success create-user-btn"><i className="fa fa-user-plus" /></button> 
				    </div>
                    <div className="pull-right search-input-container">
					    <input id="searchTheKey" placeholder="Search by Name" className="form-control" ref="pattern" onKeyUp={this.searchUsers.bind(this)}  type="text" ></input> 
				    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>
                                    <span>Name</span>
                                    &nbsp;&nbsp;
                                    <span>
                                        <i className="tablecell-sort-icon fa fa-arrow-up" onClick={(e)=>this.sortUser('desc')}/>
                                        <i className="tablecell-sort-icon fa fa-arrow-down" onClick={(e)=>this.sortUser('asc')}/>
                                    </span>
                                </th>
                                <th>Email</th>  
                                <th>Phone</th>
                                <th>
                                    Action    
                                </th>                                                        
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.users.map((item, i)=>{
                                return(
                                    <UserTableRow user={item} key={i} index={i} editUser={this.editUser} deleteUser={this.deleteUser} confirm={this.confirm} cancel={this.cancel} /> 

                                )
                            })
                        }
                        </tbody>
                    </table>
                    <EditUserModal />        
                </div>
            )    
    }
    
}

function mapDispatchToProps(dispatch){
    return {
        getUsers: bindActionCreators(getUsers, dispatch),
        removeUser:bindActionCreators(removeUser,dispatch),
        openModal:bindActionCreators(openModal,dispatch),
        closeModal:bindActionCreators(closeModal,dispatch),
        selectUser:bindActionCreators(selectUser,dispatch),
        sortUser:bindActionCreators(sortUser,dispatch),
        searchUsers:bindActionCreators(searchUsers,dispatch)
        
       
    }
  }
  
  function mapStateToProps(state){
      console.log('>>>>>>>>>>>>', state)
      return{
          users: state.userlist.users
      }
  }

  const _UsersTable = connect(mapStateToProps, mapDispatchToProps )(UsersTable);

  export default _UsersTable;