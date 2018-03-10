import React, {Component}  from 'react';
import { Popconfirm, Tooltip } from 'antd';
import AutoSuggestion from './AutoSuggestion';
import SelectTags from './SelectTags';

const rolearr = (roles) => {
    //debugger
    let role = roles.map((item)=>{
        return item.name;
    });
    return role;
}

const CreateUserForm = (props) => {
  
    return(
        <div className="create-user-container">
            <div className="create-user-box">
                <i className="fa fa-close cancel-create-user-icn" onClick={props.closeCreateUserBox}/>    
                <h5 className="heading">Create New User</h5>
                <hr className="hr"/> 

                <div className="row top-margin10">
                    <div className="col-md-6">
                        <input type="text" name="fname" placeholder="First Name" onChange={(event)=>props.inputChangeHandler(event)} className="form-control required"/>
                    </div>
                    <div className="col-md-6">
                        <input type="text" name="lname" placeholder="Last Name" onChange={(event)=>props.inputChangeHandler(event)} className="form-control required"/>
                    </div>    
                </div>
                <div className="clearfix top-margin10">
                    <div className="">
                        <input type="email" name="email" placeholder="Email: someone@domain.com" onChange={(event)=>props.inputChangeHandler(event)} className="form-control required"/>
                    </div>
                </div>
                <div className="clearfix top-margin10">
                    <div className="">
                        <input type="number" name="phone" placeholder="Contact Number" onChange={(event)=>props.inputChangeHandler(event)} className="form-control required"/>
                    </div>
                </div>
                <div className="clearfix top-margin10">
                    <div className="">
                        <SelectTags placeholder="Please select Roles" data={props.roles} defaultData={[]} handleChange={props.handleChange} />
                        
                    </div>
                </div>

                <div className="clearfix top-margin10">
                    <div className="align-right text-alert"><span>Email field is mandatory.</span></div>
                    <div className="">
                        <button className="btn btn-sm btn-primary" onClick={(event)=>props.submitUserForm(event)}>Submit</button>
                    </div>
                </div>
                
            </div>
        </div>
    )

}

export default CreateUserForm;

//<AutoSuggestion placeholder="Select Roles" data={rolearr(props.roles)}  selectRole={props.selectRole} olddata={props.roles} />
