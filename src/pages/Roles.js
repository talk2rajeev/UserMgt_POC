import React, {Component}  from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { getRoles, createNewRoles, deletePermFromRoles, deleteRole, getPermissions, updateRole } from '../store/actions';

import { Popconfirm, message, Tooltip } from 'antd';
import AutoSuggestion from '../components/AutoSuggestion';
import LineSeparator from '../components/LineSeparator';
import EditRoleModal from '../components/EditRoleModal';
import SelectTags from '../components/SelectTags';
import RoleNameTag from '../components/RoleNameTag';


class Roles extends Component {

    constructor(props){
        super(props);
        this.setDataId = this.setDataId.bind(this);
        this.removeRole = this.removeRole.bind(this);
        this.cancel = this.cancel.bind(this);
        this.confirm = this.confirm.bind(this);
        
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.renderEditRoleModal = this.renderEditRoleModal.bind(this);
        this.childInputChangehandler = this.childInputChangehandler.bind(this);
        this.updateEditedRole = this.updateEditedRole.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePermissionChange = this.handlePermissionChange.bind(this);

        this.confirmDeleteRole = this.confirmDeleteRole.bind(this);
        this.cancelDeleteRole = this.cancelDeleteRole.bind(this);        
        //this.selectRole = this.selectRole.bind(this);
        this.roleNameHandler = this.roleNameHandler.bind(this);
        this.removeFromPermissionList = this.removeFromPermissionList.bind(this);
        this.createRoleHandler = this.createRoleHandler.bind(this);
        this.processPermissionData = this.processPermissionData.bind(this);
        this.openCreateRoleForm = this.openCreateRoleForm.bind(this);
        this.closeCreateRoleForm = this.closeCreateRoleForm.bind(this);

        this.state = {
            pidToDelete: {}, 
            newRole: {name:"", permission:[]}, 
            isEditRoleModalOpen: false, 
            selectedRole: {
                name:"", permission:[]
            },
            isCreateRoleFormOpen: false 
        };
        this.roleToDelete = null;
        this.selectedRole = null;
        this.role = null;
    }
    
    componentDidMount(){
        this.props.getRoles();
        this.props.getPermissions();
    }

    cancel(event){
        //event.target.innerText;
        message.error('Delete action cancelled ');
    }

    confirm(event){

        console.dir(event.target.innerText);
        console.dir(this.state);
        

        let pidToDelete = {...this.state};

        
        let role = JSON.parse(  pidToDelete.pidToDelete.role);

        let id = role.id;
        let pid = pidToDelete.pidToDelete.pid;
        
        console.log('pid, id: ', pid,  role.id);
        
        this.props.deletePermFromRoles(id, pid);
        //this.props.getRoles();
        message.success('You just deleted permission');
    }

    

    setDataId(e){
        e.preventDefault();
        this.setState( {pidToDelete: {pid: e.target.dataset.permid, role: e.target.dataset.role} } );
    }

    /*selectRole(value, option){

        var newRole = {...this.state.newRole}
        const pIds = newRole.pIds;
        pIds.includes(value) !== true ? pIds.push(value) : null;
    
        this.setState({newRole});

        let id = document.querySelector('.ant-select-search__field');
        setTimeout(()=>{
            id.value='';
        }, 200);
        //set AUtoComplete as blank
    }*/

    roleNameHandler(){
        let rolename = this.refs.rolename.value;
        console.log('- ',rolename)
        var newRole = {...this.state.newRole}
        newRole.name = rolename;
        this.setState({newRole});
    }

    removeFromPermissionList(event, item){
        
        event.preventDefault();
        let newRole = {...this.state.newRole};
        let newperms = newRole.pIds.filter( (val) => {
            return event.target.dataset.itemname === val ? false : true; 
        });
        newRole.pIds = newperms;
        
        this.setState({newRole});
    }

    createRoleHandler(event){
        event.preventDefault();
        
        this.props.createNewRoles(this.state.newRole);
        this.closeCreateRoleForm();
        setTimeout(()=>{
            this.openCreateRoleForm()
        },10)
        // this.setState({
        //     newRole: {'name': '', 'pIds': []}
        // })

        message.success('New Role added succesfully');
    }

    removeRole(id){
        
        console.log('deleterole: ',id);
        this.roleToDelete = id;
        //this.props.deleteRole(id);

    }
    confirmDeleteRole(event){
        
        this.props.deleteRole(this.roleToDelete);
        message.success('You just deleted Role');
    }
    cancelDeleteRole(event){
        message.error('Delete action cancelled ');
    }

    

    openModal(item){     
        
        this.setState({isEditRoleModalOpen: true, selectedRole: item});  
    }

    closeModal(){
        this.setState({isEditRoleModalOpen: false}); 
    }

    getDefaultPermissions(permission){
        
        return [];
    }

    renderEditRoleModal(){
        if(this.state.isEditRoleModalOpen)
            return  <EditRoleModal 
                        role={this.state.selectedRole}    
                        closeModal={this.closeModal}
                        permissions = {this.props.permissions}
                        defaultPermissions = {this.props.role}
                        childInputChangehandler={this.childInputChangehandler}
                        updateEditedRole = {this.updateEditedRole}
                        handleChange = {this.handleChange}
                    />
        else
            return null;    
    }

    childInputChangehandler(){
        
        let rolename  = document.getElementById('rolename').value;
        let { selectedRole }  = {...this.state};
        selectedRole.name = rolename;
        this.setState({selectedRole});

    }

    updateEditedRole(){        
        this.props.updateRole(this.state.selectedRole);
        this.setState({isEditRoleModalOpen: false}); 
    }
   
