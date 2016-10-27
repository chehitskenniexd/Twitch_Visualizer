'use strict'

import { connect } from 'react-redux';
import NavbarComponent from '../Components/NavbarComponent';
import { receiveChannelFromApi } from '../Actions/ChannelActions';
import { browserHistory } from 'react-router'

const mapStateToProps = (state, ownProps) => null

const callback = channel => { browserHistory.push('/${channel}') }
const mapDispatchToProps =  (dispatch, ownProps) => {}

export default connect(() => ({}), {})(NavbarComponent);