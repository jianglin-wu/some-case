import { put } from 'redux-saga/effects';

const LOADING_SHOW = 'LOADING_SHOW';
const LOADING_HIDE = 'LOADING_HIDE';
const initialState = { global: false };

export const reducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case LOADING_SHOW:
      return { ...state, global: true, [payload.actionType]: true };
    case LOADING_HIDE:
      return { ...state, global: false, [payload.actionType]: false };
    default:
      return state;
  }
};

export function* onEffect(effect, actionType) {
  yield put({ type: LOADING_SHOW, payload: { actionType } });
  yield effect();
  yield put({ type: LOADING_HIDE, payload: { actionType } });
}
