'use strict'

import { connect } from 'react-redux';
import SearchComponent from '../Components/SearchComponent'
import { receiveInfoFromApi } from '../Actions/ChannelActions';
import { browserHistory } from 'react-router'

// This callback causes the react-router to link to another path
const callback = channel => browserHistory.push(`/${channel}`);
const mapDispatchToProps =  (dispatch, ownProps) => ({
    onSearchSubmit: (user) => dispatch(receiveInfoFromApi(user, callback))
})

export default connect(() => ({}), mapDispatchToProps)(SearchComponent);