import React, {Component}  from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { getUsers, getUserGroup, selectedUserGroup } from '../store/actions';

import { Popconfirm, message, Tooltip } from 'antd';
import TransferUserToGroup from '../components/TransferUserToGroup';

class UserGroup extends Component {
    
    constructor(){
        super();

        this.targetUsers = this.targetUsers.bind(this);
        this.dataSource  = this.dataSource.bind(this);
        this.setUserGroupId = this.setUserGroupId.bind(this);
        this.selectUserGroup = this.selectUserGroup.bind(this);  
        this.cancelDeleteUserGroup = this.cancelDeleteUserGroup.bind(this);              
        this.confirmDeleteUserGroup = this.confirmDeleteUserGroup.bind(this);
        this.renderTransferComponent = this.renderTransferComponent.bind(this);
        this.toggleCreateUGContainer = this.toggleCreateUGContainer.bind(this);
        this.renderCreateUserGrpBtn = this.renderCreateUserGrpBtn.bind(this);

        this.toggle = false;
        this.selectUserGroupObj = {};
    }

    setUserGroupId(id){

    }

    confirmDeleteUserGroup(){

    }

    cancelDeleteUserGroup(){

    }
   
    selectUserGroup(event, id){
        
        event.preventDefault();
        let usergroup = this.props.userGroup.userGroup.filter((item)=>{
            return item.id === id;
        });
        console.log('>>>> ',id, usergroup[0]);
        //this.props.selectedUserGroup(usergroup[0]);
        this.selectUserGroupObj = usergroup[0];
    }

    componentDidMount(){
        this.props.getUsers();
        this.props.getUserGroup();
        this.props.userGroup.length > 0 ? this.props.selectedUserGroup(this.props.userGroup.userGroup[0]) : null;
    }

    dataSource(){
        let users = this.props.users.map((item)=>{
            return {key: item.id.toString(), title: item.name} 
        });
        return users;
    }

    targetUsers(){
        
        let targetKeys = [];
        if(Object.keys(this.selectUserGroupObj).length>0){
            targetKeys = this.selectUserGroupObj.userIds.map((item, i)=>{
                return item.id.toString();
            }); 
        }
        
        return targetKeys;
    }

    renderTransferComponent(){
        
        return(
            <TransferUserToGroup dataSource={ this.dataSource() } targetKeys={ this.targetUsers() }  />
        )
    }

    renderCreateUserGrpBtn(event){
        //debugger
        event.preventDefault();
        return !this.toggle ? 
            <Tooltip title="Create New UserGroup" placement="right">
                <button onClick={this.toggleCreateUGContainer} className="btn btn-sm btn-primary"><i className="fa fa-users" />&nbsp;<i className="fa fa-plus" /></button>
            </Tooltip> 
         : null
    }

    toggleCreateUGContainer(){
        this.toggle = !this.toggle;
        let id = document.getElementById('collapsible-container-create-user');
        id.style.height  = this.toggle ? '100px' : '0px';
    }
    

    render() {
          
        return(  
                <div className="userGroup-container">
                    <div className="col-md-12 create-user-container row">
                        { this.renderCreateUserGrpBtn(event) }
                           
                        <div id="collapsible-container-create-user" className="collapsible-container create-user  row">
                            <div className="col-md-3">
                                <input className="form-control" placeholder="Group Name"/>
                            </div>        
                            
                            <div  className="col-md-3">
                                <input className="form-control" placeholder="select"/>
                            </div>
                            <div className="col-md-6">
                                { this.renderTransferComponent() }
                            </div>
                        </div>
                    </div>

                    <div className="clearfix" />

                    <div className="col-md-7">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <td>User Group</td>
                                    <td>Roles</td>
                                    <td>Action</td>                                
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.userGroup.length !== 0 ? 
                                    this.props.userGroup.userGroup.map((item, i)=>{
                                        return(
                                            <tr key={i}>
                                                <td><a onClick={()=>this.selectUserGroup(event, item.id)}>{item.name}</a></td>
                                                <td>
                                                    {
                                                        item.role.map((val, j)=>{
                                                            return(
                                                                <span className="delete-perm-badge" key={j}>{val.name}</span>
                                                            )
                                                        })
                                                    }
                                                </td>
                                                <td>
                                                    <Popconfirm title="Are you sure delete this UserGroup?" onConfirm={ (event)=>{this.confirmDeleteUserGroup(event)} } onCancel={ (event)=>{this.cancelDeleteUserGroup(event)} } okText="Yes" cancelText="No">   
                                                        <i title="remove permission" className="fa fa-trash" onClick={ ()=>this.setUserGroupId(1234) } />
                                                    </Popconfirm>
                                                </td>
                                            </tr>            
                                        )
                                    }) : null      
                                }
                                
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-5 bdr-left">
                        <div>
                            <input className="form-control" placeholder="Group Name"/>
                        </div>        
                        {   
                            Object.keys(this.props.selectedUG).length > 0 ? this.renderTransferComponent() : null
                        }
                        <div>
                            <input className="form-control" placeholder="select"/>
                        </div>
                        
                    </div>
                    
                </div>
            )    
    }
    
}

function mapDispatchToProps(dispatch){
    return {
        getUsers: bindActionCreators(getUsers, dispatch),
        getUserGroup: bindActionCreators(getUserGroup, dispatch),
        selectedUserGroup: bindActionCreators(selectedUserGroup, dispatch)
    }
}
  
function mapStateToProps(state){
    
    console.log('state >> ', state)
      return{
        users: state.userlist.users,  
        userGroup: state.userGroup,
        selectedUG: state.selectedUserGroup
      }
}

const _UserGroup = connect(mapStateToProps, mapDispatchToProps )(UserGroup);
export default _UserGroup;