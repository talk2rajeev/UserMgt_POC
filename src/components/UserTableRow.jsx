import React from 'react';
import { Popconfirm } from 'antd';

const UserTableRow = (props) => {
  const {id, name, email, phone} = props.user;
  return(
    <tr>
      <td>{ name } </td>
      <td> { email } </td>
      <td>  { phone } </td>
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

