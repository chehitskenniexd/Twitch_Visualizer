'use strict'

import { RECEIVE_USER } from '../Actions/UserActions';

// Reducer for User
export default function userReducer (prevState = {}, action) {
    switch(action.type){
        case RECEIVE_USER: {
            return Object.assign({}, prevState, { user: action.user });
        }
        default:
            return prevState;
    }
}