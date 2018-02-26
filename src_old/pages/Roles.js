import React, {Component}  from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { getRoles, createNewRoles, deletePermFromRoles, deleteRole, getPermissions } from '../store/actions';

import { Popconfirm, message, Tooltip } from 'antd';
import AutoSuggestion from '../components/AutoSuggestion';
import LineSeparator from '../components/LineSeparator';
import EditRoleModal from '../components/EditRoleModal';


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

        this.confirmDeleteRole = this.confirmDeleteRole.bind(this);
        this.cancelDeleteRole = this.cancelDeleteRole.bind(this);        
        this.selectRole = this.selectRole.bind(this);
        this.roleNameHandler = this.roleNameHandler.bind(this);
        this.removeFromPermissionList = this.removeFromPermissionList.bind(this);
        this.createRoleHandler = this.createRoleHandler.bind(this);
        this.processPermissionData = this.processPermissionData.bind(this);

        this.state = {pidToDelete: {}, newRole: {'name': '', 'pIds': []}, isEditRoleModalOpen: false }
        this.roleToDelete = null;
        this.selectedRole = null;
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

    selectRole(value, option){

        var newRole = {...this.state.newRole}
        const pIds = newRole.pIds;
        pIds.includes(value) !== true ? pIds.push(value) : null;
    
        this.setState({newRole});

        let id = document.querySelector('.ant-select-search__field');
        setTimeout(()=>{
            id.value='';
        }, 200);
        //set AUtoComplete as blank
    }

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

    createRoleHandler(){
        debugger
        let role = this.state.newRole;

        this.props.createNewRoles(role);
        message.success('New Role added succesfully');
    }

    removeRole(id){
        debugger
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

    processPermissionData( permissions ){
        
        
        let perms = [];
        if(this.props.permissions !== undefined){
            perms = this.props.permissions.map((item)=>{
                return item.name;
            })
            return perms;
        }
        return [];
    }

    openModal(item){     
        this.selectedRole = item;
        this.setState({isEditRoleModalOpen: true});  
    }

    closeModal(){
        this.setState({isEditRoleModalOpen: false}); 
    }

    renderEditRoleModal(){
        if(this.state.isEditRoleModalOpen)
            return  <EditRoleModal 
                        permissions={ [{id: "5a92888dd4c6d88041ea96dc", name: "ODM Room Access"}, {id: "5a92888dd4c6d88041ea96dd", name: "Server Room Access"}] }  
                        closeModal={this.closeModal} 
                        role = { {_id: "5a92888dd4c6d88041ea96dc", name: "Admin", permission: [{id: "5a92888dd4c6d88041ea96dc", name: "ODM Room Access"} ]} } 
                    />
        else
            return null;    
    }

   


    render() {
        return(  
                <div className="userRole-container">
                    <br />   
                    <h3>Create New Role</h3> 
                    <div className="create-role-container row">
                        <div className="col-md-3">                        
                            <input type="text" placeholder="Type New Role" onChange={ this.roleNameHandler } ref="rolename" className="form-control"  />
                        </div>
                        <div className="col-md-4" style={{'position':'relative'}}>
                            {
                                this.props.roles.length === 33 ? <AutoSuggestion selectRole={this.selectRole}/> : null
                            }
                            <AutoSuggestion placeholder="Select Permissions" data={this.processPermissionData( this.props.permissions)} selectRole={this.selectRole} olddata={this.props.permissions}/>
                        </div>
                    </div>

                    <div className={"createRoleBox top-margin25 "}>
                        
                        <div className="createRoleBox-row">                        
                            <div className="col-md-2 label"> RoleName: </div>
                            <div className="col-md-10"> <span className="rolename">{this.state.newRole.name}</span>  </div>
                            <div className="clearfix" />
                        </div>
                        <div className="createRoleBox-row">
                            <div className="col-md-2 label"> Permissions: </div>
                            <div className="col-md-10">
                                {
                                    this.state.newRole.pIds.map( (item, i)=> {
                                        return(
                                            <span key={'role-'+i} className='delete-perm-badge'>
                                                {item}&nbsp;
                                                <i className="fa fa-close delete-perm" data-itemname={item}  onClick={ (event, item)=>{this.removeFromPermissionList(event, item)} } />
                                            </span> 
                                        )
                                    })
                                }
                            </div>
                            <div className="clearfix" />
                        </div>
                        <div className="createRoleBox-row" style={{'padding':'5px 10px'}}>
                                <button onClick={this.createRoleHandler} className="btn btn-xs btn-primary">
                                    Create Role <i className="fa fa-plus" />
                                </button>
                        </div>
                        <div className={" "+ (this.state.newRole.name!== '' && this.state.newRole.pIds.length!== 0 ? '' : 'disabled')} />
                    </div>

                    <LineSeparator />

                    <h3>Existing Roles</h3>
                    <table className="table table-striped" style={{'width':'57.5%'}}>
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
                                                            
                                                            <Popconfirm key={'pid'+j} title="Are you sure delete this Permission?" onConfirm={ (event)=>{this.confirm(event)} } onCancel={ (event)=>{this.cancel(event)} } okText="Yes" cancelText="No">
                                                                <span data-id={val.id} href="#" id={val.id} className="delete-perm-badge">
                                                                    {val.name} &nbsp;
                                                                    <Tooltip title="Delete Permission" placement="right">
                                                                        <i title="remove permission" data-role={JSON.stringify(item)} data-permid={val.id} className="fa fa-close delete-perm" onClick={ (event)=>{this.setDataId(event)} }/>
                                                                    </Tooltip>
                                                                </span>
                                                            </Popconfirm>   
                                                                 
                                                        )
                                                    })
                                                }
                                                
                                            </td>
                                            <td>
                                                <i title="Edit Role" className="fa fa-pencil" onClick={ this.openModal(item) }/>
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
                    { this.renderEditRoleModal() }            
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
        getPermissions: bindActionCreators(getPermissions, dispatch)
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