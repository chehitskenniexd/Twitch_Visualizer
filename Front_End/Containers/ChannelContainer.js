'use strict'

import { connect } from 'react-redux';
import ChannelComponent from '../Components/ChannelComponent';
import { browserHistory } from 'react-router';
import { receiveChannelFromApi, receiveChannelFollowsFromApi, 
    receiveChannelVideosFromApi, receiveInfoFromApi} from '../Actions/ChannelActions';

const mapStateToProps = (state, ownProps) => ({
    channel: state.channel,
    channelFollows: state.channelFollows,
    channelVideos: state.channelVideos
});

const callback = name => browserHistory.push(`/${name}`);
const mapDispatchToProps =  (dispatch, ownProps) => ({
    onLoadSearch: (channel) => dispatch(receiveChannelFromApi(channel, callback)),
    onLoadSearchFollows: (channel) => dispatch(receiveChannelFollowsFromApi(channel)),
    onLoadSearchVideos: (channel) => dispatch(receiveChannelVideosFromApi(channel)),
    onLoadChannelInfo: (channel) => dispatch(receiveInfoFromApi(channel))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelComponent);
