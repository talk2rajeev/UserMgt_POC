import React from 'react';

const TopHeader = () => {
  return(
  <div className="top-header row">
    <div className="col-md-12 col-sm-12">
      <h3 className="pull-left">
        User Management
      </h3>
      <div className="pull-right logout-dropdown">
        <span className="dropdown-txt"><span>rajeeev@sdf.com</span> <i className="fa fa-angle-down" aria-hidden="true"></i>
          <div className="dropdown-bx">
            <i className="fa fa-sign-out"></i>
            &nbsp; Logout
          </div>
        </span>
      </div>
    </div>

  </div>
  )
}

function getPageTitle(path){
  if(path === '/'){
    return <span><b>Login</b> - Please enter your login credential</span>
  }
  if(path === '/users' || '/dashboard'){
    return <span><b>Users</b> - All Users at glance</span>
  }
  if(path === '/usergroup'){
    return <span><b>User Group</b> - All Usergroups at glance</span>
  }
  if(path === '/roles'){
    return <span><b>Roles</b> - All Roles at glance</span>
  }
  if(path === '/permission'){
    return <span><b>Permissions</b> - All permissions at glance</span>
  }
}

const Header = (props) => (
  <div>
    <TopHeader />
    <div className="top-header-container row">
      <div className="pull-left page-level-txt">
          { getPageTitle(props.pageHeaderTitle) }
      </div>
      <div className="clearfix"></div>
    </div>  
  </div>
  
)

export default Header;
//<li><Link to='/'>Home</Link></li>
