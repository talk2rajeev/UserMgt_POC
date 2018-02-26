import React, {Component}  from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Popconfirm, message, Tooltip, notification } from 'antd';
import { getRoleArray } from '../utility/helper';
import AutoSuggestion from '../components/AutoSuggestion';

import { 
    getUsers, 
    removeUser, 
    openModal, 
    closeModal, 
    selectUser, 
    sortUser, 
    searchUsers, 
    deleteRoleFromUser,
    createNewUser,
    getRoles 
} from '../store/actions';
import UserTableRow from '../components/UserTableRow.jsx';
import EditUserModal from '../components/EditUserModal';
import CreateUserForm from '../components/CreateUserForm';



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

        this.cancel = this.cancel.bind(this);
        this.confirm = this.confirm.bind(this);
        this.editUser = this.editUser.bind(this);
        this.sortUser = this.sortUser.bind(this);
        this.selectRole = this.selectRole.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.searchUsers = this.searchUsers.bind(this);
        this.confirmRoleDelete = this.confirmRoleDelete.bind(this);
        this.cancelRoleDelete = this.cancelRoleDelete.bind(this);
        this.deleteRole = this.deleteRole.bind(this); //REMOVE Role from user
        this.openCreateUserBox = this.openCreateUserBox.bind(this);
        this.closeCreateUserBox = this.closeCreateUserBox.bind(this);
        this.renderCreateUserBlock = this.renderCreateUserBlock.bind(this);
        this.renderCreateUserBtn = this.renderCreateUserBtn.bind(this);
        this.submitUserForm = this.submitUserForm.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);

        this.state = { isCreateUsrContainerOpen: false };
        this.roleToDelete = {uid: 0, rid: 0};
        this.userIdToDelete = 0;
        this.user = {roles: []};
    }

    componentDidMount(){
        this.props.getUsers();
        this.props.getRoles();
    }

    editUser(id, user){
        this.props.openModal("edituser");         
        this.props.selectUser({id: id, firstName: user.firstName, lastName: user.lastName, email: user.email, roles: user.roles});
    }

    sortUser(sortType){
        
        this.props.sortUser(sortType);
        this.forceUpdate();
        
    }
    searchUsers(){
        let searchValue=this.refs.pattern.value;
        this.props.searchUsers(searchValue);
    }

    confirm(e){
        e.preventDefault();
        debugger
        const userid = this.userIdToDelete; 
        this.props.removeUser(userid);
        message.success('User deleted successfully');
    }

    cancel(e){
        e.preventDefault();
        message.error('Delete Operation Cancelled');
    }

    confirmRoleDelete(e){
        var {uid, rid} = this.roleToDelete; 
        this.props.deleteRoleFromUser(uid, rid);
        message.success('Role deleted successfully');
    }
    cancelRoleDelete(e){
        message.error('Delete operation cancelled');
    }

    openNotificationWithIcon(type){
        notification[type]({
          message: 'Invalid user form',
          description: 'Please fill mandatory fields. Email & Role is mandatory.',
        });
    }

    deleteUser(event, id){
        debugger
        event.preventDefault();
        this.userIdToDelete = event.target.dataset.userid;
    }

    deleteRole(e){
        this.roleToDelete = {uid: e.target.dataset.userid, rid: e.target.dataset.roleid};
    }

    selectRole(value, option){
        debugger
        let role = value.split('-')
        role = role.map(function(item){
            return item.trim();
        });
        
        let roleOb =  {id: role[0].substring(1, role[0].length-1), name: role[1]};
        console.log(roleOb);  
        
        this.user.role.push(roleOb);

    }

    handleChange(value, option) {
        //select role callback from CreateUserForm component
        debugger
        let roles = this.props.roles.roles;

        this.user.roles = getRoleArray(roles, value);
        
    }

    openCreateUserBox(){
        this.setState({isCreateUsrContainerOpen: true});
    }
    closeCreateUserBox(){
        this.setState({isCreateUsrContainerOpen: false});
    }

    inputChangeHandler(event){
        let key = event.target.name;
        let value = event.target.value;

        if(key === 'fname')
                this.user.firstName = value;
        if(key === 'lname')
                this.user.lastName =  value;  
        if(key === 'email')
                this.user.email =  value;  
        
    }


    submitUserForm(){
        if(this.user.email === '' || this.user.email === undefined || this.user.roles.length === 0){
            //message.error('Please fill mandatory fields: Email, Role');
            this.openNotificationWithIcon('error');
        }
        else{
            debugger
            this.props.createNewUser(this.user);  
            message.success('User added successfully'); 
            this.setState({isCreateUsrContainerOpen: false});    
            this.user = {roles: []};     
        } 
        
    }

    renderCreateUserBlock(){
        if(this.state.isCreateUsrContainerOpen === true){
            return(
                <CreateUserForm 
                    inputChangeHandler={this.inputChangeHandler} 
                    submitUserForm={this.submitUserForm} 
                    selectRole={this.selectRole} 
                    closeCreateUserBox={this.closeCreateUserBox} 
                    roles={this.props.roles.roles}
                    handleChange={this.handleChange}
                />
            )
        }
        else
            return null;
    }

    renderCreateUserBtn(){
        if(this.state.isCreateUsrContainerOpen === false){
            return(
                    <div className="pull-left search-input-container">
                        <Tooltip title="Create New User" placement="right">
					        <button className="btn btn-sm btn-success create-user-btn" onClick={this.openCreateUserBox}>
                                <i className="fa fa-user-plus" />
                            </button> 
                        </Tooltip>
				    </div>
            )
        }
        else
            return null;
    }

    

    render() {
        if(!this.props.users)
            return <div>Loading......</div>
        else
            return(
                
                <div>
                    { this.renderCreateUserBlock() }
                    { this.renderCreateUserBtn() }
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
                                <th>Roles</th>
                                <th>
                                    Action    
                                </th>                                                        
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.users.map((item, i)=>{
                                return(
                                    <UserTableRow 
                                        user={item} 
                                        key={i} 
                                        index={i} 
                                        editUser={this.editUser} 
                                        deleteRole={this.deleteRole} 
                                        deleteUser={this.deleteUser} 
                                        confirmRoleDelete={this.confirmRoleDelete} 
                                        cancelRoleDelete={this.cancelRoleDelete} 
                                        confirm={this.confirm} 
                                        cancel={this.cancel} 
                                    /> 
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
        getRoles: bindActionCreators(getRoles, dispatch),
        getUsers: bindActionCreators(getUsers, dispatch),
        removeUser: bindActionCreators(removeUser,dispatch),
        openModal: bindActionCreators(openModal,dispatch),
        closeModal: bindActionCreators(closeModal,dispatch),
        selectUser: bindActionCreators(selectUser,dispatch),
        sortUser: bindActionCreators(sortUser,dispatch),
        searchUsers: bindActionCreators(searchUsers,dispatch),
        deleteRoleFromUser: bindActionCreators(deleteRoleFromUser, dispatch),
        createNewUser: bindActionCreators(createNewUser, dispatch) 
    }
  }
  
  function mapStateToProps(state){
      //console.log('>>>>>>>>>>>>', state)
      return{
          users: state.userlist.users,
          roles: state.roles
      }
  }

  const _UsersTable = connect(mapStateToProps, mapDispatchToProps )(UsersTable);

  export default _UsersTable;