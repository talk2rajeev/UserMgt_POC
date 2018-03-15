import React, {Component}  from 'react';
import SelectTags from './SelectTags';

const EditUserModal = (props) => {
    
    let inputChangehandler = () => {
        //debugger
        let fname  = this.refs.fname.value;
        let lname  = this.refs.lname.value;
        let email = this.refs.email.value;
        
        //let user = {id: this.props.user.id, fistName: fname, lastName: lname, email, roles: this.roles};
        //this.props.selectUser(user);

    }



    let getRolesArray = (data) => {
        return data;
    }    

    let getDefaultRole = (roles) => {
        let defaultRoles = roles.map((item)=>{
            return item.name;
        })
        return defaultRoles;
    }

    
    return(  
        <div className={"modal-container show" }>
            <div className="backdrop"></div>
            <div className="modal-dialog">
                <div className={ "modal" }>
                    
                
                    <i className="fa fa-close close-modal-icon" onClick={props.closeUserEditModal}/>
                    <div className="modal-header"><h3 className="modal-title">Edit User</h3><hr className="hr"/></div>
                    <div className="modal-body">
                    
                        <div className="form-group">
                            <label className="form-label">First Name</label>
                            <input type="text" className="form-control" value={props.user.firstName} name="firstName" onChange={props.childInputChangehandler} id="fname"/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Last Name</label>
                            <input type="text" className="form-control" value={props.user.lastName} name="lastName" onChange={props.childInputChangehandler}  id="lname"/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input type="text" className="form-control" value={props.user.email} name="email" onChange={props.childInputChangehandler} id="email"/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Roles</label>
                            <SelectTags 
                                data={props.roles} 
                                defaultData={ getDefaultRole(props.user.roles) } 
                                handleChange={props.handleChange} 
                            />               
                        </div>
                        

                    </div>
                    <div className="modal-footer">
                        <hr className="hr"/>
                        <button className="btn btn-default" onClick={props.closeUserEditModal}>Cancel</button> &nbsp;&nbsp;
                        <button className="btn btn-success" onClick={props.updateEditedUser}>Update</button>
                    </div>
                </div>
                
            </div>
        </div>    
    )    
    
}
export default EditUserModal;
