'use strict'

import { connect } from 'react-redux';
import UserComponent from '../Components/UserComponent';
import { browserHistory } from 'react-router';
import { receiveUserFromApi } from '../Actions/UserActions';

const mapStateToProps = (state, ownProps) => ({
    currentUser: state.user
});

const callback = name => browserHistory.push(`/${name}`);
const mapDispatchToProps =  (dispatch, ownProps) => ({
    onLoadSearch: (user) => dispatch(receiveUserFromApi(user, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserComponent);
