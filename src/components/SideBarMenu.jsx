import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import NavLinkItem from './NavLinkItem.jsx';

//<Link to='/'>Home</Link>
const SideBarMenu = (props) => (
    <div>
        <div>
            <div className="row">
                <div className="logo_n_title hidden-xs hidden-sm">  
                    <div className="text-center"><span className="app-title">User Management</span></div>
                </div>
                <NavLinkItem path="/users" componentClass="sidebar-navLink " icon="fa fa-address-card-o" linkTitle="Users"/>
                <NavLinkItem path="/usergroup" componentClass="sidebar-navLink " icon="fa fa-users" linkTitle="User Group"/>

                <div className="logo_n_title  hidden-xs hidden-sm top-margin25">  
                    <div className="text-center"><span className="app-title">Client Management</span></div>
                </div>
                <NavLinkItem path="/client" componentClass="sidebar-navLink  " icon="fa fa-male" linkTitle="Clients"/>
                <NavLinkItem path="/permission" componentClass="sidebar-navLink " icon="fa fa-check-circle" linkTitle="Permissions"/>   
                <NavLinkItem path="/roles" componentClass="sidebar-navLink  " icon="fa fa-tasks" linkTitle="Roles"/>
            </div>

            <div className="row">
                <hr className="hr hidden-xl hidden-lg hidden-md" style={{'margin': '0px'}}/>
            </div>

        </div> 
    </div>
)

export default SideBarMenu;

//<div className="text-center"><i className="logo fa fa-users fa-2x" aria-hidden="true"></i></div>
