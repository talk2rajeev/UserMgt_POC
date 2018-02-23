import React, {Component}  from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { closeModal, selectUser, submitEditedUser } from '../store/actions';
import AutoSuggestion from './AutoSuggestion';

class EditUserModal extends Component {
    
    constructor(props){
        super(props);
        
        this.closeModal = this.closeModal.bind(this);
        this.selectRole = this.selectRole.bind(this);
        this.inputChangehandler = this.inputChangehandler.bind(this);
        this.updateEditedUser = this.updateEditedUser.bind(this);  
        
        this.roles = [];
    }

    closeModal(){
        this.props.closeModal('edituser');
    }   

    inputChangehandler(){
        let name  = this.refs.name.value;
        let email = this.refs.email.value;
        let phone = this.refs.phone.value;
        
        let user = {id: this.props.user.id, name, email, phone, roles: this.props.user.roles};
        this.props.selectUser(user);

    }

    updateEditedUser(){
        this.props.submitEditedUser();
        setTimeout(()=>{
            this.closeModal();
        }, 200)
        
    }

    selectRole(value, option){

        console.log(value);

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
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" onChange={this.inputChangehandler} value={this.props.user.name} ref="name"/>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input type="text" className="form-control" onChange={this.inputChangehandler} value={this.props.user.email} ref="email"/>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone</label>
                                <input type="text" className="form-control" onChange={this.inputChangehandler} value={this.props.user.phone} ref="phone"/>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Roles</label>
                                <AutoSuggestion 
                                    placeholder="Add New Role" 
                                    selectRole={this.selectRole} 
                                    data={this.props.permissions}
                                />                                
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
//export default EditUserModal;

function mapDispatchToProps(dispatch){
    return {
        closeModal: bindActionCreators(closeModal, dispatch),
        selectUser: bindActionCreators(selectUser, dispatch),
        submitEditedUser: bindActionCreators(submitEditedUser, dispatch)
    }
}

function mapStateToProps(state){
    console.log('state>>>>>> :: ',state);
    return{
        isModalOpen: state.modal.editUserModal,
        user: state.selectedUser.user
    }
}

const _EditUserModal = connect(mapStateToProps, mapDispatchToProps )(EditUserModal);

export default _EditUserModal;