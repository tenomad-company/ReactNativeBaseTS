import {combineReducers} from '@reduxjs/toolkit';
import authenticationReducer from './authentication';
import systemReducer from './system';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  system: systemReducer,
});

export default rootReducer;
