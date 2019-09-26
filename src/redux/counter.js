const incrementType = 'INCREMENT';
const decrementType = 'DECREMENT';

export const incrementAction = () => ({
  type: incrementType,
});
export const decrementAction = () => ({
  type: decrementType,
});

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
