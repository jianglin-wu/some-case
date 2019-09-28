import { put, call } from 'redux-saga/effects';
import { delay } from '@/components/utils';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const INCREMENT_ASYNC = 'INCREMENT_ASYNC';
const DECREMENT_ASYNC = 'DECREMENT_ASYNC';

export const actionCreators = {
  increment: () => ({
    type: INCREMENT,
  }),
  decrement: () => ({
    type: DECREMENT,
  }),
  incrementAsync: () => ({
    type: INCREMENT_ASYNC,
  }),
  decrementAsync: () => ({
    type: DECREMENT_ASYNC,
  }),
};

export const reducer = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

export const effects = {
  *[INCREMENT_ASYNC]() {
    yield call(delay, 1000);
    yield put(actionCreators.increment());
  },
  *[DECREMENT_ASYNC]() {
    yield call(delay, 1000);
    yield put(actionCreators.decrement());
  },
};
