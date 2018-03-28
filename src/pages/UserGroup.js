import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserGroups, getPagination, setPageNumber, searchFromUserGroup, getUsers, editGroup, removeUserGroup, getRoles, createNewGroup, openTransferUserGroup, openModal, closeModal, selectUser, sortUser, searchGroupUsers } from '../store/actions';
import UserGroupTable from '../components/UserGroupTable.jsx';
import { Popconfirm, message ,notification, Tooltip, Pagination} from 'antd';
import TransferUserToGroup from '../components/TransferUserToGroup';
import LineSeparator from '../components/LineSeparator';
import SelectTags from '../components/SelectTags';
import EditUserGroupModal from '../components/EditUserGroupModal';
import AutoSuggestion from '../components/AutoSuggestion';


class UserGroup extends Component {
    constructor(props) {
        super(props);

        this.openCreateUserGroupForm = this.openCreateUserGroupForm.bind(this);
        this.closeCreateUserGroupForm = this.closeCreateUserGroupForm.bind(this);        
        this.renderCreateUserGroupBtn = this.renderCreateUserGroupBtn.bind(this);
        this.renderCreateUserGroupForm = this.renderCreateUserGroupForm.bind(this);
        this.renderEditableUserGroupModal = this.renderEditableUserGroupModal.bind(this);        
        this.confirmUserGroupDelete = this.confirmUserGroupDelete.bind(this);
        this.cancelUserGroupDelete  = this.cancelUserGroupDelete.bind(this);
        this.setUserGroupIdToDelete = this.setUserGroupIdToDelete.bind(this);
        this.childInputEditHandler  = this.childInputEditHandler.bind(this);
        this.openEditUserGroupModal = this.openEditUserGroupModal.bind(this);
        this.closeEditUserGroupModal= this.closeEditUserGroupModal.bind(this);
        this.updateEditedUserGroup  = this.updateEditedUserGroup.bind(this);
        this.groupNameHandler = this.groupNameHandler.bind(this);
        this.selectUserFromAutoComplete = this.selectUserFromAutoComplete.bind(this);
        this.selectUserFromEditAutoComplete = this.selectUserFromEditAutoComplete.bind(this);
        this.getStringArrayOfUsers = this.getStringArrayOfUsers.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitGroupForm = this.submitGroupForm.bind(this);
        this.getPaginatedLocalUsers = this.getPaginatedLocalUsers.bind(this);
        this.onPagination = this.onPagination.bind(this);
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
        this.removeUserFromUserGroupForm = this.removeUserFromUserGroupForm.bind(this);
        this.removeUserFromEditUserGroupForm = this.removeUserFromEditUserGroupForm.bind(this);
        this.searchInputHandler = this.searchInputHandler.bind(this);
        
        this.clearCreateUserGroupForm = this.clearCreateUserGroupForm.bind(this);

        this.state= { isUserGroupFormOpen: false, 
                      isEditUserGroupModalOpen: false, 
                      selectedUserGroup: {}, 
                      newUserGroup: {name: '', user: [], role: []},
                      paging: {current: 1, totalPage: 1},
                      usersChunk: [],
                      roles: []
                    };
        this.groupId = null;
        this.newUserGroup = {name: '', user: [], role: []};
        //{ 
            //"name":"UG2", 
            //"user":[{"id":"5aacb553d4c6ce2fde66fdfa", "firstName":"Rajeev", "lastName":"Sharma"}], 
            //"role":[{"id":"5aacb402d4c6ce2fde66fdf7","name":"Role-1"}]
        //}
    }
    
    componentDidMount() {
        this.props.getUsers();
        this.props.getRoles();   
        this.props.getUserGroups();
    }


    
    openNotificationWithIcon(type){
        notification[type]({
          message: 'Please enter group name',
          description: 'UserGroup name  is mandatory.',
        });
    }
    

    childInputChangehandler(event){
        
            let value = event.target.value;
            console.log('user Group name', value);
            let group = {...this.state.group};
            group.name = value; 
            this.setState({group});       
    }

    handleEditableRoleChange(value, option){
            
            //handleChange(value, option);
            event.preventDefault();
            
            var {selectedUserGroup} = {...this};
            let roles=[];
            for (let i = 0; i < value.length; i++) {
                var  roleIdName=this.roles.find((item)=>{
                    if (item.name===value[i])
                        roles.push({id: item._id, name: item.name});
                })   
            }    
            selectedUserGroup.role=roles;
            this.selectedUserGroup=selectedUserGroup;
             
    }

