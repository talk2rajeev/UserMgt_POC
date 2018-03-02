
import React, {Component}  from 'react';
import SelectTags from './SelectTags';
import TransferUserToGroup from './TransferUserToGroup';
import { getRoleArray } from '../utility/helper';


export const EditUserGroupModal = (props) =>  {
    
    
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
                <div className={ "modal" } style={{'width':'750px'}}>
                    
                
                    <i className="fa fa-close close-modal-icon" onClick={props.closeEditableUGModal}/>
                    <div className="modal-header"><h3 className="modal-title">Edit User Group</h3><hr className="hr"/></div>
                    <div className="modal-body">
                    
                        <div className="form-group">
                            <label className="form-label">User Group Name</label>
                            <input type="text" className="form-control" value={props.usergroup.name} onChange={props.childInputChangehandler} id="rolename"/>
                        </div>
                        
                        <div className="form-group">
                            <div className="form-label">Select Roles</div>
                            <SelectTags handleChange={props.handleEditableRoleChange} data={props.roles} defaultData={getDefaultPermissions(props.usergroup.role)} />                            
                        </div>

                        <div className="form-group">
                            <div className="form-label">Assign Users to User-Group</div>
                            
                        </div>

                    </div>
                    <div className="modal-footer">
                        <hr className="hr"/>
                        <button className="btn btn-success" onClick={props.updateEditedUG}>Update</button>
                    </div>
                </div>
                
            </div>
        </div>    
    )    
    
    
}
export default EditUserGroupModal;

