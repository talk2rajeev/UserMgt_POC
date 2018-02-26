//NavLinkItem.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';

const NavLinkItem = (props) => {
    console.log('props: ', props);
    return (
        <NavLink to={props.path} exact className={props.componentClass} >
            <div className="icon-text-link-wrapper" >
                <div className="text-center"><i className={props.icon} aria-hidden="true"></i></div>
                <div className="text-center"><span className="left-menu-link" href="#">{props.linkTitle}</span></div>
            </div>
        </NavLink>
    )
}

export default NavLinkItem;
