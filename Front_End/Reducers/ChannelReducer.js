'use strict'

import { RECEIVE_CHANNEL } from '../Actions/ChannelActions';

// Reducer for User
export default function userReducer (prevState = {}, action) {
    switch(action.type){
        case RECEIVE_CHANNEL: return action.channel;
        default: return prevState;
    }
}