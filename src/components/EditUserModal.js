import React, {Component}  from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { closeModal } from '../store/actions';

class EditUserModal extends Component {
    
    constructor(props){
        super(props);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal(){
        this.props.closeModal('edituser');
    }   

    render() {
        if(!this.props.user ) {
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
                                <input type="text" className="form-control" value={this.props.user.name} ref="username"/>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input type="text" className="form-control" value={this.props.user.email} ref="password"/>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone</label>
                                <input type="text" className="form-control" value={this.props.user.phone} ref="password"/>
                            </div>
                            

                        </div>
                        <div className="modal-footer">
                            <hr className="hr"/>
                            <button className="btn btn-success" onClick={this.loginHandler}>Edit</button>
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
       
    }
}

function mapStateToProps(state){
    console.log('>>>>>>>>>>>>', state)
    return{
        isModalOpen: state.modal.editUserModal,
        user: state.selectedUser.user
    }
}

const _EditUserModal = connect(mapStateToProps, mapDispatchToProps )(EditUserModal);

export default _EditUserModal;