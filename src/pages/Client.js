import React, { Component } from 'react';
import { Popconfirm, message, Tooltip, notification, Pagination } from 'antd';

import CreateClientForm from '../components/CreateClientForm';

class Client extends Component {

    constructor(props){
        super(props);

        this.submitUserForm = this.submitUserForm.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.openCreateUserBox  = this.openCreateUserBox.bind(this);
        this.closeCreateUserBox = this.closeCreateUserBox.bind(this);
        this.renderCreateClientForm = this.renderCreateClientForm.bind(this);
        this.renderCreateUserButton = this.renderCreateUserButton.bind(this);
        
        this.state = {isCreateClientFormOpen: false};
    }

    openCreateUserBox(){
        this.setState({isCreateClientFormOpen: true});
    }

    closeCreateUserBox(){
        this.setState({isCreateClientFormOpen: false});
    }

    inputChangeHandler(event){
        console.log(event.target.name, event.target.value);
    }

    submitUserForm(){

    }

    renderCreateUserButton(){
        return !this.state.isCreateClientFormOpen ? 
            <div className="top-margin10">
                <Tooltip title="Create Client" placement="right">
                    <button className="btn btn-sm btn-primary " onClick={this.openCreateUserBox}>
                        <i className="fa fa-male" /><i className="fa fa-plus" />
                    </button>
                </Tooltip>
            </div>
            : null;
    }

    renderCreateClientForm(){
        return this.state.isCreateClientFormOpen ? 
            <div className="pos-rel create-client-container top-margin10">
                <h3 className="heading">Create New Client</h3>
                <i className="fa fa-close close-createClient-icn" onClick={this.closeCreateUserBox}/>
                <CreateClientForm inputChangeHandler={this.inputChangeHandler}/>
            </div> 
        : null;
    }

    
    render() {
        return (
            <div>  
                { this.renderCreateClientForm() }
                <div className="clearfix" />
                <div>
                   { this.renderCreateUserButton() } 
                </div>
            </div>

        )
    }

}

export default Client;
