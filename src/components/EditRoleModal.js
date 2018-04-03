//EditRoleModal.js


import React, {Component}  from 'react';
import AutoSuggestion from './AutoSuggestion';
import SelectTags from './SelectTags';
import { getRoleArray } from '../utility/helper';

export const EditRoleModal = (props) =>  {
    
    
    let getDefaultPermissions = ( permissions) => {
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

   
         
    return(  
        <div className={"modal-container show "}>
            <div className="backdrop"></div>
            <div className="modal-dialog">
                <div className={ "modal" }>
                    
                
                    <i className="fa fa-close close-modal-icon" style={{'color':'red', 'fontSize':'1.3em'}} onClick={props.closeModal}/>
                    <div className="modal-header"><h3 className="modal-title">Edit Role</h3><hr className="hr"/></div>
                    <div className="modal-body">
                    
                        <div className="form-group">
                            <label className="form-label">Role Name</label>
                            <input type="text" className="form-control input1" value={props.role.name} onChange={props.childInputChangehandler} id="rolename"/>
                        </div>
                        
                        <div className="form-group">
                            <div className="form-label">Permissions</div>
                            <SelectTags handleChange={props.handleChange} data={props.permissions} defaultData={getDefaultPermissions(props.role.permission)} />                          
                        </div>

                    </div>
                    <div className="modal-footer">
                        <hr className="hr"/>
                        <button className="btn btn-default" onClick={props.closeModal}>Cancel</button> &nbsp;&nbsp;
                        <button className="btn btn-success" onClick={props.updateEditedRole}>Update</button>
                    </div>
                </div>
                
            </div>
        </div>    
    )    
    
    
}
export default EditRoleModal;

//<AutoSuggestion 
//placeholder="Permissions" 
//selectRole={this.selectRole} 
//data={this.props.roles.roles}
///> 