    handleChange(value, option){
        
        let { selectedRole } = {...this.state};
        let newPermission = [];
        for(let i = 0; i < value.length; i++){
            let temp = this.props.permissions.find((item)=>item.name === value[i]);
            newPermission.push({id: temp.id, name: temp.name});
        }
        selectedRole.permission = newPermission;
        this.setState({selectedRole});
    }

    handlePermissionChange(value, option){
        
        let { newRole } = {...this.state};
        let newPermission = [];
        for(let i = 0; i < value.length; i++){
            let temp = this.props.permissions.find((item)=>item.name === value[i]);
            newPermission.push({id: temp.id, name: temp.name});
        }
        newRole.permission = newPermission;
        this.setState({newRole});
    }

    processPermissionData( permissions ){  
        let perms = [];
        if(this.props.permissions !== undefined){
            perms = this.props.permissions.map((item)=>{
                return item;
            })
            return perms;
        }
        return [];
    }

    openCreateRoleForm(){
        this.setState({isCreateRoleFormOpen: true});
    }

    closeCreateRoleForm(){
        this.setState({isCreateRoleFormOpen: false});
    }

    renderCreateRoleButton(){
        return !this.state.isCreateRoleFormOpen ? 
            <div className="top-margin10">
                <Tooltip title="Create Role" placement="right">
                    <button className="btn btn-sm btn-primary " onClick={this.openCreateRoleForm}>
                        <i className="fa fa-tasks" /> &nbsp; <i className="fa fa-plus" />
                    </button>
                </Tooltip>
            </div>
            : null;
    }

    renderCreateRoleForm(){
        return this.state.isCreateRoleFormOpen ? 
            <div className="createRoleFormBox col-md-7 col-sm-9 col-xs-12 ">
                <h5>Create New Role</h5> 
                <i className="fa fa-close close-createClient-icn" onClick={this.closeCreateRoleForm}/>
                <div className="create-role-container row">
                    <div className="col-md-6 col-sm-6 col-xs-12 top-margin10">                        
                        <input type="text" placeholder="Type New Role" onChange={ this.roleNameHandler } ref="rolename" className="form-control"  />
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-12 top-margin10" style={{'position':'relative'}}>
                        <SelectTags 
                            placeholder="Select Permissions" 
                            data={this.processPermissionData(this.props.permissions)}
                            defaultData={[]} 
                            handleChange={this.handlePermissionChange} 
                        />                           
                    </div>
                    <div className="col-md-12 col-sm-12 col-xs-12 top-margin10">
                        <button onClick={this.createRoleHandler} className="btn btn-sm btn-primary pull-right">
                            Create Role
                        </button>
                        <span className="pull-right">&nbsp;&nbsp;</span>
                        <button onClick={this.closeCreateRoleForm} className="btn btn-sm btn-default pull-right">
                            Cancel
                        </button>
                    </div>
                </div>
                <div className="clearfix"></div>
            </div>
            : null
    }

    render() {
        return(  
                <div className="userRole-container">
                    <br />   

                    { this.renderCreateRoleButton() }  
                    { this.renderCreateRoleForm() }
                    
                    <div className="row top-margin20">
                        {
                        !this.state.isCreateRoleFormOpen ?
                        <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                            <h5>Existing Roles</h5>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <td>Role</td>
                                        <td>Permissions</td>                              
                                        <td>Action</td>                              
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.roles.length !== 0 ?
                                        this.props.roles.roles.map((item, i)=>{
                                            return(
                                                <tr key={i}>
                                                    <td>{item.name}</td>
                                                    <td>
                                                        {
                                                            item.permission.map((val, j)=>{
                                                                return(
                                                                    <RoleNameTag key={j} name={val.name} data_id={val.id} href="#" id={val.id} />     
                                                                )
                                                            })
                                                        }
                                                        
                                                    </td>
                                                    <td>
                                                        <i title="Edit Role" className="fa fa-pencil" onClick={ ()=>this.openModal(item) } />
                                                        &nbsp;&nbsp;&nbsp;
                                                        <Popconfirm title="Are you sure delete this Role?" onConfirm={ (event)=>{this.confirmDeleteRole(event)} } onCancel={ (event)=>{this.cancelDeleteRole(event)} } okText="Yes" cancelText="No">   
                                                            <i title="remove permission" className="fa fa-trash" onClick={ ()=>this.removeRole(item._id) }/>
                                                        </Popconfirm>     
                                                    </td>                                            
                                                </tr>            
                                            )
                                        }) : null
                                    }
                                    
                                </tbody>
                            </table>
                        </div> : null
                        }
                        
                        {  this.renderEditRoleModal() } 
                    </div>
                       
                           
                </div>
            )    
    }
    
}

function mapDispatchToProps(dispatch){
    return {
        getRoles: bindActionCreators(getRoles, dispatch),
        createNewRoles: bindActionCreators(createNewRoles, dispatch),
        deletePermFromRoles: bindActionCreators(deletePermFromRoles, dispatch),
        deleteRole: bindActionCreators(deleteRole, dispatch),
        getPermissions: bindActionCreators(getPermissions, dispatch),
        updateRole: bindActionCreators(updateRole, dispatch)
    }
}
  
function mapStateToProps(state){
    console.log('state >> ', state)
      return{
         roles: state.roles,
         permissions: state.permissions.permissions
      }
}

const _Roles = connect(mapStateToProps, mapDispatchToProps )(Roles);
export default _Roles;

//<AutoSuggestion placeholder="Select Permissions" data={this.processPermissionData( this.props.permissions)} selectRole={this.selectRole} olddata={this.props.permissions}/>
