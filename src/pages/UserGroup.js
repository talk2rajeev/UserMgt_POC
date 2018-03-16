import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserGroups, getUsers, editGroup,removeUserGroup, openTransferUserGroup, openModal, closeModal, selectUser, sortUser, searchGroupUsers } from '../store/actions';
import UserGroupRow from '../components/UserGroupRow.jsx';
import { Popconfirm, message ,notification, Tooltip} from 'antd';
//import EditUserModal from '../components/EditUserModal';
import TransferUserToGroup from '../components/TransferUserToGroup';
import { getRoles, createNewGroup } from '../store/actions';
import AutoSuggestionRoles from '../components/AutoSuggestionRoles';
import LineSeparator from '../components/LineSeparator';
import SelectTags from '../components/SelectTags';
import EditUserGroupModal from '../components/EditUserGroupModal';


var userGroupTableShow = true;
var editmode = false;
var userGroup = { targetKeys: [], GroupName: "" };


class UserGroup extends Component {
    constructor(props) {
        super(props);
        this.setDataId = this.setDataId.bind(this);
        this.selectRole = this.selectRole.bind(this);
        this.groupNameHandler = this.groupNameHandler.bind(this);
        this.removeFromRoleList = this.removeFromRoleList.bind(this);
        this.submitGroupHandler = this.submitGroupHandler.bind(this);
        this.renderTransferCOmp = this.renderTransferCOmp.bind(this);
        this.showCreateUGBox = this.showCreateUGBox.bind(this);
        this.closeCreateUGBox = this.closeCreateUGBox.bind(this);
        this.getMockData = this.getMockData.bind(this);
        this.processRolesData = this.processRolesData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderCreateUGForm = this.renderCreateUGForm.bind(this);
        this.renderUserGrpTable = this.renderUserGrpTable.bind(this);
        this.renderCreateUgBtn = this.renderCreateUgBtn.bind(this);
        this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
        this.transferHandleChange = this.transferHandleChange.bind(this);
        this.closeEditableUGModal = this.closeEditableUGModal.bind(this);
        this.handleEditableRoleChange = this.handleEditableRoleChange.bind(this);
        this.updateEditedUG = this.updateEditedUG.bind(this);
        this.childInputChangehandler = this.childInputChangehandler.bind(this);
        this.cancelUGDelete = this.cancelUGDelete.bind(this);
        this.confirmUGDelete = this.confirmUGDelete.bind(this);

        this.toggleOpen = false;
        this.UG = this.props.usergroups;
        this.user =[];
        this.UgToDelte = null;
        this.state = { id: 0, 
                       group: { 'name': '', 'role': [], 'user': [] }, 
                       isTransferCompOpen: false, 
                       userGroupName: "", 
                       userGroupRow: {},
                       isUgEditModalOpen: false,
                       user: [] 
                    }
    }
    componentDidMount() {

        this.props.getUserGroups();
        this.props.getUsers();
        this.removeUserGroup = this.removeUserGroup.bind(this);
        this.editUser = this.editUser.bind(this);
        this.props.getRoles();
    }

    getMockData() {

        var mockData = [];
        if (this.props.userlist != undefined) {
            this.props.userlist.map((item, i) => {


                mockData.push({
                    key: item._id.toString(),
                    title: item.firstName + " " + item.lastName
                });

            })
        }
        console.log("mockData.lengthhhhhhhhhhhhhhhhhhhggggggggggggg", mockData);
        return mockData;
    }
    
    openNotificationWithIcon(type){
        notification[type]({
          message: 'Please enter group name',
          description: 'UserGroup name  is mandatory.',
        });
    }
    submitGroupHandler() {
        if(this.refs.groupname.value==='')
        {
            this.openNotificationWithIcon('error');
            
        }else{
            
           // this.user ko set karo
        var group = { ...this.state.group }
        group.user = this.user;
        //this.setState({ group });
        this.props.createNewGroup(group);
        //this.props.getUserGroups();
        this.setState({group, isTransferCompOpen:false})
        } 
        
    }
    
    editUser(userGroup) {
            let group = {...this.state.group};
            
            group  = userGroup;
            this.setState({group, isUgEditModalOpen: true});
    }

    closeEditableUGModal(){
            this.setState({ isUgEditModalOpen: false });
    }

    childInputChangehandler(event){
            let value = event.target.value;
            console.log('user Group name', value);
            let group = {...this.state.group};
            group.name = value; 
            this.setState({group});       
    }

    handleEditableRoleChange(value, option){
            console.log('selected value ', value);


            event.preventDefault();
            
            var group = {...this.state.group};
            let roles=[];
            for (let i = 0; i < value.length; i++) {
                var  roleIdName=this.props.roles.roles.find((item)=>{
                        if (item.name===value[i])
                        roles.push({id: item._id, name: item.name});
                        })   
            }    
            group.role=roles;
            this.setState({group});
        
            
    }

