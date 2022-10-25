import {combineReducers} from '@reduxjs/toolkit';
import authenticationReducer from './authentication';
import systemReducer from './system';
import foodReducer from './food';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  system: systemReducer,
  food: foodReducer,
});

export default rootReducer;
