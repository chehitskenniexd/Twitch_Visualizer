import { clientId } from '../../private/twitch.clientid.js';
import axios from 'axios';

// Create constants for User Actions
export const RECEIVE_USER = 'RECEIVE_USER'

// Action Creators
const receiveUser = user => ({ type: RECEIVE_USER, user});

//Thunk Creators
export const receiveUserFromApi = (user, callback) => dispatch => {
    //Receive info from the Api
    axios.get(`https://api.twitch.tv/kraken/channels/${user}`, {
        headers: {
            [`Client-ID`]: clientId,
            Accept: `application/vnd.twitchtv.v3+json`,
            [`x-api-version`]: 3
        }
    })
        .then(res => {
                console.log(res.data);
                dispatch(receiveUser(res.data));
                callback(res.data.name);
            })
        .catch(err => console.error(`Receiving user: ${user} unsuccessful`, err));
}