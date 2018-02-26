import React, {Component}  from 'react';
import SelectTags from './SelectTags';

const EditUserModal1 = () => {
    
    let inputChangehandler = () => {
        //debugger
        let fname  = this.refs.fname.value;
        let lname  = this.refs.lname.value;
        let email = this.refs.email.value;
        
        let user = {id: this.props.user.id, fistName: fname, lastName: lname, email, roles: this.roles};
        this.props.selectUser(user);

    }

    let updateEditedUser = () => {
        this.props.submitEditedUser();
        setTimeout(()=>{
            this.closeModal();
        }, 200)
        
    }


    let getRolesArray = (data) => {
        return data;
    }    

    let handleChange =  (value, option) => {
        
        let roles = this.props.roles.roles;

        this.roles = getRoleArray(roles, value);
        
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
                    
                
                    <i className="fa fa-close close-modal-icon" onClick={this.closeModal}/>
                    <div className="modal-header"><h3 className="modal-title">Edit User</h3><hr className="hr"/></div>
                    <div className="modal-body">
                    
                        <div className="form-group">
                            <label className="form-label">First Name</label>
                            <input type="text" className="form-control" onChange={this.inputChangehandler} value={this.props.user.firstName} ref="fname"/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Last Name</label>
                            <input type="text" className="form-control" onChange={this.inputChangehandler} value={this.props.user.lastName} ref="lname"/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input type="text" className="form-control" onChange={this.inputChangehandler} value={this.props.user.email} ref="email"/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Roles</label>
                            <AutoSuggestion 
                                placeholder="Add New Role" 
                                selectRole={this.selectRole} 
                                data={this.props.roles.roles}
                            />                                
                        </div>
                        <SelectTags 
                            data={this.props.roles.roles} 
                            defaultData={ this.getDefaultRole(this.props.user.roles) } 
                            handleChange={this.handleChange} 
                        />

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
export default EditUserModal1;
