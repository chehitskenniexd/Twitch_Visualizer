'use strict'

import { connect } from 'react-redux';
import NavbarComponent from '../Components/NavbarComponent';
import { receiveUserFromApi } from '../Actions/UserActions';
import { browserHistory } from 'react-router'

const mapStateToProps = (state, ownProps) => null

const callback = user => { browserHistory.push('/${user}') }
const mapDispatchToProps =  (dispatch, ownProps) => {}

export default connect(() => ({}), {})(NavbarComponent);