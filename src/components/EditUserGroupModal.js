
import React, {Component}  from 'react';
import SelectTags from './SelectTags';
import { getRoleArray } from '../utility/helper';
import AutoSuggestion from './AutoSuggestion';

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

    let handleChange = (value, option) => {
        
        props.handleEditableRoleChange(value, option);
    }
   
       
    return(  
        <div className={"modal-container show "} style={{"top":"-40px"}}>
            <div className="backdrop"></div>
            <div className="modal-dialog">
                <div className={ "modal modal-lg" }>
                    
                
                    <i className="fa fa-close close-modal-icon" style={{'color':'red'}} onClick={props.closeEditUserGroupModal}/>
                    <div className="modal-header"><h3 className="modal-title">Edit User Group</h3>
                    </div>
                    <div className="modal-body">
                    
                        <div className="form-group">
                            <label className="form-label">User Group Name</label>
                            <input type="text" className="form-control" name="name" value={props.selectedUserGroup.name}  onChange={props.childInputEditHandler} id="rolename"/>
                        </div>
                        
                        <div className="form-group">
                            <div className="form-label">Select Roles</div>
                            <SelectTags 
                                handleChange={handleChange} 
                                data={props.roles} 
                                defaultData={getDefaultPermissions(props.selectedUserGroup.role)} 
                            />                            
                        </div>

                        <div className="form-group assign_usr_blk">
                            <div className="form-label">Assign Users to User-Group</div>
                            <AutoSuggestion 
                                    placeholder="Select User" 
                                    data={ props.userData }
                                    selectRole={props.selectRole} 
                            />
                            <div className="top-margin10 table-responsive" style={{'maxHeight':'383px', 'overflowY':'scroll'}}>
                                {
                                    props.users.length ? 
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
                                                 
                                                props.users.map((item, i)=>{
                                                    return(
                                                        <tr key={i}>
                                                            <td>{item.firstName}</td>
                                                            <td>{item.lastName}</td>
                                                            <td>
                                                                <i className="fa fa-close" style={{'color':'red'}} 
                                                                   onClick={()=>props.removeUserFromUserGroupForm(item)}/>
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

                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-default btn-sm" onClick={props.closeEditUserGroupModal}>Cancel</button>&nbsp;&nbsp;
                        <button className="btn btn-success btn-sm" onClick={props.updateEditedUserGroup}>Update</button>
                    </div>
                </div>
                
            </div>
        </div>    
    )    
    
    
}
export default EditUserGroupModal;

