//ClientTable.js
import React, {Component}  from 'react';
import { Popconfirm, Tooltip } from 'antd';


const ClientTable = (props) => {
  
    return(
        
           <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Client Id</th>
                        <th>Client</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.clients.map((item, key)=>{
                            return(
                                <tr key={key}>
                                    <td>{item._id}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <i className="fa fa-pencil" onClick={()=>props.openEditClientModal(item)}/> &nbsp; &nbsp;
                                        <Popconfirm title="Are you sure to delete this Client" onConfirm={(event) => { props.confirmClientDelete(event) }} onCancel={(event) => { props.cancelClientDelete(event) }} okText="Yes" cancelText="No">      
                                            <i onClick={()=>props.setClientId(item._id)} className="fa fa-trash" />
                                        </Popconfirm>
                                    </td>
                                </tr>
                            )              
                        })
                    }
                </tbody>
           </table>
        
    )

}

export default ClientTable;