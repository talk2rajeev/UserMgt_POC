import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import NavLinkItem from './NavLinkItem.jsx';

//<Link to='/'>Home</Link>
const SideBarMenu = (props) => (
    <div>
        <div>
            <div className="row">
                <div className="logo_n_title">
                    <div className="text-center"><i className="logo fa fa-users fa-2x" aria-hidden="true"></i></div>
                    <div className="text-center"><span className="app-title">User Management</span></div>
                </div>
                <hr />
            </div>
            <div className="row">
                
                <NavLinkItem path="/" componentClass="sidebar-navLink" icon="fa fa-address-card-o" linkTitle="Users"/>
                <NavLinkItem path="/usergroup" componentClass="sidebar-navLink" icon="fa fa-users" linkTitle="User Group"/>
                <NavLinkItem path="/roles" componentClass="sidebar-navLink" icon="fa fa-tasks" linkTitle="Roles"/>
                <NavLinkItem path="/permission" componentClass="sidebar-navLink" icon="fa fa-check-circle" linkTitle="Permissions"/>
                  
            </div>
        </div> 
    </div>
)

export default SideBarMenu;

