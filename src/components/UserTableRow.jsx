import React from 'react';

const UserTableRow = (props) => (
  <tr>
    <td>{ props.user.name } </td>
    <td> { props.user.email } </td>
    <td>  { props.user.phone } </td>
    <td>
        <i className="fa fa-pencil  " onClick = {() => props.editUser(props.user.id, props.user)} />&nbsp;&nbsp;&nbsp;&nbsp;
        <i className="fa fa-trash  "  onClick = {() => props.removeUser(props.user.id,props.index)} />
    </td>
  </tr>
)

export default UserTableRow;

