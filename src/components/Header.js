import React from 'react';

const Header = () => (
  <div className="top-header-container row">
    <div className="pull-left page-level-txt"><b>Users</b> - All Users at glance</div>
    <div className="pull-right logout-dropdown">
      <span className="dropdown-txt"><span>rajeeev@sdf.com</span> <i className="fa fa-angle-down" aria-hidden="true"></i>
        <div className="dropdown-bx">
          <i className="fa fa-sign-out"></i>
          &nbsp; Logout
        </div>
      </span>
    </div>
    <div className="clearfix"></div>
  </div>
)

export default Header;
//<li><Link to='/'>Home</Link></li>
