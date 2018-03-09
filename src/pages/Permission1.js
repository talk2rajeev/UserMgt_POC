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
    setPageNumber  
} from '../store/actions';

import { Popconfirm, message, Tooltip, notification, Pagination } from 'antd';
import LineSeparator from '../components/LineSeparator';
import { dirname } from 'path';
import Loader from '../components/Loader';

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

        this.state = { permissionToDlete: {id: null, name: ''}, pagination: {current: 1} };
    }

    componentDidMount(){
        this.props.getPermissions();
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
        debugger
        let permission_name = this.refs.permission_name.value;
        if(permission_name.length !== 0){
            this.props.createNewPermission(permission_name);
            message.success('New Permission created successfully');        
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
        debugger
        this.setState({
          current: page,
        });
        this.props.setPageNumber(page);
        this.props.getPermissions();      
    }
    

    render() {
        return(  
                <div className="userRole-container">
                    
                    <h3 className="top-margin25">Create Permission</h3>
                    <div className="row">
                        <div className="col-md-3">            
                            <div className="input-group">
                                <input type="text" ref="permission_name" placeholder="Permission Name/Code" className="form-control"  />
                                <div className="input-group-btn">
                                    <button className="btn btn-primary" type="submit" onClick={this.createNewPermission}>
                                        <i className="fa fa-save"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h3 className="top-margin25">Permission List</h3>
                    <table className="table table-striped" style={{'width':'57.5%'}}>
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
        setPageNumber: bindActionCreators(setPageNumber, dispatch)
    }
}
  
function mapStateToProps(state){
    console.log('permission >> ', state)
      return{
        permissions: state.permissions,
        pagination: state.pagination        
      }
}

const _Permission = connect(mapStateToProps, mapDispatchToProps )(Permission);
export default _Permission;

//<i className={"fa fa-close edit-perm-btn red "+(item.edited ? 'show': 'hide')} onClick={()=>this.cancelUpdate(item.id, item.name)}/>