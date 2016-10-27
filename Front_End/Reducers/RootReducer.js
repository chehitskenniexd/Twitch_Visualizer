'use strict';

import channelReducer from './ChannelReducer';
import channelFollowsReducer from './ChannelFollowsReducer';
import channelVideosReducer from './ChannelVideosReducer';

// Contains the root reducer for the redux store
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    channel: channelReducer,
    channelFollows: channelFollowsReducer,
    channelVideos: channelVideosReducer
});

export default rootReducer;