import { combineReducers } from '@reduxjs/toolkit';
import globalReducer from './slices/global';
import appReducer from './slices/app';

export default combineReducers({
  global: globalReducer,
  app: appReducer,
})
