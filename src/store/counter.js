import { put, call, takeLatest } from 'redux-saga/effects';
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

function* incrementAsync() {
  yield call(delay, 1000);
  yield put(actionCreators.increment());
}

function* decrementAsync() {
  yield call(delay, 1000);
  yield put(actionCreators.decrement());
}

export function* saga() {
  yield takeLatest('INCREMENT_ASYNC', incrementAsync);
  yield takeLatest('DECREMENT_ASYNC', decrementAsync);
}
