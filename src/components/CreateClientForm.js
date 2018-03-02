import React from 'react';

const CreateClientForm = (props) => {
  return(
    <div>
        <div className="row top-margin10">
            <div className="col-md-6">
                <div>
                    <div>Client Name</div>
                    <input type="text" name="name" placeholder="Client Name" onChange={(event)=>props.inputChangeHandler(event)} className="form-control required"/>
                </div>
                <div>
                    <div>Redirect URI</div>
                    <input type="text" name="redirectUri" placeholder="Client Name" onChange={(event)=>props.inputChangeHandler(event)} className="form-control required"/>
                </div>
                <div className="top-margin10 row">
                    <div className="col-md-6">
                        <div>Access Token Life Time</div>
                        <input type="number" style={{'width':'70px'}} name="AccessTokenLifeTime_hh" placeholder="hh" onChange={(event)=>props.inputChangeHandler(event)} className="form-control-no-width required"/>
                        &nbsp;<input type="number" style={{'width':'70px'}} name="AccessTokenLifeTime_mm" placeholder="mm" onChange={(event)=>props.inputChangeHandler(event)} className="form-control-no-width required"/>
                    </div>
                    <div className="col-md-6 ">
                        <div>Refresh Toke Life Time</div>
                        <input type="number" style={{'width':'70px'}} name="refreshTokenLifeTime_hh" placeholder="hh" onChange={(event)=>props.inputChangeHandler(event)} className="form-control-no-width required"/>
                        &nbsp;<input type="number" style={{'width':'70px'}} name="refreshTokenLifeTime_mm" placeholder="mm" onChange={(event)=>props.inputChangeHandler(event)} className="form-control-no-width required"/>                    
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div>Description</div>
                <textarea name="description" style={{"height": "120px"}} className="form-control required" placeholder="Description" onChange={(event)=>props.inputChangeHandler(event)}></textarea>
                <div className="align-right top-margin10">
                    <button className="btn btn-sm btn-primary" onClick={(event)=>this.submitUserForm(event)}>Submit</button>
                </div>
            </div>    
            </div>

            <div className="clearfix col-md-8 top-margin10">
            
        </div>
    </div>    
  )
}


export default CreateClientForm;
