import React, {Component}  from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { getUserGroups ,getUsers,removeUserGroup, openTransferUserGroup,openModal,closeModal, selectUser, sortUser ,searchGroupUsers} from '../store/actions';
import UserGroupRow from '../components/UserGroupRow.jsx';
import { Popconfirm, message } from 'antd';
import EditUserModal from '../components/EditUserModal';
import TransferUserToGroup from '../components/TransferUserToGroup';
import { getRoles, createNewGroup } from '../store/actions';
import AutoSuggestionRoles from '../components/AutoSuggestionRoles';
import LineSeparator from '../components/LineSeparator';
var userGroupTableShow=true;
var editmode=false;
var userGroup={targetKeys:[],GroupName:""};
class UserGroup extends Component {
    constructor(props){
        super(props);
        this.setDataId = this.setDataId.bind(this);
        this.selectRole = this.selectRole.bind(this);
        this.groupNameHandler = this.groupNameHandler.bind(this);
        this.removeFromRoleList = this.removeFromRoleList.bind(this);
        this.submitGroupHandler = this.submitGroupHandler.bind(this);
        this.renderTransferCOmp = this.renderTransferCOmp.bind(this);
        this.showCreateUGBox = this.showCreateUGBox.bind(this);
        this.closeTransfer = this.closeTransfer.bind(this);
        this.getMockData = this.getMockData.bind(this);
        this.processRolesData=this.processRolesData.bind(this);
        this.toggleOpen = false;
        this.UG=this.props.usergroups;
        this.state = {id: 0, group: {'name': '', 'role': [],'user':[]} , isTransferCompOpen: false,userGroupName:"",userGroupRow:{}}
    }
    componentDidMount(){
        debugger;
        this.props.getUserGroups();
        this.props.getUsers();
        this.removeUserGroup = this.removeUserGroup.bind(this);
        this.editUser = this.editUser.bind(this);
        this.props.getRoles();
    }

    getMockData(){
        debugger;
        var mockData=[];
        if (this.props.userlist != undefined) {
            this.props.userlist.map((item, i) => {
              debugger;
              
                mockData.push({
                  key: item._id.toString(),
                  title: item.firstName+" " +item.lastName
                });
              
            })
          }
          console.log("mockData.lengthhhhhhhhhhhhhhhhhhhggggggggggggg",mockData);
        return mockData;
    }

    submitGroupHandler(){
        debugger;
        this.props.createNewGroup(this.state.group);
       this.props.getUserGroups();
        debugger;
       // this.forceUpdate();
        //
        // console.log('targetKey: ', this.state.targetKeys);
        // debugger;
        // var userRow = this.state.row;
        // var row = { ...this.state.row }
        // let users = this.state.targetKeys;
        // row.Users = users;
        // this.setState({ row });
        //
    }
    editUser(userGroup){
        debugger
        editmode=true;
      this.setState({isTransferCompOpen:true, userGroupRow:userGroup, userGroupName:userGroup.name});
      let grpButtonId = document.getElementById('createEdit-Group');
      grpButtonId.innerHTML="Edit Group";
      this.refs.groupname.placeholder=userGroup.name;
      this.refs.groupname.value=userGroup.name;
      
      this.state.group.name=userGroup.name;
      debugger;
      //
      this.state.group.user=userGroup.user;
      
      this.state.group.role=userGroup.role;
      var group = {...this.state.group}
     // const roleIds = group.roles;
      //roleIds.includes(value) !== true ? roleIds.push(value) : null;
      this.setState({group});
      //
      this.toggleOpen = true;
    //   let id = document.getElementById('collapsible-container-create-usergroup');
    //   id.style.height = this.toggleOpen ? '220px' : '0px';
      let id = document.getElementById('collapsible-container-create-usergroup');
      id.style.height = this.toggleOpen ? '250px' : '0px';
      id.style.padding = this.toggleOpen ? '20px' : '0px';
      id.style.border = this.toggleOpen ? '1px solid #cdcdcd' : 'none';
    }
    
