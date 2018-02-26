import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , HashRouter } from 'react-router-dom';

import {Provider} from 'react-redux';
import store from './store/store';

import Header from './components/Header';
import Routes from './Routes';

import './index.scss';    



ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Routes /> 
        </HashRouter>
    </Provider>,
    document.getElementById('main'));