import React, {Component}  from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { getUsers ,removeUser, openModal,closeModal, selectUser, sortUser ,searchUsers} from '../store/actions';
import UserTableRow from '../components/UserTableRow.jsx';
import EditUserModal from '../components/EditUserModal';

class UsersTable extends Component {

    constructor(props){
        super(props);

        this.editUser = this.editUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.sortUser = this.sortUser.bind(this);
        this.searchUsers = this.searchUsers.bind(this);
        
    }

    componentDidMount(){
        this.props.getUsers();
    }

    editUser(id, user){
        this.props.openModal("edituser");
        this.props.selectUser(user);
       // alert(id);
        
    }

    removeUser(id,index){
        //this.props.users.splice(index,1);
        var c= confirm("Are you sure to delete the user?");
        if(c)
            this.props.removeUser(id);
        let searchValue=this.refs.pattern.value;
        if(searchValue!='')
        this.props.searchUsers(searchValue);    

    }
    sortUser(e, sortType){
        debugger;
        this.props.sortUser(e);
        this.forceUpdate();
        
    }
    searchUsers(){
        let searchValue=this.refs.pattern.value;
        this.props.searchUsers(searchValue);
        //if(document.getElementById(sKey).innerHTML.toLowerCase().includes(document.getElementById("searchTheKey").value.toLowerCase())){

    }

    render() {
        if(!this.props.users)
            return <div>Loading......</div>
        else
            return(
                
                <div>
                    <div className="pull-right search-input-container">
					<input id="searchTheKey" placeholder="Search by Name" className="form-control" ref="pattern" onKeyUp={this.searchUsers.bind(this)}  type="text" ></input> 
				    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>
                                    <span>Name</span>
                                    &nbsp;&nbsp;
                                    <span>
                                        <i className="tablecell-sort-icon fa fa-arrow-up" onClick={(e)=>this.sortUser('desc')}/>
                                        <i className="tablecell-sort-icon fa fa-arrow-down" onClick={(e)=>this.sortUser('asc')}/>
                                    </span>
                                </th>
                                <th>Email</th>  
                                <th>Phone</th>
                                <th></th>                                                        
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.users.map((item, i)=>{
                                return(
                                    <UserTableRow user={item} key={i} index={i} editUser={this.editUser} removeUser={this.removeUser}/> 

                                )
                            })
                        }
                        </tbody>
                    </table>
                    <EditUserModal />        
                </div>
            )    
    }
    
}

function mapDispatchToProps(dispatch){
    return {
        getUsers: bindActionCreators(getUsers, dispatch),
        removeUser:bindActionCreators(removeUser,dispatch),
        openModal:bindActionCreators(openModal,dispatch),
        closeModal:bindActionCreators(closeModal,dispatch),
        selectUser:bindActionCreators(selectUser,dispatch),
        sortUser:bindActionCreators(sortUser,dispatch),
        searchUsers:bindActionCreators(searchUsers,dispatch)
        
       
    }
  }
  
  function mapStateToProps(state){
      console.log('>>>>>>>>>>>>', state)
      return{
          users: state.userlist.users
      }
  }

  const _UsersTable = connect(mapStateToProps, mapDispatchToProps )(UsersTable);

  export default _UsersTable;