    setDataId(e, id){
        //set rowIdentifier
        e.preventDefault();
        debugger;
        this.setState({id: id});
    }
    removeUserGroup(id,index){
        debugger;
        var c= confirm("Are you sure to delete the usergroup?");
        this.setState({isTransferCompOpen:false});
        if(c){
            this.props.removeUserGroup(id);
            this.setState({isTransferCompOpen:true, userGroupRow:{}, userGroupName:""});
            this.closeTransfer();
        }
    }

    selectRole(value, option){
        console.log('selected from parent: ', value, option);
        debugger;
        event.preventDefault();
        
        var group = {...this.state.group};
        var roleOfUG=group.role;
debugger;
           var  roleIds=group.role.map((item)=>{
                if (item.name!='') 
                  return item.name;
                })    
      //  const roleIds = {...group.roles.name};
        roleIds.includes(value) !== true ? roleOfUG.push({id:"11111",name:value}) : null;
        this.setState({group});
    }

    removeFromRoleList(event, item){
        debugger;
        event.preventDefault();
        console.log(event, item, event.target.dataset.itemname);    
        var group = {...this.state.group};
        let newroles=group.role;
         newroles = newroles.filter( (val) => {
            return event.target.dataset.itemname === val ? false : true; 
        });
        group.role = newroles;
        console.log('new perms: ', newroles);
        this.setState({group});
    }
    groupNameHandler(){
        let groupname = this.refs.groupname.value;
        console.log('- ',groupname)
        var group = {...this.state.group}
        group.name = groupname;
        this.setState({group});
    }

    renderTransferCOmp(){
        debugger;
       // if (this.state.isTransferCompOpen===true)
        return(
            <TransferUserToGroup isTransferOpen={true} mockdataa={this.getMockData()} userGroupName={this.state.userGroupName} userGroupRow={this.state.userGroupRow}/>
        )
        // else
        //  return null
    }

    showCreateUGBox(){
        debugger;
       // this.state.userGroupRow
        this.setState({isTransferCompOpen:true, userGroupRow:{}, userGroupName:""});
        let grpButtonId = document.getElementById('createEdit-Group');
        grpButtonId.innerHTML="Create New Group";
       // this.toggleOpen = !this.toggleOpen;
       this.toggleOpen = true;
       
        let id = document.getElementById('collapsible-container-create-usergroup');
        id.style.height = this.toggleOpen ? '250px' : '0px';
        id.style.padding = this.toggleOpen ? '20px' : '0px';
        id.style.border = this.toggleOpen ? '1px solid #cdcdcd' : 'none';
        //added to reset
       // this.setState({isTransferCompOpen:true, userGroupRow:userGroup, userGroupName:userGroup.GroupName});
        this.refs.groupname.placeholder="New Group Name";
        this.refs.groupname.value="";
        
        this.state.group.name="";
        this.state.group.role=[];
        var group = {...this.state.group}
       // const roleIds = group.roles;
        //roleIds.includes(value) !== true ? roleIds.push(value) : null;
        this.setState({group});
        //
        // this.toggleOpen = true;
        // let id = document.getElementById('collapsible-container-create-usergroup');
        // id.style.height = this.toggleOpen ? '220px' : '0px';
        //
        
    }

  

    closeTransfer(){
        debugger;
        this.toggleOpen = false;
        let id = document.getElementById('collapsible-container-create-usergroup');
        id.style.height = this.toggleOpen ? '255px' : '0px';
        id.style.padding = '0px';
        id.style.border = 'none';
    }   

