'use strict'

import { connect } from 'react-redux';
import SearchComponent from '../Components/SearchComponent'
import { receiveUserFromApi } from '../Actions/UserActions';
import { browserHistory } from 'react-router'

// This callback causes the react-router to link to another path
const callback = name => browserHistory.push(`/${name}`);
const mapDispatchToProps =  (dispatch, ownProps) => ({
    onSearchSubmit: (user) => dispatch(receiveUserFromApi(user, callback))
})

export default connect(() => ({}), mapDispatchToProps)(SearchComponent);