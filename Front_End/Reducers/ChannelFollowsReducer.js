'use strict'

import { RECEIVE_CHANNEL_FOLLOWS } from '../Actions/ChannelActions';

// Reducer for Channel Follows
export default function channelFollowsReducer(prevState = null, action) {
    switch (action.type) {
        case RECEIVE_CHANNEL_FOLLOWS: return action.channelFollows;
        default: return prevState;
    }
} 