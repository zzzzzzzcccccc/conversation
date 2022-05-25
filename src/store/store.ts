import { configureStore, Middleware, Store } from '@reduxjs/toolkit';
import combineReducers from './reducer'

let store: Store;
let middlewares: Middleware[] = [];

if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger');
  middlewares.push(
    createLogger({
      collapsed: true
    })
  )
}

const initializeStore = () => {
  if (!store) {
    store = configureStore({
      reducer: combineReducers,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
      devTools: process.env.NODE_ENV === 'development',
    })
  }

  return store
}

export default initializeStore;
