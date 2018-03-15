import React from 'react';
import { Popconfirm, Tooltip } from 'antd';
import RoleNameTag from './RoleNameTag';

const UserTableRow = (props) => {
  const {id, firstName, lastName, email, roles} = props.user;
  return(
    <tr>
      <td>{ firstName+' '+lastName } </td>
      <td> { email } </td>
      <td>  
        { 
            roles.map((item, i)=>{
              return(
                <RoleNameTag key={i} name={item.name} data_id={''} href="#" id={''} />     
              )
            })  
        }
      </td>
      <td>
          <i className="fa fa-pencil  " onClick = {()=>props.openUserEditModal(event, props.user)} />&nbsp;&nbsp;&nbsp;&nbsp;
          <Popconfirm title="Are you sure to delete the user?" onConfirm={ (events)=>props.confirm(event) } onCancel={(event)=>props.cancel(event)} okText="Yes" cancelText="No">
            <i className="fa fa-trash" data-userid={props.user._id}  onClick={(event)=>props.deleteUser(event)}/>
          </Popconfirm>
      </td>
    </tr>
  )
}


export default UserTableRow;

/*
<Popconfirm title="Are you sure to delete the user?" onConfirm={ (events)=>props.confirmRoleDelete(event) } onCancel={(event)=>props.cancelRoleDelete(event)} okText="Yes" cancelText="No">
                    <Tooltip title="Remove this Role" placement="right">
                      <i data-userid={id} data-roleid={item.id} onClick={(event)=>props.deleteRole(event)} className="fa fa-close delete-perm" />
                    </Tooltip>
                  </Popconfirm>
*/