    childInputEditHandler(event){
        
        let value = event.target.value;
        let name  = event.target.name;
        var {selectedUserGroup} = {...this.state};
        selectedUserGroup.name = value;
        this.setState({selectedUserGroup});        
    }

    openEditUserGroupModal(item){
        let usersChunk = item.user;
        this.setState({ selectedUserGroup: item, usersChunk, isEditUserGroupModalOpen: true});
    }
    
    closeEditUserGroupModal(){
        this.setState({isEditUserGroupModalOpen: false, usersChunk:[]});
    }

    

    updateEditedUserGroup(){
        
        this.props.editGroup(this.state.selectedUserGroup);
        this.setState({isEditUserGroupModalOpen: false, usersChunk:[]});
    }

    confirmUserGroupDelete(event){
        this.props.removeUserGroup(this.groupId);
    }

    cancelUserGroupDelete(event){
        message.error('Delete Operation cancelled');
    }

    setUserGroupIdToDelete(id){
        this.groupId = id;    
    }

    openCreateUserGroupForm(){
        this.setState({ isUserGroupFormOpen: true });
    }

    closeCreateUserGroupForm(){
        this.setState({ isUserGroupFormOpen: false, usersChunk: [], newUserGroup: {name: '', user: [], role: []} });
    }

    onPagination(page){
        this.setState({
          current: page,
        });
        this.props.setPageNumber(page);
        this.props.getUserGroups();    
    }

