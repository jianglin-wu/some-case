import { combineReducers } from 'redux';
import { reducer as loading } from './loading';
import { reducer as counter } from './counter';

const rootReducer = combineReducers({ counter, loading });
export default rootReducer;

export const mapStateToProps = state => {
  return { ...state };
};
