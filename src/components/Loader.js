import React, {Component}  from 'react';

const Loader = () => {
    return(
        <div className="loader-wrapper">
            <div className="backdrop" />
            <div className="loader">
                <i className="fa fa-spinner fa-spin fa-7x" />
            </div>
        </div>
    )
}

export default Loader;