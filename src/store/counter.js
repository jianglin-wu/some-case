const incrementType = 'INCREMENT';
const decrementType = 'DECREMENT';

export const actionCreators = {
  increment: () => ({
    type: incrementType,
  }),
  decrement: () => ({
    type: decrementType,
  }),
};

export default (state = 0, action) => {
  switch (action.type) {
    case incrementType:
      return state + 1;
    case decrementType:
      return state - 1;
    default:
      return state;
  }
};
