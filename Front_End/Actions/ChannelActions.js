import { clientId } from '../../private/twitch.clientid.js';
import axios from 'axios';

// Create constants for User Actions
export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL'
export const RECEIVE_CHANNEL_FOLLOWS = 'RECEIVE_CHANNEL_FOLLOWS'
export const RECEIVE_CHANNEL_VIDEOS = 'RECEIVE_CHANNEL_VIDEOS'

// Action Creators
const receiveChannel = channel => ({ type: RECEIVE_CHANNEL, channel});
const receiveChannelFollows = channelFollows => ({ type: RECEIVE_CHANNEL_FOLLOWS, channelFollows })
const receiveChannelVideos = channelVideos => ({ type: RECEIVE_CHANNEL_VIDEOS, channelVideos })

//Thunk Creators
export const receiveChannelFromApi = (channel, callback) => dispatch => {
    //Receive info from the Api
    axios.get(`https://api.twitch.tv/kraken/channels/${channel}`, {
        headers: {
            [`Client-ID`]: clientId,
            Accept: `application/vnd.twitchtv.v3+json`,
            [`x-api-version`]: 3
        }
    })
        .then(res => {
                dispatch(receiveChannel(res.data));
                callback && callback(res.data.name);
            })
        .catch(err => console.error(`Receiving user: ${channel} unsuccessful`, err));
}

export const receiveChannelFollowsFromApi = (channel, callback) => dispatch => {
    // Receive follows from the Api
    axios.get(`https://api.twitch.tv/kraken/channels/${channel}/follows?limit=100`, {
        headers: {
            [`Client-ID`]: clientId,
            Accept: `application/vnd.twitchtv.v3+json`,
            [`x-api-version`]: 3
        }
    })
        .then(res => {
                dispatch(receiveChannelFollows(res.data));
                callback && callback(`${res.data.name}/follows`);
            })
        .catch(err => console.error(`Receiving follows from channel: ${channel} unsuccessful`, err));
}

export const receiveChannelVideosFromApi = (channel, callback) => dispatch => {
    // Receive videos from the Api
    axios.get(`https://api.twitch.tv/kraken/channels/${channel}/videos?limit=100`, {
        headers: {
            [`Client-ID`]: clientId,
            Accept: `application/vnd.twitchtv.v3+json`,
            [`x-api-version`]: 3
        }
    })
        .then(res => {
                dispatch(receiveChannelVideos(res.data));
                callback && callback(`${res.data.name}/videos`);
            })
        .catch(err => console.error(`Receiving videos from channel: ${channel} unsuccessful`, err));
}