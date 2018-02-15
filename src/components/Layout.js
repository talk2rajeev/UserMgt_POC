import React, {Component}  from 'react';
import Header from './Header';
import SideBarMenu from './SideBarMenu.jsx';

class Layout extends Component {
    render(){
        
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-1 col-md-1 col-sm-1 left-menu-container">
                        <SideBarMenu />
                    </div>
                    <div className="col-lg-11 col-md-11 col-sm-11">
                        <Header pageHeaderTitle={this.props.location.pathname}/>
                        <div className="page-content">
                            {this.props.children}
                        </div>    
                    </div>
                </div>
            </div>
        ) 
    }  
}

export default Layout;
