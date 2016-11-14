import { clientId } from '../../private/twitch.clientid.js';
import axios from 'axios';
import { generateAxiosGetPromise } from '../../Utilities/axiosUtils';

// Create constants for User Actions
export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL'
export const RECEIVE_CHANNEL_FOLLOWS = 'RECEIVE_CHANNEL_FOLLOWS'
export const RECEIVE_CHANNEL_VIDEOS = 'RECEIVE_CHANNEL_VIDEOS'

// Action Creators
const receiveChannel = channel => ({ type: RECEIVE_CHANNEL, channel});
const receiveChannelFollows = channelFollows => ({ type: RECEIVE_CHANNEL_FOLLOWS, channelFollows })
const receiveChannelVideos = channelVideos => ({ type: RECEIVE_CHANNEL_VIDEOS, channelVideos })

//Thunk Creators
export const receiveInfoFromApi = (channel, callback) => dispatch => {
    axios.get(`/api/channels/${channel}`)
        .then(res => {
            console.log(res.data);
            dispatch(receiveChannel(res.data.channel));
            dispatch(receiveChannelFollows(res.data.follows));
            dispatch(receiveChannelVideos(res.data.videos));            
            callback && callback(`${res.data.channel.name}`);
        })
}