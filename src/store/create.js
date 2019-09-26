import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './index';

const middleware = [];

let composeEnhancers = compose;
if (
  process.env.NODE_ENV !== 'production' &&
  typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

export default initialState =>
  createStore(reducer, initialState, composeEnhancers(applyMiddleware(...middleware)));
