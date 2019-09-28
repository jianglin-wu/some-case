import { all } from 'redux-saga/effects';
import { saga as counter } from './counter';

// eslint-disable-next-line require-yield
export function* helloSaga() {
  // eslint-disable-next-line no-console
  console.log('Hello Sagas!');
}

export default function* rootSaga() {
  yield all([helloSaga(), counter()]);
}
