import React, {Component}  from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { getRoles, createNewRoles, deletePermFromRoles } from '../store/actions';

import { Popconfirm, message, Tooltip } from 'antd';
import AutoSuggestion from '../components/AutoSuggestion';
import LineSeparator from '../components/LineSeparator';



class Roles extends Component {

    constructor(props){
        super(props);
        this.setDataId = this.setDataId.bind(this);
        this.cancel = this.cancel.bind(this);
        this.confirm = this.confirm.bind(this);
        this.selectRole = this.selectRole.bind(this);
        this.roleNameHandler = this.roleNameHandler.bind(this);
        this.removeFromPermissionList = this.removeFromPermissionList.bind(this);
        this.createRoleHandler = this.createRoleHandler.bind(this);

        this.state = {pidToDelete: {}, newRole: {'name': '', 'pIds': []} }
    }

    componentDidMount(){
        this.props.getRoles();
    }

    cancel(event){
        //event.target.innerText;
        message.error('Delete action cancelled ');
    }

    confirm(event){

        console.dir(event.target.innerText);
        console.dir(this.state);
        

        let pidToDelete = {...this.state};

        
        let role = JSON.parse(  pidToDelete.pidToDelete.role);

        let id = role.id;
        let pid = pidToDelete.pidToDelete.pid;
        
        console.log('pid, id: ', pid,  role.id);
        
        this.props.deletePermFromRoles(id, pid);
        //this.props.getRoles();
        message.success('You just deleted permission');
    }

    setDataId(e){
        e.preventDefault();
        this.setState( {pidToDelete: {pid: e.target.dataset.permid, role: e.target.dataset.role} } );
    }

    selectRole(value, option){

        var newRole = {...this.state.newRole}
        const pIds = newRole.pIds;
        pIds.includes(value) !== true ? pIds.push(value) : null;
    
        this.setState({newRole});

    }

    roleNameHandler(){
        let rolename = this.refs.rolename.value;
        console.log('- ',rolename)
        var newRole = {...this.state.newRole}
        newRole.name = rolename;
        this.setState({newRole});
    }

    removeFromPermissionList(event, item){
        
        event.preventDefault();
        let newRole = {...this.state.newRole};
        let newperms = newRole.pIds.filter( (val) => {
            return event.target.dataset.itemname === val ? false : true; 
        });
        newRole.pIds = newperms;
        
        this.setState({newRole});
    }

    createRoleHandler(){
        this.props.createNewRoles(this.state.newRole);
        message.success('New Role added succesfully');
    }

    render() {
        return(  
                <div className="userRole-container">
                    <br />   
                    <h3>Create New Role</h3> 
                    <div className="create-role-container row">
                        <div className="col-md-3">                        
                            <input type="text" placeholder="Type New Role" onChange={ this.roleNameHandler } ref="rolename" className="form-control"  />
                        </div>
                        <div className="col-md-4" style={{'position':'relative'}}>
                            {
                                this.props.roles.length === 33 ? <AutoSuggestion selectRole={this.selectRole}/> : null
                            }
                            <AutoSuggestion selectRole={this.selectRole}/>
                        </div>
                    </div>

                    <div className={"createRoleBox top-margin25 "}>
                        
                        <div className="createRoleBox-row">                        
                            <div className="col-md-2 label"> RoleName: </div>
                            <div className="col-md-10"> <span className="rolename">{this.state.newRole.name}</span>  </div>
                            <div className="clearfix" />
                        </div>
                        <div className="createRoleBox-row">
                            <div className="col-md-2 label"> Permissions: </div>
                            <div className="col-md-10">
                                {
                                    this.state.newRole.pIds.map( (item, i)=> {
                                        return(
                                            <span key={'role-'+i} className='delete-perm-badge'>
                                                {item}&nbsp;
                                                <i className="fa fa-close delete-perm" data-itemname={item}  onClick={ (event, item)=>{this.removeFromPermissionList(event, item)} } />
                                            </span> 
                                        )
                                    })
                                }
                            </div>
                            <div className="clearfix" />
                        </div>
                        <div className="createRoleBox-row" style={{'padding':'5px 10px'}}>
                                <button onClick={this.createRoleHandler} className="btn btn-xs btn-primary">
                                    Create Role <i className="fa fa-plus" />
                                </button>
                        </div>
                        <div className={" "+ (this.state.newRole.name!== '' && this.state.newRole.pIds.length!== 0 ? '' : 'disabled')} />
                    </div>

                    <LineSeparator />

                    <h3>Existing Roles</h3>
                    <table className="table table-striped" style={{'width':'57.5%'}}>
                        <thead>
                            <tr>
                                <td>Role</td>
                                <td>Permissions</td>                              
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.roles.length !== 0 ?
                                this.props.roles.roles.map((item, i)=>{
                                    return(
                                        <tr key={i}>
                                            <td>{item.name}</td>
                                            <td>
                                                {
                                                    item.pIds.map((val, j)=>{
                                                        return(
                                                            
                                                            <Popconfirm key={'pid'+j} title="Are you sure delete this task?" onConfirm={ (event)=>{this.confirm(event)} } onCancel={ (event)=>{this.cancel(event)} } okText="Yes" cancelText="No">
                                                                <span data-id={val} href="#" id={val.id} className="delete-perm-badge">
                                                                    {val.name} &nbsp;
                                                                    <Tooltip title="Delete Permission" placement="right">
                                                                        <i title="remove permission" data-role={JSON.stringify(item)} data-permid={val.id} className="fa fa-close delete-perm" onClick={ (event)=>{this.setDataId(event)} }/>
                                                                    </Tooltip>
                                                                </span>
                                                            </Popconfirm>   
                                                                 
                                                        )
                                                    })
                                                }
                                                
                                            </td>
                                        </tr>            
                                    )
                                }) : null
                            }
                            
                        </tbody>
                    </table>

                </div>
            )    
    }
    
}

function mapDispatchToProps(dispatch){
    return {
        getRoles: bindActionCreators(getRoles, dispatch),
        createNewRoles: bindActionCreators(createNewRoles, dispatch),
        deletePermFromRoles: bindActionCreators(deletePermFromRoles, dispatch)
    }
}
  
function mapStateToProps(state){
    console.log('state >> ', state)
      return{
         roles: state.roles
      }
}

const _Roles = connect(mapStateToProps, mapDispatchToProps )(Roles);
export default _Roles;

//export default Roles;