import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './root-reducer';
import rootSaga, { effects } from './root-sagas';

function isEffect(type) {
  if (!type || typeof type !== 'string') return false;
  return !!effects[type];
}

function promiseMiddleware() {
  return next => action => {
    const { type } = action;
    if (isEffect(type)) {
      return new Promise((resolve, reject) => {
        next({
          __promise_resolve: resolve,
          __promise_reject: reject,
          ...action,
        });
      });
    }
    return next(action);
  };
}

let composeEnhancers = compose;
if (
  process.env.NODE_ENV !== 'production' &&
  typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

export default initialState => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [promiseMiddleware, sagaMiddleware];
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware)),
  );
  sagaMiddleware.run(rootSaga);
  return store;
};
