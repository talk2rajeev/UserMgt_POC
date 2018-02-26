import React from 'react';
import { Popconfirm, message } from 'antd';


const UserGroupRow = (props) => (
  <tr>
    <td>
      <div className="userGroup-name-container" onClick={(ug) => props.editUser(props.usergroups)} >
        <span  className="userGroup-name">{props.usergroups.name} 
         
        </span>

      </div>
    </td>
    <td>
      {
        props.usergroups.role.map((val, j) => {
          return (
            <Popconfirm key={'pid' + j} title="Are you sure delete this task?" onConfirm={(event) => { this.confirm(event) }} onCancel={(event) => { this.cancel(event) }} okText="Yes" cancelText="No">
              <span data-id={val[j]} href="#" id={val[j]} className="delete-perm-badge">
                {val?val.name:""} &nbsp;
                <i title="remove permission" className="fa fa-close delete-perm" onClick={(event, val) => { this.setDataId(event, val) }} />
              </span>
            </Popconfirm>
          )
        })
      }
    </td>
    <td>
      <i className="fa fa-pencil  hand-pointer"  onClick={(ug) => props.editUser(props.usergroups)} />&nbsp;&nbsp;&nbsp;&nbsp;
      <i className="fa fa-trash  " onClick={() => props.removeUserGroup(props.usergroups._id, props.index)} />
    </td>
  </tr>
)

export default UserGroupRow;

