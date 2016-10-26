'use strict'

import { connect } from 'react-redux';
import HomeComponent from '../Components/HomeComponent'
import { receiveUserFromApi } from '../Actions/UserActions';
import { browserHistory } from 'react-router'

// This callback causes the react-router to link to another path
const callback = user => { browserHistory.push('/${user}') }
const mapDispatchToProps =  (dispatch, ownProps) => ({
    onSearchSubmit: (user) => dispatch(receiveUserFromApi(user, callback))
})

export default connect(() => ({}), mapDispatchToProps)(HomeComponent);