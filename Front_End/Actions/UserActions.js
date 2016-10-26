import { clientId } from '../../private/twitch.clientid.js'

// Create constants for User Actions
export const RECEIVE_USER = 'RECEIVE_USER'

// Action Creators
const receiveUser = user => ({ type: RECEIVE_USER, user});

//Thunk Creators
export const receiverUserFromApi = (user) => dispatch => {
    //Receive info from the Api
    axios.get(`https://api.twitch.tv/kraken/channels/${user}`, {
        headers: {
            [Client-ID]: clientId,
            Accept: `application/vnd.twitchtv.v3+json`,
            [x-api-version]: 3
        }
    })
        .then(res => res(dispatch(receiveUser(res.data))))
        .catch(err => console.error(`Receiving user: ${user} unsuccessful`, err));
}