    updateEditedUG(){
        
        this.props.editGroup(this.state.group);
        this.setState({ isUgEditModalOpen: false });
    }
    
    renderEditableUGModal(){
        return this.state.isUgEditModalOpen ? 
                            <EditUserGroupModal 
                                closeEditableUGModal = { this.closeEditableUGModal }
                                childInputChangehandler = { this.childInputChangehandler }
                                handleEditableRoleChange = { this.handleEditableRoleChange }
                                updateEditedUG = { this.updateEditedUG }
                                usergroup = {this.state.group}
                                roles = {this.props.roles.roles}
                                transferHandleChange={this.transferHandleChange} 
                                isTransferOpen={true} 
                                mockdataa={this.getMockData()} 
                                userGroupName={this.state.userGroupName} 
                                userGroupRow={this.state.group} 
                            
                            />
                            : null
    }

    confirmUGDelete(event){
        this.props.removeUserGroup(this.UgToDelte);
        message.success('User Group Deleted Succesfully');
    }

    cancelUGDelete(event){
        message.error('Delete Operation cancelled');
    }

    setDataId(e, id) {
        //set rowIdentifier
        e.preventDefault();
        this.setState({ id: id });
    }

    removeUserGroup(id, index) {
        this.UgToDelte = id;
        /*var c = confirm("Are you sure to delete the usergroup?");
        this.setState({ isTransferCompOpen: false });
        if (c) {
            this.props.removeUserGroup(id);
            this.setState({ isTransferCompOpen: true, userGroupRow: {}, userGroupName: "" });
            this.closeTransfer();
        }
        */
    }

    selectRole(value, option) {
        console.log('selected from parent: ', value, option);
        event.preventDefault();
        var group = { ...this.state.group };
        var roleOfUG = group.role;
        var roleIds = group.role.map((item) => {
            if (item.name != '')
                return item.name;
        })
        roleIds.includes(value) !== true ? roleOfUG.push({ id: "11111", name: value }) : null;
        this.setState({ group });
    }

    removeFromRoleList(event, item) {
        event.preventDefault();
        console.log(event, item, event.target.dataset.itemname);
        var group = { ...this.state.group };
        let newroles = group.role;
        newroles = newroles.filter((val) => {
            return event.target.dataset.itemname === val.name ? false : true;
        });
        group.role = newroles;
        console.log('new perms: ', newroles);
        this.setState({ group });
    }
    groupNameHandler() {
        let groupname = this.refs.groupname.value;
        console.log('- ', groupname)
        var group = { ...this.state.group }
        group.name = groupname;
        this.setState({ group });
    }

    renderTransferCOmp() {
        
        return (
            <TransferUserToGroup 
                transferHandleChange={this.transferHandleChange} 
                isTransferOpen={true} 
                mockdataa={this.getMockData()} 
                userGroupName={this.state.userGroupName} 
                targetKeys={this.state.group.user} 
                userGroupRow={[]}
                type="create"
            />
        )
    }

    transferHandleChange(nextTargetKeys, direction, moveKeys) {
        
        console.log('targetKeys: ', nextTargetKeys);
        let users = [];
        for (let i = 0; i < nextTargetKeys.length; i++) {
            let a=this.props.userlist.find((item) => {
                if(item._id==nextTargetKeys[i])
                return item;
            });
            users.push({
                id: nextTargetKeys[i],
                firstName: a.firstName,
                lastName: a.lastName
            });
        }
        this.user = users;
        let group = {...this.state.group};
        group.user = this.user;
        this.setState({group});
      }


    handleChange(value, option) {
        //select role callback from CreateUserForm component
        
        //let roles = this.props.roles.roles;

        //
            console.log('selected from parent: ', value, option);
            
            event.preventDefault();
            
            var group = {...this.state.group};
           // var roleOfUG=group.role;
     
     let roles=[];
        for (let i = 0; i < value.length; i++) {
               var  roleIdName=this.props.roles.roles.find((item)=>{
                    if (item.name===value[i])
                    roles.push({id: item._id, name: item.name});
                    //  return item;
                    })    
          //  const roleIds = {...group.roles.name};
           // roleIdName.includes(value) !== true ? roleOfUG.push({id:"11111",name:value}) : null;
        }    
        group.role=roles;
            this.setState({group});
        //
        //this.user.roles = getRoleArray(roles, value);

    }

    showCreateUGBox() {
        
        var group = { ...this.state.group }
        group.user = [];
       // this.setState({ group });
        this.setState({ isTransferCompOpen: true, group});

    }

