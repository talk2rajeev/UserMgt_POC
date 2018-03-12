import React, {Component}  from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { 
    getPermissions, 
    createNewPermission, 
    editPermissionName, 
    deletePermission, 
    hideEditPermissionBtn, 
    saveEditedPermissionName,
    getPagination,
    setPageNumber,
    getClients  
} from '../store/actions';

import { Popconfirm, message, Tooltip, notification, Pagination } from 'antd';
import LineSeparator from '../components/LineSeparator';
import { dirname } from 'path';
import Loader from '../components/Loader';
import AutoSuggestion from '../components/AutoSuggestion';


class Permission extends Component {
    
    constructor(props){
        super(props);

        this.permissionNameChangeHandler = this.permissionNameChangeHandler.bind(this);
        this.savePermName = this.savePermName.bind(this);
        this.createNewPermission = this.createNewPermission.bind(this);
        this.removePermission = this.removePermission.bind(this);
        this.cancel = this.cancel.bind(this);
        this.confirm = this.confirm.bind(this);
        this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
        this.onPagination = this.onPagination.bind(this);
        this.processClientData = this.processClientData.bind(this);
        this.selectRole = this.selectRole.bind(this);

        this.state = { permissionToDlete: {id: null, name: ''}, pagination: {current: 1} };
        this.permission = {};
    }

    componentDidMount(){
        this.props.getPermissions();
        this.props.getClients();
    }

    permissionNameChangeHandler(event){
        event.preventDefault();
        let permName = event.target.value;
        let permid = event.target.dataset.permid;
        
        this.props.editPermissionName(permName, permid);
    }

    savePermName(id, name){
        debugger
        this.props.hideEditPermissionBtn(id);
        this.props.saveEditedPermissionName({id, name});
        message.success('Permission name updated successfully');
    }

    createNewPermission(){
        let permission_name = this.refs.permission_name.value;
        if(permission_name.length !== 0){
            this.permission.name = permission_name;
            this.props.createNewPermission(this.permission);       
        }else{
            this.openNotificationWithIcon('error');
        }
    }

    openNotificationWithIcon(type){
        notification[type]({
          message: 'Invalid Form',
          description: 'Please enter Permission Name',
        });
    }
    
    removePermission(event){
        console.log(event.target.dataset.permid, event.target.dataset.permname);
        this.setState({permissionToDlete: {id: event.target.dataset.permid, name: event.target.dataset.permname}});
    }

    cancel(event){
        console.dir(event.target.innerText);   
        message.error('Delete operation cancelled');
    }

    confirm(event){
        let permission = this.state.permissionToDlete;
        this.props.deletePermission(permission.id);
        message.success('New Permission Deleted successfully');        
    }

    onPagination(page){
        this.setState({
          current: page,
        });
        this.props.setPageNumber(page);
        this.props.getPermissions();      
    }

    processClientData( clients ){
        //event.preventDefault();
        let newClients = [];
        if(clients !== undefined){
            newClients = clients.map((item)=>{
                return item.name;
            })
            return newClients;
        }
        return ['ghfgh', 'hkjhljn'];
    }

    selectRole(value, option){
        debugger
        let client = this.props.clients.clients.find(item=> item.name === value);
        this.permission.clientId = client._id;
        this.permission.clientName = client.name;
    }
    

    render() {
        return(  
                <div className="userRole-container row">
                    
                    <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                        <h5 className="top-margin25">Create Permission</h5>
                        <div className="row">
                            
                                <div className="col-md-5 col-sm-5 col-xs-5">
                                    <AutoSuggestion placeholder="Select Client" 
                                        data={this.processClientData(  this.props.clients.clients )} 
                                        selectRole={this.selectRole} 
                                    />
                                </div>                                   
                                <div className="col-md-5 col-sm-5 col-xs-5">
                                    <input type="text" ref="permission_name" placeholder="Permission Name" className=" form-control"  />       
                                </div>
                                <div className="col-md-2 col-sm-2 col-xs-2">
                                    <button className="btn btn-primary hidden-xs" type="submit" onClick={this.createNewPermission}>Create</button>                                 
                                    <span className="visible-xs"><i className="btn btn-sm btn-primary fa fa-plus" />  </span>
                                </div>
                            
                        </div>
                    </div>

                    <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                        <h5 className="top-margin25">Permission List</h5>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <td>Permission Name</td>                              
                                    <td>Action</td>                              
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.permissions.length !== 0 ?
                                    this.props.permissions.permissions.map((item, i)=>{
                                        return(
                                            <tr key={i}>
                                                <td>
                                                    <Tooltip title="Click to edit Permission name" placement="top">
                                                    <input onChange={this.permissionNameChangeHandler} type="text" data-permid={item.id} value={item.name} placeholder="Permission Name/Code" className="form-control form-control-inline no-input"  />
                                                    </Tooltip>
                                                    <i className={"fa fa-check edit-perm-btn "+(item.edited ? 'show': 'hide')} onClick={()=>this.savePermName(item.id, item.name)}/>
                                                    
                                                </td>
                                                <td>
                                                    <Popconfirm title="Are you sure to delete this Permission?" onConfirm={ (event)=>{this.confirm(event)} } onCancel={ (event)=>{this.cancel(event)} } okText="Yes" cancelText="No">
                                                        <i title="remove permission" data-permid={item.id} data-permname={item.name}  className="fa fa-trash" onClick={ this.removePermission }/>
                                                    </Popconfirm>    
                                                </td>
                                            </tr>    
                                        )
                                    }) : <Loader />
                                }
                            </tbody> 
                        </table> 
                    </div>   
                    <div className="pagination" style={{'width':'57.5%'}}>
                        <Pagination defaultCurrent={1} total={this.props.pagination.pagination.totalPage} onChange={this.onPagination}  />
                    </div> 
                </div>
            )    
    }
    
}

function mapDispatchToProps(dispatch){
    return {
        getPermissions: bindActionCreators(getPermissions, dispatch),
        createNewPermission: bindActionCreators(createNewPermission, dispatch),
        editPermissionName: bindActionCreators(editPermissionName, dispatch),
        hideEditPermissionBtn: bindActionCreators(hideEditPermissionBtn, dispatch),
        deletePermission: bindActionCreators(deletePermission, dispatch),
        saveEditedPermissionName: bindActionCreators(saveEditedPermissionName, dispatch),
        getPagination: bindActionCreators(getPagination, dispatch),
        setPageNumber: bindActionCreators(setPageNumber, dispatch),
        getClients: bindActionCreators(getClients, dispatch)        
    }
}
  
function mapStateToProps(state){
    console.log('permission >> ', state)
      return{
        permissions: state.permissions,
        pagination: state.pagination,
        clients: state.clients       
      }
}

const _Permission = connect(mapStateToProps, mapDispatchToProps )(Permission);
export default _Permission;

//<i className={"fa fa-close edit-perm-btn red "+(item.edited ? 'show': 'hide')} onClick={()=>this.cancelUpdate(item.id, item.name)}/>
