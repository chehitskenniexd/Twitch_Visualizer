'use strict';

import userReducer from './UserReducer';

// Contains the root reducer for the redux store
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    user: userReducer
});

export default rootReducer;