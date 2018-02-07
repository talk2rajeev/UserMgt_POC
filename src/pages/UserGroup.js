import React, {Component}  from 'react';
import TransferUserToGroup from '../components/TransferUserToGroup';

class UserGroup extends Component {

    render() {
        return(  
                <div className="userGroup-container">
                    <br />    
                    <div className="create-user-container row">
                        <div className="col-md-3">
                            
                            <div className="input-group">
                                <input type="text" placeholder="New User Group" className="form-control"  />
                                <div className="input-group-btn">
                                    <button className="btn btn-primary" type="submit">
                                        <i className="fa fa-search"></i>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <td>User Group</td>
                                <td>Roles</td>
                                <td>Permissions</td>                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Admin</td>
                                <td>admin</td>
                                <td>401, 402, 404</td>
                            </tr>
                        </tbody>
                    </table>

                    <TransferUserToGroup />
                </div>
            )    
    }
    
}
export default UserGroup;