//ClientTable.js
import React, {Component}  from 'react';
import { Popconfirm, Tooltip } from 'antd';


const ClientTable = (props) => {
  
    return(
        <div className="top-margin10">
           <table className="table table-striped" style={{'width':'65%'}}>
                <thead>
                    <tr>
                        <th>Client</th>
                        <th>Redirect Url</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.clients.map((item, key)=>{
                            return(
                                <tr key={key}>
                                    <td>{item.name}</td>
                                    <td>{item.redirectUrl}</td>
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
        </div>
    )

}

export default ClientTable;