    closeCreateUGBox() {

        this.setState({ isTransferCompOpen: false });
    }

    processRolesData(roles) {
       
        let perms = [];
        if (this.props.roles.roles !== undefined) {
            perms = this.props.roles.roles.map((item) => {
                return item.name;
            })
            return perms;
        }
        return [];
    }

    renderCreateUGForm() {
        return this.state.isTransferCompOpen ?
            <div id="collapsible-container-create-usergroup" className="collapsible-container create-usergroup">
                <h5 className="heading" style={{'padding':'8px 0 0 35px'}}>Create New User Group</h5>
                <i className="fa fa-close close-bx-icn" onClick={this.closeCreateUGBox} />
                <div className="create-role-container row" style={{'padding':'10px 0'}}>
                    <div className="col-md-7 row" style={{'marginLeft':'20px'}}>
                        <div className="col-md-12" style={{ 'height': '40px' }}>
                            <input type="text" style={{'width': '97%'}} placeholder="New User Group" onChange={this.groupNameHandler} ref="groupname" className="form-control" />
                        </div>
                        <div className="col-md-12 ant-select-container" style={{ 'position': 'relative', 'height': '40px' }}>
                            <SelectTags placeholder="Please select Roles" data={this.props.roles.roles ? this.props.roles.roles : []} defaultData={[]} handleChange={this.handleChange} />
                        </div>
                        <div className="clearfix" />
                        <div className="col-md-12">
                            <h5>Assign Users to User Group</h5>
                            {this.renderTransferCOmp()}
                        </div>
                        <div className="createRoleBox-row" style={{ 'padding': '5px 10px' }}>
                            <button id="createEdit-Group" onClick={this.submitGroupHandler} className="btn btn-sm btn-primary">
                                Create Group <i className="fa fa-plus" />
                            </button>
                        </div>
                        <div className="clearfix" />
                    </div>
                </div>
            </div>
            : null
    }

    renderUserGrpTable() {
        return !this.state.isTransferCompOpen ?
        <div className="row">
            <div className="col-md-7 col-sm-12 col-xs-12">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                <span>GroupName</span>
                            </th>
                            <th>Role</th>
                            <th>Permissions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.usergroups.length !== 0 ?
                                this.props.usergroups.map((item, i) => {
                                    return (
                                        <UserGroupRow key={i}
                                            editUser={(ug) => this.editUser(ug)} 
                                            usergroups={item} key={i} index={i} 
                                            removeUserGroup={this.removeUserGroup}
                                            confirmUGDelete = { this.confirmUGDelete }
                                            cancelUGDelete  = { this.cancelUGDelete }
                                        />
                                    )
                                }) : null
                        }
                    </tbody>
                </table>
            </div>
        </div>    
            : null
    }

    renderCreateUgBtn(){
        return !this.state.isTransferCompOpen ? 
            <Tooltip title="Create New UserGroup" placement="right">
                <button onClick={this.showCreateUGBox} className="create-ug-btn btn btn-sm btn-primary top-margin15"> 
                    <i className="fa fa-users" /> <i className="fa fa-plus" /> 
                </button>
            </Tooltip> 
            : null
         
    }

    render() {
        return (
            <div className="userGroup-container">
                
                { this.renderCreateUgBtn() }
                {this.renderCreateUGForm()}

                <LineSeparator />

                <div className="clearfix" />

                {
                    this.renderUserGrpTable()
                }

                <div className="col-md-5">

                </div>
                {
                    this.renderEditableUGModal()
                }
            </div>
        )
    }

}

function mapDispatchToProps(dispatch) {

    return {
        getUserGroups: bindActionCreators(getUserGroups, dispatch),
        getUsers: bindActionCreators(getUsers, dispatch),
        removeUserGroup: bindActionCreators(removeUserGroup, dispatch),
        openModal: bindActionCreators(openModal, dispatch),
        openTransferUserGroup: bindActionCreators(openTransferUserGroup, dispatch),
        getRoles: bindActionCreators(getRoles, dispatch),
        createNewGroup: bindActionCreators(createNewGroup, dispatch),
        editGroup:bindActionCreators(editGroup, dispatch)


    }
}

function mapStateToProps(state) {
    console.log('mapStateToProps in UserGroup>>>>>>>>>>>>', state.usergroupslist);

    return {
        usergroups: state.usergroupslist.usergroups,
        roles: state.roles,
        userlist: state.userlist.users

    }
}

const _UsersGroup = connect(mapStateToProps, mapDispatchToProps)(UserGroup);
export default _UsersGroup;

//<AutoSuggestionRoles data={this.processRolesData(this.props.roles.roles)}  selectRole={this.selectRole}/>
/* <div className="createRoleBox-row">
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
                                    </div> */
