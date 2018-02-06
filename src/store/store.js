import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import allReducers from './reducers';

const store = createStore(
    allReducers,
  applyMiddleware(
    createLogger(),
    thunkMiddleware
  )
);

export default store;