import React, {Component}  from 'react';
import { Popconfirm, Tooltip } from 'antd';


const EditClientModal = (props) => {
    let {id, name, redirectUrl} = props.client;
    return(
        <div className={"modal-container show "}>
            <div className="backdrop"></div>
            <div className="modal-dialog">
                <div className={ "modal" } style={{'width': '740px'}}>
                    
                
                    <i className="fa fa-close close-modal-icon" onClick={props.closeEditClientModal}/>
                    <div className="modal-header"><h3 className="modal-title">Edit Role</h3><hr className="hr"/></div>
                    <div className="modal-body">
                    
                    <div className="row top-margin10">
                        <div className="col-md-6">
                            <div>
                                <div>Client Name</div>
                                <input type="text" id="cname" name="name" value={name} placeholder="Client Name" onChange={(event)=>props.inputEditClientChangeHandler(event)} className="form-control required"/>
                            </div>
                            <div>
                                <div>Redirect URI</div>
                                <input type="text" id="redirectUrl" name="redirectUrl" value={redirectUrl} placeholder="Redirect url" onChange={(event)=>props.inputEditClientChangeHandler(event)} className="form-control required"/>
                            </div>
                            <div className="top-margin10 row">
                                <div className="col-md-6">
                                    <div>Access Token Life Time</div>
                                    <input type="number" id="at_h" style={{'width':'70px'}} min="0" name="AccessTokenLifeTime_hh" placeholder="hh" onChange={(event)=>props.inputEditClientChangeHandler(event)} className="form-control-no-width required"/>
                                    &nbsp;<input type="number" id="at_m" style={{'width':'70px'}} min="0" name="AccessTokenLifeTime_mm" placeholder="mm" onChange={(event)=>props.inputEditClientChangeHandler(event)} className="form-control-no-width required"/>
                                </div>
                                <div className="col-md-6 ">
                                    <div>Refresh Toke Life Time</div>
                                    <input type="number" id="rt_h" style={{'width':'70px'}} min="0" name="refreshTokenLifeTime_hh" placeholder="hh" onChange={(event)=>props.inputEditClientChangeHandler(event)} className="form-control-no-width required"/>
                                    &nbsp;<input type="number" id="rt_m" style={{'width':'70px'}} min="0" name="refreshTokenLifeTime_mm" placeholder="mm" onChange={(event)=>props.inputEditClientChangeHandler(event)} className="form-control-no-width required"/>                    
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div>Description</div>
                            <textarea name="description" id="desc" style={{"height": "120px"}} className="form-control required" placeholder="Description" onChange={(event)=>props.inputEditClientChangeHandler(event)}></textarea>
                        </div>    
                    </div>

            

                    </div>
                    <div className="modal-footer">
                        <hr className="hr"/>
                        <button className="btn btn-success pull-right" onClick={props.updateClientForm}>Update</button>
                    </div>
                </div>
                
            </div>
        </div> 
    )

}

export default EditClientModal;
