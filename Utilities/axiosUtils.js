'use strict'

import { clientId } from '../private/twitch.clientid.js';
import axios from 'axios';

export function generateAxiosGetPromise(channel, info, queries) {
    let url = `https://api.twitch.tv/kraken/channels/${channel}`;
    if (info) { url += `/${info}`; }
    if (queries) { url += `?${queries}`; }
    return axios.get(url, {
        headers: {
            [`Client-ID`]: clientId,
            Accept: `application/vnd.twitchtv.v3+json`,
            [`x-api-version`]: 3
        }
    })
}