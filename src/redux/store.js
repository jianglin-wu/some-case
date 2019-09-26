import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [];

const store = createStore(reducer, composeEnhancers(applyMiddleware(...middleware)));
export default store;
