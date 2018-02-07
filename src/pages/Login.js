import React, { Component } from 'react';
import { authenticateUser } from '../store/actions';

const LoginPageTitle = () => {
    return (
        <div className="loginpage-title text-center">
            <div><i  className="fa fa-users fa-3x" /></div>
            <div>User Management</div>
        </div>
    )
}

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {username: '', password: ''};
        this.loginHandler = this.loginHandler.bind(this);
    }

    loginHandler(){
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        // dispatch { username , password } to ACTION for user authentication
        // if user authenticated then navigate to success page
        // else keep user to Login page with a error(login fail) message

        //authenticateUser
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <LoginPageTitle />
                <div className="login-container">
                    <div className="login-box">
                        <div className="form-group">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" ref="username"/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" ref="password"/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success" onClick={this.loginHandler}>Login</button>&nbsp;&nbsp;
                            <a href="#">forgot password ? </a>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}
export default Login;