    processRolesData( roles ){
        let perms = [];
        if(this.props.roles.roles !== undefined){
            perms = this.props.roles.roles.map((item)=>{
                return item.name;
            })
            return perms;
        }
        return [];
    }
    render() {
        return(  
                <div className="userGroup-container">
                    <br />    
                    <button onClick={this.showCreateUGBox} className="create-ug-btn btn btn-sm btn-primary"> <i className="fa fa-users" /> <i className="fa fa-plus" /> </button>
                    <div id="collapsible-container-create-usergroup" className="collapsible-container create-usergroup">
                    <i className="fa fa-close close-bx-icn" onClick={this.closeTransfer}/>
                        <div className="create-role-container row">
                            <div className="col-md-7 row">
                                <div className="col-md-6" style={{'height': '40px'}}>                        
                                    <input type="text" placeholder="New User Group" onChange={ this.groupNameHandler } ref="groupname" className="form-control"  />
                                </div>
                                <div className="col-md-6" style={{'position':'relative', 'height': '40px'}}>
                                    <AutoSuggestionRoles data={this.processRolesData(this.props.roles.roles)}  selectRole={this.selectRole}/>
                                </div>
                                <div className="clearfix" />
                                
                                <div className={" createRoleBox top-margin25 "} style={{'width': '100%'}}>
                                    <div className="createRoleBox-row">
                                        <div className="col-md-2 label"> Roless: </div>
                                        <div className="col-md-10">
                                            {
                                                this.state.group.role.map( (item, i)=> {
                                                    return(
                                                        <span key={'role-'+i} className='delete-perm-badge'>
                                                            {item.name}&nbsp;
                                                            <i className="fa fa-close delete-perm" data-itemname={item.name}  onClick={ (event, item)=>{this.removeFromRoleList(event, item)} } />
                                                        </span> 
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="createRoleBox-row" style={{'padding':'5px 10px'}}>
                                            <button id="createEdit-Group" onClick={this.submitGroupHandler} className="btn btn-sm btn-primary">
                                                Create Group <i className="fa fa-plus" />
                                            </button>
                                    </div>
                                    <div className={" "+ (this.state.group.name!== '' && this.state.group.role.length!== 0 ? '' : 'disabled')} />
                                </div>
                                <div className="clearfix" />


                            </div>
                            <div className="col-md-5">
                                {this.renderTransferCOmp()}
                            </div>
                        </div>

                        
                    </div>

                    <LineSeparator />

                    <div className="clearfix" />

                    <div className="col-md-7">            
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>
                                        <span>GroupName</span>
                                        &nbsp;&nbsp;
                                        <span>
                                            <i className="tablecell-sort-icon fa fa-arrow-up" onClick={(e)=>this.sortUser('desc')}/>
                                            <i className="tablecell-sort-icon fa fa-arrow-down" onClick={(e)=>this.sortUser('asc')}/>
                                        </span>
                                    </th>
                                    <th>Role</th>  
                                    <th>Permissions</th>                                                      
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.usergroups.length!==0?
                                this.props.usergroups.map((item, i)=>{
                                    return(
                                        <UserGroupRow editUser={(ug)=>this.editUser(ug)}  usergroups={item} key={i} index={i}  removeUserGroup={this.removeUserGroup}/> 
                                    )
                                }):null
                            }
                            </tbody>
                        </table>
                    </div>

                    <div className="col-md-5">
                        
                    </div>    
                </div>
            )    
    }
    
}

function mapDispatchToProps(dispatch){
    debugger;
    return {
        getUserGroups: bindActionCreators(getUserGroups, dispatch),
        getUsers: bindActionCreators(getUsers, dispatch),
        removeUserGroup:bindActionCreators(removeUserGroup, dispatch),
        openModal:bindActionCreators(openModal, dispatch),
        openTransferUserGroup:bindActionCreators(openTransferUserGroup, dispatch),
        getRoles: bindActionCreators(getRoles, dispatch),
        createNewGroup: bindActionCreators(createNewGroup, dispatch)
        
       
    }
  }
  
  function mapStateToProps(state){
      console.log('mapStateToProps in UserGroup>>>>>>>>>>>>', state.usergroupslist);
    //  debugger;
      return{
          usergroups: state.usergroupslist.usergroups,
          roles: state.roles,
          userlist:state.userlist.users

      }
  }

  const _UsersGroup = connect(mapStateToProps, mapDispatchToProps )(UserGroup);
export default _UsersGroup;
