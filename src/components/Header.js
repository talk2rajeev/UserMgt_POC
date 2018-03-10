import React from 'react';

const TopHeader = () => {
  return(
  <div className="top-header row">
    <div className="col-md-12 col-sm-12 col-xs-12">
      <h3 className="col-md-10 col-sm-10 col-xs-10 pull-left text-center app-title">
        User Authorization &amp; Management
      </h3>
      <div className="col-md-2 col-sm-2 col-xs-2 pull-right text-right logout-dropdown">
        <span className="dropdown-txt">
          <span className="hidden-sm hidden-xs">user@sony.com</span> <i className="fa fa-angle-down" aria-hidden="true"></i>
          <span className="fa fa-user fa-2x hidden-xl hidden-lg hidden-md" />
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
  if(path === '/users' || path === '  /dashboard'){
    return <span><b>Users</b> - All Users at glance</span>
  }
  if(path === '/client'){
    return <span><b>Clients</b> - All Clients at glance</span>
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
