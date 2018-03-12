import React from 'react';

const CreateClientForm = (props) => {
 return(
   <div>
       <div className="row top-margin10">
           <div className="col-md-8">
                <div className="top-margin15">
                    <input type="text" id="cname" name="name" placeholder="Client Name" onChange={(event)=>props.inputChangeHandler(event)} className="form-control required"/>
                </div>
                <div className="top-margin15">
                    <input type="text" id="redirectUrl" name="redirectUrl" placeholder="Redirect url" onChange={(event)=>props.inputChangeHandler(event)} className="form-control required"/>
                </div>
                <div className="top-margin15">
                    <input type="text" id="logoutUrl" name="logoutURI" placeholder="logout url" onChange={(event)=>props.inputChangeHandler(event)} className="form-control required"/>
                </div>
                <div className="top-margin10 row">
                    <div className="col-md-6">
                        <div>Access Token Life Time</div>
                        <input type="number" id="at_h" style={{'width':'70px'}} min="0" name="AccessTokenLifeTime_hh" placeholder="hh" onChange={(event)=>props.inputChangeHandler(event)} className="form-control-no-width required"/>
                        &nbsp;<input type="number" id="at_m" style={{'width':'70px'}} min="0" name="AccessTokenLifeTime_mm" placeholder="mm" onChange={(event)=>props.inputChangeHandler(event)} className="form-control-no-width required"/>
                    </div>
                </div>
                <div className="top-margin10 row">    
                    <div className="col-md-6 ">
                        <div>Refresh Toke Life Time</div>
                        <input type="number" id="rt_h" style={{'width':'70px'}} min="0" name="refreshTokenLifeTime_hh" placeholder="hh" onChange={(event)=>props.inputChangeHandler(event)} className="form-control-no-width required"/>
                        &nbsp;<input type="number" id="rt_m" style={{'width':'70px'}} min="0" name="refreshTokenLifeTime_mm" placeholder="mm" onChange={(event)=>props.inputChangeHandler(event)} className="form-control-no-width required"/>                    
                    </div>
                </div>
                <div className="top-margin10">
                    <textarea name="description" id="desc" style={{"height": "120px"}} className="form-control required" placeholder="Description" onChange={(event)=>props.inputChangeHandler(event)}></textarea>
                </div>
                <div className="align-right top-margin10">
                    <button className="btn btn-sm btn-default" onClick={props.closeCreateClientBox}>Cancel</button> &nbsp;
                    <button className="btn btn-sm btn-primary" onClick={props.submitUserForm}>Submit</button>
                </div>
           </div>
        </div>
   </div>    
 )
}


export default CreateClientForm;