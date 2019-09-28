import { take } from 'redux-saga/effects';
import { onEffect } from './loading';
import { effects as effectsCounter } from './counter';

const effects = { ...effectsCounter };

export default function* rootSaga() {
  while (true) {
    const action = yield take('*');
    const effect = effects[action.type];
    if (effect) {
      yield onEffect(effect, action.type);
    }
  }
}
