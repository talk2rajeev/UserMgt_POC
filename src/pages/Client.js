import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Popconfirm, message, Tooltip, notification, Pagination } from 'antd';
import CreateClientForm from '../components/CreateClientForm';
import ClientTable from '../components/ClientTable';
import EditClientModal from '../components/EditClientModal';

import { 
    getClients, 
    createClient, 
    deleteClient, 
    updateClient 
} from '../store/actions';

class Client extends Component {

    constructor(props){
        super(props);

        this.submitUserForm         = this.submitUserForm.bind(this);
        this.openCreateUserBox      = this.openCreateUserBox.bind(this);
        this.inputChangeHandler     = this.inputChangeHandler.bind(this);       
        this.closeCreateUserBox     = this.closeCreateUserBox.bind(this);
        this.renderCreateClientForm = this.renderCreateClientForm.bind(this);
        this.renderCreateUserButton = this.renderCreateUserButton.bind(this);
        this.setClientId            = this.setClientId.bind(this);
        this.cancelClientDelete     = this.cancelClientDelete.bind(this);
        this.confirmClientDelete    = this.confirmClientDelete.bind(this);
        this.renderEditClientForm   = this.renderEditClientForm.bind(this);  
        this.openEditClientModal    = this.openEditClientModal.bind(this);        
        this.closeEditClientModal   = this.closeEditClientModal.bind(this);
        this.updateClientForm       = this.updateClientForm.bind(this);
        this.inputEditClientChangeHandler = this.inputEditClientChangeHandler.bind(this);
        this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
        this.hrsToMinute = this.hrsToMinute.bind(this);
        this.validateMinute = this.validateMinute.bind(this);

        this.state = {isCreateClientFormOpen: false, isEditClientModalOpen: false};
        this.client = {};
        this.clientId = null;
    }

    componentDidMount(){
        this.props.getClients();
    }

    openCreateUserBox(){
        this.setState({isCreateClientFormOpen: true});
    }

    closeCreateUserBox(){
        this.setState({isCreateClientFormOpen: false});
    }

    inputChangeHandler(event){
        let name = event.target.name;
        let value = event.target.value;

        this.client[name] = value;
    }

    clearClientForm(){
        document.getElementById('cname').value = '';        
        document.getElementById('redirectUrl').value = '';
        document.getElementById('at_h').value = '';
        document.getElementById('at_m').value = '';
        document.getElementById('rt_h').value = '';
        document.getElementById('rt_m').value = '';
        document.getElementById('desc').value = '';
    }   

    openNotificationWithIcon(type){
        notification[type]({
          message: 'Invalid Client Form',
          description: 'Please fill mandatory fields.',
        });
    }

    hrsToMinute(hrs){
        
        let hr;
        if(hrs===undefined || parseInt(hrs) === NaN){
            return 0; 
        }
        if(parseInt(hrs) < 0){
            hr = hrs * -1;
        }
        return hr * 60;
    }

    validateMinute(mins){
        
        let min = mins;
        if(mins===undefined || parseInt(mins) === NaN){
            return 0; 
        }
        if(parseInt(mins) < 0){
            min = mins * -1;
        }
        return min;
    }

    submitUserForm(){
        console.log(this.client);
        if(this.client.name==='' || this.client.name === undefined){
            this.openNotificationWithIcon('error');
        }
        else{
            
            let c = {};
            c.name = this.client.name || '';
            c.redirectUrl = this.client.redirectUrl || '';
            c.logoutURI = this.client.logoutURI || '';
            c.refreshToken = (parseInt(this.hrsToMinute(this.client.refreshTokenLifeTime_hh))  + parseInt(this.validateMinute(this.client.refreshTokenLifeTime_mm))).toString();
            c.accessToken = (parseInt(this.hrsToMinute(this.client.AccessTokenLifeTime_hh)) + parseInt(this.validateMinute(this.client.AccessTokenLifeTime_mm))).toString();
            c.description = this.client.description || '';

            this.props.createClient(c);
            this.clearClientForm();
        }    
    }

    openEditClientModal(client){
        this.client = client;
        this.setState({client: client});
        this.setState({isEditClientModalOpen: true});
    }

    closeEditClientModal(){
        this.setState({isEditClientModalOpen: false});
    }

    inputEditClientChangeHandler(event){
        let client = {...this.state.client};
        let name = event.target.name;
        let value = event.target.value;

        client[name] = value;
        this.setState({client});
    }

    updateClientForm(){
        debugger;
        this.props.updateClient(this.state.client);
        this.setState({isEditClientModalOpen: false});        
    }

    setClientId(id){
        debugger
        this.clientId = id;
    }

    confirmClientDelete(event){
        this.props.deleteClient(this.clientId);
    }

    cancelClientDelete(event){
        
    }

    renderCreateUserButton(){
        return !this.state.isCreateClientFormOpen ? 
            <div className="top-margin10">
                <Tooltip title="Create Client" placement="right">
                    <button className="btn btn-sm btn-primary " onClick={this.openCreateUserBox}>
                        <i className="fa fa-male" /> &nbsp; <i className="fa fa-plus" />
                    </button>
                </Tooltip>
            </div>
            : null;
    }

    renderCreateClientForm(){
        return this.state.isCreateClientFormOpen ? 
            <div className="pos-rel create-client-container top-margin10">
                <h5 className="heading">Create New Client</h5>
                <i className="fa fa-close close-createClient-icn" onClick={this.closeCreateUserBox}/>
                <CreateClientForm inputChangeHandler={this.inputChangeHandler} submitUserForm={this.submitUserForm} />
            </div> 
        : null;
    }

    renderEditClientForm(){
        return this.state.isEditClientModalOpen ? 
            <EditClientModal 
                client={this.state.client}
                closeEditClientModal = {this.closeEditClientModal}
                inputEditClientChangeHandler  = {this.inputEditClientChangeHandler}  
                updateClientForm = {this.updateClientForm}
            />
            : null
    }

    
    render() {
        return (
            <div>  
                { this.renderCreateClientForm() }
                <div className="clearfix" />
                <div>
                   { this.renderCreateUserButton() } 
                </div>
                <div>
                    { 
                        this.props.clients.length !== 0 ? 
                        <ClientTable 
                            clients={this.props.clients.clients } 
                            setClientId = {this.setClientId}
                            confirmClientDelete = {this.confirmClientDelete}
                            cancelClientDelete = {this.cancelClientDelete}
                            openEditClientModal = {this.openEditClientModal}                         
                        /> 
                        : null
                    }
                </div>
                {
                    this.renderEditClientForm()
                }
            </div>

        )
    }

}

function mapDispatchToProps(dispatch) {
    return {
        getClients: bindActionCreators(getClients, dispatch),
        createClient: bindActionCreators(createClient, dispatch),
        deleteClient: bindActionCreators(deleteClient, dispatch),
        updateClient: bindActionCreators(updateClient, dispatch)
    }
}

function mapStateToProps(state) {
    return {
        clients: state.clients
    }
}

const _Client = connect(mapStateToProps, mapDispatchToProps)(Client);
export default _Client;