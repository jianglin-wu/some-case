import { delay } from '@/components/utils';

const namespace = 'counter';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const INCREMENT_ASYNC = 'INCREMENT_ASYNC';
const DECREMENT_ASYNC = 'DECREMENT_ASYNC';

export const actionCreators = {
  namespace,
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

export default {
  namespace,

  state: 0,

  reducers: {
    [INCREMENT](state) {
      return state + 1;
    },
    [DECREMENT](state) {
      return state - 1;
    },
  },

  effects: {
    *[INCREMENT_ASYNC](_, { call, put }) {
      yield call(delay, 1000);
      yield put(actionCreators.increment());
    },
    *[DECREMENT_ASYNC](_, { call, put }) {
      yield call(delay, 1000);
      yield put(actionCreators.decrement());
    },
  },
};
