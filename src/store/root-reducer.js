import { combineReducers } from 'redux';
import { reducer as loading } from './loading';
import { reducer as counter } from './counter';
import { reducer as posts } from './posts';

const rootReducer = combineReducers({ loading, counter, posts });
export default rootReducer;

export const mapStateToProps = state => {
  return { ...state };
};
