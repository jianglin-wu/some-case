import request from '@/components/utils/request';

function getPosts() {
  return request('/posts');
}

const namespace = 'posts';

const POST_SET = 'POST_SET';
const POST_FETCH = 'POST_FETCH';

export const actionCreators = {
  namespace,
  postSet: data => ({
    type: POST_SET,
    payload: data,
  }),
  postFetch: () => ({
    type: POST_FETCH,
  }),
};

export default {
  namespace,

  state: {
    list: null,
  },

  reducers: {
    [POST_SET](state, { payload }) {
      return {
        ...state,
        list: payload,
      };
    },
  },

  effects: {
    *[POST_FETCH](_, { call, put }) {
      const resData = yield call(getPosts);
      if (resData && resData.code === 200) {
        yield put(actionCreators.postSet(resData.data));
        return resData.data;
      }
      return null;
    },
  },
};
