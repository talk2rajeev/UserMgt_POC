import React, {Component}  from 'react';

const RoleNameTag = (props) => {
    return(
        <span data-id={props.data_id} href="#" id={props.id} className="delete-perm-badge">
            {props.name} 
        </span>
    )
}
export default RoleNameTag;