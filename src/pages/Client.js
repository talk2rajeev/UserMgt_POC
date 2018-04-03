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
    updateClient,
    getPagination,
    setPageNumber, 
    searchClient
} from '../store/actions';

class Client extends Component {

    constructor(props){
        super(props);

        this.submitClientForm         = this.submitClientForm.bind(this);
        this.openCreateUserBox      = this.openCreateUserBox.bind(this);
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
        this.hrsToMinute = this.hrsToMinute.bind(this);
        this.validateMinute = this.validateMinute.bind(this);
        this.getHr = this.getHr.bind(this);
        this.getMin = this.getMin.bind(this);
        this.copyToClipboard = this.copyToClipboard.bind(this);
        this.onPagination = this.onPagination.bind(this);
        this.searchInputHandler = this.searchInputHandler.bind(this);
            
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
        document.getElementById('logoutUrl').value = ''
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
        
        let hr=hrs;
        if(hrs===undefined || parseInt(hrs) === NaN || hrs===''){
            return 0; 
        }
        if(parseInt(hrs) < 0){
            hr = hrs * -1;
        }
        return hr * 60;
    }

    validateMinute(mins){
        
        let min = mins;
        if(mins===undefined || parseInt(mins) === NaN || mins === ''){
            return 0; 
        }
        if(parseInt(mins) < 0){
            min = mins * -1;
        }
        return min;
    }

    copyToClipboard(value, type){
        if(type === 'id'){
            document.getElementById('id').select();
            document.execCommand("Copy");
        } 
        if(type === 'secret'){
            document.getElementById('secret').select();
            document.execCommand("Copy");
        }
    }

    submitClientForm(){
        console.log(this.client);
        if(this.client.name==='' || this.client.name === undefined){
            this.openNotificationWithIcon('error');
        }
        else{
            
            let c = {};
            c.name = this.client.name || '';
            c.redirectUrl = this.client.redirectUrl || '';
            c.logoutURI = this.client.logoutURI || '';
            c.refreshToken = (parseInt(this.hrsToMinute(this.client.refreshTokenLifeTime_hh || 0))  + parseInt(this.validateMinute(this.client.refreshTokenLifeTime_mm || 0))).toString();
            c.accessToken = (parseInt(this.hrsToMinute(this.client.AccessTokenLifeTime_hh || 0)) + parseInt(this.validateMinute(this.client.AccessTokenLifeTime_mm || 0))).toString();
            c.description = this.client.description || '';
            this.props.createClient(c);
            this.clearClientForm();
            this.client = {};
        }    
    }

    openEditClientModal(client){
        this.client = client;
       // this.setState({client: client});
       this.setState({isEditClientModalOpen: true});
        //if(this.state.isEditClientModalOpen){
          //  let clientNew = {...this.state.client};
          let clientNew = client;
          
            let refreshTokenHr=this.getHr(client.refreshToken);
            let refreshTokenMin=this.getMin(client.refreshToken);
            let accessTokenHr=this.getHr(client.accessToken);
            let accessTokenMin=this.getMin(client.accessToken);
    
            clientNew["refreshTokenHr"] = refreshTokenHr;
            clientNew["refreshTokenMin"] = refreshTokenMin;
            clientNew["accessTokenHr"] = accessTokenHr;
            clientNew["accessTokenMin"] = accessTokenMin;
            
            this.setState({client:clientNew});
        //   }
    }

    closeEditClientModal(){
        this.setState({isEditClientModalOpen: false});
    }

    inputEditClientChangeHandler(event){
        
        let client = {...this.state.client};
        let name = event.target.name;
        let value = event.target.value;
        if(event.target.name=='AccessTokenLifeTime_hh')
           client['accessTokenHr'] = value;
        if(event.target.name=='AccessTokenLifeTime_mm')
        client['accessTokenMin'] = value;
        if(event.target.name=='refreshTokenLifeTime_hh')
        client['refreshTokenHr'] = value;
        if(event.target.name=='refreshTokenLifeTime_mm')
        client['refreshTokenMin'] = value;   
          
        client[name] = value;
        this.setState({client});
    }

