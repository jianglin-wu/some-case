import { put, call } from 'redux-saga/effects';
import request from '@/components/utils/request';

const POST_SET = 'POST_SET';
const POST_FETCH = 'POST_FETCH';
const initialState = { list: [] };

function getPosts() {
  return request('/posts');
}

function setPost(state, payload) {
  return {
    ...state,
    list: payload,
  };
}

export const actionCreators = {
  postSet: data => ({
    type: POST_SET,
    payload: data,
  }),
  postFetch: () => ({
    type: POST_FETCH,
  }),
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_SET:
      return setPost(state, action.payload);
    default:
      return state;
  }
};

export const effects = {
  *[POST_FETCH]() {
    const resData = yield call(getPosts);
    if (resData && resData.code === 200) {
      yield put(actionCreators.postSet(resData.data));
    }
  },
};
