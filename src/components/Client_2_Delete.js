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
        this.openCreateClientBox      = this.openCreateClientBox.bind(this);
        this.inputChangeHandler     = this.inputChangeHandler.bind(this);       
        this.closeCreateClientBox     = this.closeCreateClientBox.bind(this);
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
        
        this.state = {isCreateClientFormOpen: false, isEditClientModalOpen: false};
        this.client = {};
        this.clientId = null;
    }

    componentDidMount(){
        this.props.getClients();
    }

    openCreateClientBox(){
        this.setState({isCreateClientFormOpen: true});
    }

    closeCreateClientBox(){
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
        document.getElementById('logoutUrl').value = '';
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

    submitUserForm(){
        // console.log(this.client);
        // if(this.client.name==='' || this.client.name === undefined){
        //     this.openNotificationWithIcon('error');
        // }
        // else{
        //     debugger
        //     let c = {};
        //     c.name = this.client.name;
        //     c.redirectUrl = this.client.redirectUrl;
        //     c.logoutURI = this.client.logoutURI;
        //     c.refreshToken = this.client.refreshTokenLifeTime_hh+'-'+this.client.refreshTokenLifeTime_mm;
        //     c.accessToken = this.client.AccessTokenLifeTime_hh+''+this.client.AccessTokenLifeTime_mm;
        //     c.description = this.client.description;
            
        //     //this.props.createClient(this.client);
        //     //this.clearClientForm();
        // }    
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
        this.props.updateClient(this.state.client);
        this.setState({isEditClientModalOpen: false});        
    }

    setClientId(id){
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
                    <button className="btn btn-sm btn-primary " onClick={this.openCreateClientBox}>
                        <i className="fa fa-male" /> &nbsp; <i className="fa fa-plus" />
                    </button>
                </Tooltip>
            </div>
            : null;
    }

    renderCreateClientForm(){
        return this.state.isCreateClientFormOpen ? 
            <div className="pos-rel create-client-container top-margin10">
                <h3 className="heading">Create New Client</h3>
                <i className="fa fa-close close-createClient-icn" onClick={this.closeCreateClientBox}/>
                <CreateClientForm closeCreateClientBox={this.closeCreateClientBox} inputChangeHandler={this.inputChangeHandler} submitUserForm={this.submitUserForm} />
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