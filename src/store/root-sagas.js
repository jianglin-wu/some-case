import { takeEvery } from 'redux-saga/effects';
import { onEffect } from './loading';
import { effects as effectsCounter } from './counter';

const effects = {
  ...effectsCounter,
};

export default function* rootSaga() {
  yield takeEvery('*', function* every(action) {
    const effect = effects[action.type];
    if (effect) {
      yield onEffect(effect, action.type);
    }
  });
}
