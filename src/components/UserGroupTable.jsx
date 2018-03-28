import React from 'react';
import { Popconfirm, message, Popover } from 'antd';
import RoleNameTag from './RoleNameTag';


const UserGroupTable = (props) => (
  <div className="row top-margin10">
    <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
      <div className="table-responsive">
        <table className="table table-striped">
            <thead>
                <tr>
                    <th><span>GroupName</span></th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.usergroups.length !== 0 ?
                        props.usergroups.map((item, i) => {
                            return (
                              <tr key={i}>
                                <td>{item.name}</td>
                                <td>
                                  {
                                    item.role.map((value, j)=>{
                                      return <RoleNameTag key={j} name={value.name} data_id="" href="#" id="" />                       
                                    })
                                  }
                                </td>
                                <td>
                                  <i className="fa fa-pencil" onClick={()=>props.openEditUserGroupModal(item)}/> &nbsp; &nbsp;
                                  <Popconfirm title="Are you sure to delete this UserGroup?" onConfirm={(event) => { props.confirmUserGroupDelete(event) }} onCancel={(event) => { props.cancelUserGroupDelete(event) }} okText="Yes" cancelText="No">      
                                      <i onClick={()=>props.setUserGroupIdToDelete(item._id)} className="fa fa-trash" />
                                  </Popconfirm>
                                </td>
                              </tr>  
                            )
                        }) : null
                }
            </tbody>
        </table>
      </div>
    </div>
  </div>  
)

export default UserGroupTable;

