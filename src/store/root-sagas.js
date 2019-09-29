import { take, fork } from 'redux-saga/effects';
import { onEffect } from './loading';
import { effects as effectsCounter } from './counter';
import { effects as effectsPosts } from './posts';

const effects = {
  ...effectsCounter,
  ...effectsPosts,
};

export default function* rootSaga() {
  while (true) {
    const action = yield take('*');
    const effect = effects[action.type];
    if (effect) {
      yield fork(onEffect, effect, action.type);
    }
  }
}
