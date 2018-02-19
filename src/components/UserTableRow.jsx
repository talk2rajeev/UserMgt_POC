import React from 'react';
import { Popconfirm, Tooltip } from 'antd';

const UserTableRow = (props) => {
  const {id, name, email, phone, roles} = props.user;
  return(
    <tr>
      <td>{ name } </td>
      <td> { email } </td>
      <td>  { phone } </td>
      <td>  
        { 
            roles.map((item, i)=>{
              return(
                <span key={i} className="delete-perm-badge">
                  {item.name} &nbsp; 
                  <Popconfirm title="Are you sure to delete the user?" onConfirm={ (events)=>props.confirmRoleDelete(event) } onCancel={(event)=>props.cancelRoleDelete(event)} okText="Yes" cancelText="No">
                    <Tooltip title="Remove this Role" placement="right">
                      <i data-userid={id} data-roleid={item.id} onClick={(event)=>props.deleteRole(event)} className="fa fa-close delete-perm" />
                    </Tooltip>
                  </Popconfirm>
                </span>
              )
            })  
        }
      </td>
      <td>
          <i className="fa fa-pencil  " onClick = {() => props.editUser(props.user.id, props.user)} />&nbsp;&nbsp;&nbsp;&nbsp;
          <Popconfirm title="Are you sure to delete the user?" onConfirm={ (events)=>props.confirm(event) } onCancel={(event)=>props.cancel(event)} okText="Yes" cancelText="No">
            <i className="fa fa-trash" data-userid={id}  onClick={(event)=>props.deleteUser(event)}/>
          </Popconfirm>
      </td>
    </tr>
  )
}


export default UserTableRow;

