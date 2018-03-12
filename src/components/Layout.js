import React, {Component}  from 'react';
import Header from './Header';
import SideBarMenu from './SideBarMenu.jsx';

class Layout extends Component {
    render(){
        
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-1 col-md-1 hidden-xs hidden-sm left-menu-container">
                        <SideBarMenu />
                    </div>
                    <div className="col-lg-11 col-md-11 col-sm-12 col-xs-12">
                        <Header pageHeaderTitle={this.props.location.pathname}/>
                        <div className="visible-xs visible-sm">
                            <SideBarMenu />
                        </div>
                        <div className="page-content top-margin15">
                            {this.props.children}
                        </div>    
                    </div>
                </div>
            </div>
        ) 
    }  
}

export default Layout;