    updateClientForm(){
        
        let clientToUpdate = this.state.client;
        
        clientToUpdate['refreshToken'] = (parseInt(this.hrsToMinute(clientToUpdate.refreshTokenHr || 0))  + parseInt(this.validateMinute(clientToUpdate.refreshTokenMin || 0))).toString();
        clientToUpdate['accessToken'] = (parseInt(this.hrsToMinute(clientToUpdate.accessTokenHr || 0)) + parseInt(this.validateMinute(clientToUpdate.accessTokenMin || 0))).toString();
       // this.props.updateClient(this.state.client);
       this.props.updateClient(clientToUpdate);
        this.setState({isEditClientModalOpen: false});        
    }

    setClientId(id){
        
        this.clientId = id;
    }

    confirmClientDelete(event){
        this.props.deleteClient(this.clientId);
    }

    cancelClientDelete(event){
        message.error('Delet opration cancelled');
    }

    onPagination(page){
        this.setState({
          current: page,
        });
        this.props.setPageNumber(page);
        this.props.getClients();      
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
            <div className="col-sm-12 col-xs-12 pos-rel create-client-container top-margin10">
                <h5 className="heading">Create New Client</h5>
                <i className="fa fa-close close-createClient-icn" onClick={this.closeCreateClientBox}/>
                <CreateClientForm closeCreateClientBox={this.closeCreateClientBox} inputChangeHandler={this.inputChangeHandler} submitClientForm={this.submitClientForm} />
            </div> 
        : null;
    }
     getMin(mins){
        let min = mins;
        let hrMins='';
        if(mins===undefined || parseInt(mins) === NaN || mins === ''){
            return 0; 
        }
        if(parseInt(mins) < 0){
            min = mins * -1;
        }
        if(parseInt(mins) > 0){
            //hrMins =Math.floor( mins / 60);
            hrMins = mins % 60;
        }
        return hrMins;
    }
    getHr(mins){
        let min = mins;
        let hrMins='';
        if(mins===undefined || parseInt(mins) === NaN || mins === ''){
            return 0; 
        }
        if(parseInt(mins) < 0){
            min = mins * -1;
        }
        if(parseInt(mins) > 0){
            hrMins =Math.floor( mins / 60);
           // hrMins = mins % 60;
        }
        return hrMins;
    }

    searchInputHandler(event){
        console.log(event.target.value);
        this.props.searchClient(event.target.value);
    }

    renderEditClientForm(){
        return this.state.isEditClientModalOpen ? 
            <EditClientModal 
                client={this.state.client}
                closeEditClientModal = {this.closeEditClientModal}
                inputEditClientChangeHandler  = {this.inputEditClientChangeHandler}  
                updateClientForm = {this.updateClientForm}
                copyToClipboard = {this.copyToClipboard}
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
                <div className="row">
                    { 
                        this.props.clients.length !== 0 && 
                        !this.state.isCreateClientFormOpen ? 
                        <div className="top-margin10 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                            <div>
                                <input type="text" onKeyUp={this.searchInputHandler} 
                                        className="form-control1 pull-right" 
                                />                                
                            </div>
                            <ClientTable 
                                clients={this.props.clients.clients } 
                                setClientId = {this.setClientId}
                                confirmClientDelete = {this.confirmClientDelete}
                                cancelClientDelete = {this.cancelClientDelete}
                                openEditClientModal = {this.openEditClientModal}                         
                            /> 
                            <div className="pull-right">            
                                <Pagination defaultCurrent={1} total={this.props.pagination.pagination.totalPage} onChange={this.onPagination}  />
                            </div>
                        </div>
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
        updateClient: bindActionCreators(updateClient, dispatch),
        getPagination: bindActionCreators(getPagination, dispatch),
        setPageNumber: bindActionCreators(setPageNumber, dispatch),
        searchClient: bindActionCreators(searchClient, dispatch)
    }
}

function mapStateToProps(state) {
    return {
        clients: state.clients,
        pagination: state.pagination
        
    }
}

const _Client = connect(mapStateToProps, mapDispatchToProps)(Client);
export default _Client;