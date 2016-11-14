'use strict'

import { RECEIVE_CHANNEL_VIDEOS } from '../Actions/ChannelActions';

export default function channelVideosReducer (prevState = null, action){
    switch(action.type){
        case RECEIVE_CHANNEL_VIDEOS: return action.channelVideos;
        default: return prevState;
    }
}