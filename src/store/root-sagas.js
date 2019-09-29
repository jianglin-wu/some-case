import { all, takeEvery, call } from 'redux-saga/effects';
import { onEffect } from './loading';
import { effects as effectsCounter } from './counter';
import { effects as effectsPosts } from './posts';
import { noop } from '@/components/utils';

export const effects = {
  ...effectsCounter,
  ...effectsPosts,
};

const effectKeys = Object.keys(effects);
// eslint-disable-next-line require-yield
export default function* rootSaga() {
  const allEffect = effectKeys.map(function* everySaga(effectKey) {
    const effect = effects[effectKey];
    yield takeEvery(effectKey, function* sagaWithCatch({
      __promise_resolve: resolve = noop,
      __promise_reject: reject = noop,
      ...action
    }) {
      try {
        const res = yield call(onEffect, effect, action.type);
        resolve(res);
      } catch (e) {
        reject(e);
      }
    });
  });
  yield all(allEffect);
}
