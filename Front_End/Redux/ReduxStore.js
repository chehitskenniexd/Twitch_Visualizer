'use strict'

// Contains all the information required for the Redux Store
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../Reducers/RootReducer';

export default createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware, createLogger()
    )
);