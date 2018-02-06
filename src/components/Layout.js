import React from 'react';
import Header from './Header';
import SideBarMenu from './SideBarMenu.jsx';

const Layout = (props) => {
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-1 col-md-1 col-sm-1 left-menu-container">
                    <SideBarMenu />
                </div>
                <div className="col-lg-11 col-md-11 col-sm-11">
                    <Header />
                    <div className="page-content">
                        {props.children}
                    </div>    
                </div>
            </div>
        </div>
    )
}

export default Layout;
