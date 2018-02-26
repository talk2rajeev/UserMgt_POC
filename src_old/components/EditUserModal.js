import React, {Component}  from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { closeModal, selectUser, submitEditedUser, getRoles } from '../store/actions';
import AutoSuggestion from './AutoSuggestion';
import SelectTags from './SelectTags';
import { getRoleArray } from '../utility/helper';

class EditUserModal extends Component {
    
    constructor(props){
        super(props);
        
        this.closeModal = this.closeModal.bind(this);
        this.selectRole = this.selectRole.bind(this);
        this.inputChangehandler = this.inputChangehandler.bind(this);
        this.updateEditedUser = this.updateEditedUser.bind(this);  
        this.handleChange = this.handleChange.bind(this);
        this.getDefaultRole = this.getDefaultRole.bind(this);

        this.roles = [];
    }

    componentDidMount(){
        this.props.getRoles();
    }

    closeModal(){
        this.props.closeModal('edituser');
    }   

    inputChangehandler(){
        //debugger
        let fname  = this.refs.fname.value;
        let lname  = this.refs.lname.value;
        let email = this.refs.email.value;
        
        let user = {id: this.props.user.id, fistName: fname, lastName: lname, email, roles: this.roles};
        this.props.selectUser(user);

    }

    updateEditedUser(){
        this.props.submitEditedUser();
        setTimeout(()=>{
            this.closeModal();
        }, 200)
        
    }

    selectRole(value, option){
        debugger;
        document.querySelector('.ant-select-search__field').setAttribute("id", value);
        document.querySelector('.ant-select-search__field').value = 'test';
        console.log(value);

    }

    getRolesArray(data){
        debugger
        return data;
    }    

    /*handleChange(value, option) {
        debugger
        console.log(`Selected:: ${value}`);
        console.log(`id:: ${option[0].key}`)
    }*/

    handleChange(value, option) {
        
        let roles = this.props.roles.roles;

        this.roles = getRoleArray(roles, value);
        
    }

    getDefaultRole(roles){
        let defaultRoles = roles.map((item)=>{
            return item.name;
        })
        return defaultRoles;
    }

    render() {
        
        if( !this.props.user ) {
            return null
        }
        else
        return(  
            <div className={"modal-container " + (this.props.isModalOpen ? 'show' : 'hide')}>
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
    
}
//export default EditUserModal;

function mapDispatchToProps(dispatch){
    return {
        closeModal: bindActionCreators(closeModal, dispatch),
        selectUser: bindActionCreators(selectUser, dispatch),
        submitEditedUser: bindActionCreators(submitEditedUser, dispatch),
        getRoles: bindActionCreators(getRoles, dispatch)
    }
}

function mapStateToProps(state){
    console.log('state>>>>>> :: ',state);
    return{
        isModalOpen: state.modal.editUserModal,
        user: state.selectedUser.user,
        roles: state.roles
    }
}

const _EditUserModal = connect(mapStateToProps, mapDispatchToProps )(EditUserModal);

export default _EditUserModal;