    renderCreateUserGroupForm() {
        return this.state.isUserGroupFormOpen ?
            <div id="collapsible-container-create-usergroup" className="collapsible-container create-usergroup">
                <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 pad20 border-light">
                    <h5 className="heading">Create New User Group</h5>
                    <i className="fa fa-close close-bx-icn" onClick={this.closeCreateUserGroupForm} />
                    <div className="create-role-container row" style={{'padding':'10px 0'}}>
                        <div className="row" style={{'marginLeft':'0px'}}>
                            <div className="col-md-12 col-sm-12 col-xs-12" style={{ 'height': '40px' }}>
                                <input type="text" style={{'width': '97%'}} placeholder="UserGroup Name" onChange={this.groupNameHandler} ref="groupname" className="form-control" />
                            </div>
                            <div className="col-md-12  col-sm-12 col-xs-12 ant-select-container" style={{ 'position': 'relative', 'height': '40px' }}>
                                <SelectTags 
                                    placeholder="Roles" 
                                    data={this.props.roles.roles ? this.props.roles.roles : []} 
                                    defaultData={this.newUserGroup.role} 
                                    handleChange={this.handleChange} 
                                />
                            </div>
                            <div className="col-md-12  col-sm-12 col-xs-12 assign_usr_blk" style={{'width': '97%'}}>
                                <h5>Assign Users to User Group</h5>
                                <AutoSuggestion 
                                    placeholder="Select User" 
                                    data={ this.getStringArrayOfUsers(this.props.userlist) }
                                    selectRole={this.selectUserFromAutoComplete} 
                                />
                                <div className="top-margin10">
                                {
                                    this.state.usersChunk.length ? 
                                    <table className="table table-condensed">
                                        <thead style={{'background':'rgb(142, 204, 245)'}}>
                                            <tr>
                                                <th>FirstName</th>
                                                <th>LastName</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                 
                                                this.state.usersChunk.map((item, i)=>{
                                                    return(
                                                        <tr key={i}>
                                                            <td>{item.firstName}</td>
                                                            <td>{item.lastName}</td>
                                                            <td>
                                                                <i className="fa fa-close" style={{'color':'red'}} 
                                                                   onClick={()=>this.removeUserFromUserGroupForm(item)}/>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                                
                                            }
                                            
                                        </tbody>
                                    </table>
                                    : null 
                                }                                   
                                </div>
                            </div>
                            <div className="clearfix" />
                            
                            <div className="createRoleBox-row top-margin10" style={{ 'padding': '5px 10px' }}>
                                <button id="createEdit-Group" style={{'marginRight': '20px'}} onClick={this.submitGroupForm} className="btn btn-primary btn-sm pull-right">
                                    Create Group
                                </button>
                                <button id="createEdit-Group" style={{'marginRight': '10px'}} onClick={this.closeCreateUserGroupForm} className="btn btn-default btn-sm pull-right">
                                    Cancel
                                </button>
                            </div>
                            <div className="clearfix" />
                        </div>
                    </div>
                </div>
            </div>
            : null
    }

    

    prev(){
        let paging = {...this.state.paging};
        paging.current >= 1 ? --paging.current : paging.current;
        this.setState({paging});
    }

    next(){
        let paging = {...this.state.paging};
        paging.totalPage < paging.current ? ++paging.current : paging.current;
        this.setState({paging});
    }

    removeUserFromEditUserGroupForm(user){
        console.log(user);
        
        let newUser = [];
        let selectedUserGroup = {...this.state.selectedUserGroup};
        newUser = selectedUserGroup.user.filter(item=>{
            return item.id !== user.id;
        });
        selectedUserGroup.user = newUser;
        let usr = JSON.stringify(selectedUserGroup.user);
        let usersChunk = this.getPaginatedLocalUsers(JSON.parse(usr));
        this.setState({selectedUserGroup, usersChunk});
        
    }

    removeUserFromUserGroupForm(user){
        console.log(user);
        
        let newUser = [];
        let newUserGroup = {...this.state.newUserGroup};
        newUser = newUserGroup.user.filter(item=>{
            return item.id !== user.id;
        });
        newUserGroup.user = newUser;
        let usr = JSON.stringify(newUserGroup.user);
        let usersChunk = this.getPaginatedLocalUsers(JSON.parse(usr));
        this.setState({newUserGroup, usersChunk});
        
    }

    

    handleChange(value, option){
        let newUserGroup = {...this.state.newUserGroup};
        newUserGroup.role = []; //init with empty 
        value.forEach(item=>{
            this.props.roles.roles.filter(role=>{
                if(item === role.name){
                    let foundrole = newUserGroup.role.find(role=>role.name===item); //chk if role already thr in array
                    if(!foundrole) //if role nt found in array then push it
                        newUserGroup.role.push({id: role._id, name: role.name});
                }               
            });
        });
        this.setState({newUserGroup});        
    }

    getPaginatedLocalUsers(users){
        
        let recordStartIndex = ((this.state.paging.current-1) * 10);
        let recordEndIndex = ((this.state.paging.current-1) * 10) + 10;
        let usersChunk = users.splice(recordStartIndex, recordEndIndex);
        
        // for(var i = recordStartIndex; i<=recordEndIndex && i<=users.length; i++){
        //     usersChunk.push(users[i-1]);
        // } 

        //console.log('paginated Local User ' ,usersChunk);
        //this.setState({usersChunk});
        return usersChunk;
    }

    selectUserFromEditAutoComplete(value, option){  
            
        let usr = this.props.userlist.find(item=> item.email === value);    
        
        let {selectedUserGroup, paging} = {...this.state};
        //newUserGroup.user = [];

        let foundUser = selectedUserGroup.user.find(item=> item.id===usr._id); //chk if role already thr in array
        if(!foundUser)
            selectedUserGroup.user.push({id: usr._id, firstName: usr.firstName, lastName: usr.lastName});
        let user = JSON.stringify(selectedUserGroup.user);
        let usersChunk = this.getPaginatedLocalUsers(JSON.parse(user));
            
        this.setState({selectedUserGroup, usersChunk});

        let userinput = document.querySelector('.assign_usr_blk .ant-select-search__field');
        setTimeout(()=>{
            userinput.select();
        }, 100);

    }

    selectUserFromAutoComplete(value, option){  
            
        let usr = this.props.userlist.find(item=> item.email === value);    
        
        let {newUserGroup, paging} = {...this.state};
        //newUserGroup.user = [];

        let foundUser = newUserGroup.user.find(item=> item.id===usr._id); //chk if role already thr in array
        if(!foundUser)
            newUserGroup.user.push({id: usr._id, firstName: usr.firstName, lastName: usr.lastName});
        let user = JSON.stringify(newUserGroup.user);
        let usersChunk = this.getPaginatedLocalUsers(JSON.parse(user));
            
        this.setState({newUserGroup, usersChunk});

        let userinput = document.querySelector('.assign_usr_blk .ant-select-search__field');
        setTimeout(()=>{
            userinput.select();
        }, 100);

    }

    groupNameHandler(event){
        let groupName = event.target.value;
        let newUserGroup = {...this.state.newUserGroup};
        newUserGroup.name = groupName;
        this.setState({newUserGroup});                
    }

    getStringArrayOfUsers(data){
        let users = [];
        data.forEach(item=>{
            users.push(item.email);
        })
        return users;
    }

    submitGroupForm(){
        if(this.state.newUserGroup.name===''){
            this.openNotificationWithIcon('error');
        }
        else{
            this.props.createNewGroup(this.state.newUserGroup);
            this.closeCreateUserGroupForm();
            this.clearCreateUserGroupForm();
            
        }
        
        

    }

    clearCreateUserGroupForm(){
        
        setTimeout(()=>{
            this.openCreateUserGroupForm();
        }, 10); 
    }

    openNotificationWithIcon(type){
        notification[type]({
          message: 'Invalid UserGroup Form',
          description: 'Please fill mandatory fields.',
        });
    }
    //createNewGroup

    renderCreateUserGroupBtn(){
        return !this.state.isUserGroupFormOpen ? 
            <Tooltip title="Create New UserGroup" placement="right">
                <button onClick={this.openCreateUserGroupForm} className="pull-left create-ug-btn btn btn-sm btn-primary"> 
                    <i className="fa fa-users" /> <i className="fa fa-plus" /> 
                </button>
            </Tooltip> 
            : null
         
    }

    renderEditableUserGroupModal(){
        return this.state.isEditUserGroupModalOpen ? 
                <EditUserGroupModal 
                    closeEditUserGroupModal = { this.closeEditUserGroupModal }
                    childInputEditHandler = { this.childInputEditHandler }
                    handleEditableRoleChange = { this.handleEditableRoleChange }
                    updateEditedUserGroup = { this.updateEditedUserGroup }
                    selectedUserGroup = {this.state.selectedUserGroup}
                    roles = {this.props.roles.roles ? this.props.roles.roles : []}   
                    userData={ this.getStringArrayOfUsers(this.props.userlist) }
                    users = {this.state.usersChunk} 
                    removeUserFromUserGroupForm = {this.removeUserFromEditUserGroupForm}    
                    selectRole={this.selectUserFromEditAutoComplete}  
                />
                : null
    }

    searchInputHandler(event){
        this.props.searchFromUserGroup(event.target.value);
    }



    render() {
        return (
            <div className="userGroup-container">
                
                { this.renderCreateUserGroupForm() }

                <div className="clearfix" />
                    
                    <div>
                        <div style={{'paddingLeft': '0'}} className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                            { this.renderCreateUserGroupBtn() }
                            {
                                !this.state.isUserGroupFormOpen ?
                                <input type="text" onKeyUp = {this.searchInputHandler} className="form-control1 pull-right"/>
                                :null
                            }
                        </div>
                        {
                        !this.state.isUserGroupFormOpen ?
                        <div>
                            <UserGroupTable
                                usergroups={this.props.usergroups} 
                                openEditUserGroupModal = {this.openEditUserGroupModal}
                                confirmUserGroupDelete = {this.confirmUserGroupDelete}
                                cancelUserGroupDelete = {this.cancelUserGroupDelete}
                                setUserGroupIdToDelete = {this.setUserGroupIdToDelete}
                            />
                            <div className="pagination col-lg-7 col-md-7 col-sm-12 col-xs-12" >
                                <div className="pull-right">            
                                    <Pagination defaultCurrent={1} total={this.props.pagination.pagination.totalPage} onChange={this.onPagination}  />
                                </div>            
                            </div> 
                        </div>
                        :null
                        }
                    </div>
                
                { this.renderEditableUserGroupModal() }

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
        editGroup:bindActionCreators(editGroup, dispatch),
        getPagination: bindActionCreators(getPagination, dispatch),
        setPageNumber: bindActionCreators(setPageNumber, dispatch),
        searchFromUserGroup: bindActionCreators(searchFromUserGroup, dispatch)
    }
}

function mapStateToProps(state) {
    return {
        roles: state.roles,
        userlist: state.userlist.originalUsers,
        usergroups: state.usergroupslist.usergroups,
        pagination: state.pagination
        
    }
}

const _UsersGroup = connect(mapStateToProps, mapDispatchToProps)(UserGroup);
export default _UsersGroup;
