//EditRoleModal.js


import React, {Component}  from 'react';
import AutoSuggestion from './AutoSuggestion';
import SelectTags from './SelectTags';
import { getRoleArray } from '../utility/helper';

class EditRoleModal extends Component {
    
    constructor(props){
        super(props);
        this.inputChangehandler = this.inputChangehandler.bind(this);
        this.getDefaultPermissions = this.getDefaultPermissions.bind(this);

        this.state={ role: this.props.role }
        
    }

    inputChangehandler(){
        //debugger
        let rolename  = this.refs.rolename.value;
        let role = {...this.state.role};
        role.name = rolename;

        this.setState({role});

    }

    updateEditedUser(){

    }

    getDefaultPermissions(event, permissions){
        event.preventDefault();
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ', permissions)
        debugger
        if(permissions){
            let defaultPerms = permissions.map((item)=>{
                return item.name;
            })
            return defaultPerms;
        }
        else{
            return [];
        }
    }

    render() {
        
         
        return(  
            <div className={"modal-container show "}>
                <div className="backdrop"></div>
                <div className="modal-dialog">
                    <div className={ "modal" }>
                       
                    
                       <i className="fa fa-close close-modal-icon" onClick={this.props.closeModal}/>
                        <div className="modal-header"><h3 className="modal-title">Edit Role</h3><hr className="hr"/></div>
                        <div className="modal-body">
                        
                            <div className="form-group">
                                <label className="form-label">Role Name</label>
                                <input type="text" className="form-control" value={this.state.role.name} onChange={this.inputChangehandler} ref="rolename"/>
                            </div>
                            
                            <div className="form-group">
                                <div className="form-label">Permissions</div>
                                <SelectTags data={this.props.permissions} defaultData={[]} />
                                {
                                    this.state.role.permission.map((item, i)=>{
                                        return(
                                            <span key={i} className="delete-perm-badge">{item.name} &nbsp;
                                                <i className="fa fa-close delete-perm" /> &nbsp;
                                            </span>
                                        )
                                    })
                                }                            
                            </div>

                        </div>
                        <div className="modal-footer">
                            <hr className="hr"/>
                            <button className="btn btn-success" onClick={this.updateEditedUser}>Update</button>
                        </div>
                    </div>
                    
                </div>
            </div>    
        )    
    }
    
}
export default EditRoleModal;

//<AutoSuggestion 
//placeholder="Permissions" 
//selectRole={this.selectRole} 
//data={this.props.roles.roles}
///> 