import { combineReducers } from 'redux';
import { reducer as counter } from './counter';

const rootReducer = combineReducers({ counter });
export default rootReducer;

export const mapStateToProps = state => {
  return { ...state };
};
