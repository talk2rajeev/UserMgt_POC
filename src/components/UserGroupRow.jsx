import React from 'react';
import { Popconfirm, message, Popover } from 'antd';


const content = (users) => {
  debugger
  return(
    <div>
    {
      users ?
      users.map(item=>{
        return <div>{item.name}</div>
      }):
      null
    }
    </div>
  )
};

const UserGroupRow = (props) => (
  <tr>
    <td>
      <div className="userGroup-name-container" onClick={(ug) => props.editUser(props.usergroups)} >
        <span  className="userGroup-name">
          {props.usergroups.name} 
        </span> &nbsp;
        
      </div>
    </td>
    <td>
      {
        props.usergroups.role.map((val, j) => {
          return (
              <span data-id={val[j]} href="#" id={val[j]} className="delete-perm-badge">
                {val?val.name:""} &nbsp;
              </span>
          )
        })
      }
    </td>
    <td>
      <i className="fa fa-pencil  hand-pointer"  onClick={(ug) => props.editUser(props.usergroups)} />&nbsp;&nbsp;&nbsp;&nbsp;
      <Popconfirm title="Are you sure to delete this User Group?" onConfirm={(event) => { props.confirmUGDelete(event) }} onCancel={(event) => { props.cancelUGDelete(event) }} okText="Yes" cancelText="No">      
        <i className="fa fa-trash  " onClick={() => props.removeUserGroup(props.usergroups._id, props.index)} />
      </Popconfirm>      
    </td>
  </tr>
)

export default UserGroupRow;

