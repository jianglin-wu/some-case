import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import stylesCommon from '@/components/styles';
import Header from '@/components/Header';
import { incrementAction, decrementAction } from '@/store/counter';

const StoreDemo = ({ counter, onIncrement, onDecrement }) => (
  <Fragment>
    <Header title="Store Demo" />
    <div className={stylesCommon.container}>
      <button onClick={onIncrement}> + </button>
      <span> {counter} </span>
      <button onClick={onDecrement}> - </button>
    </div>
  </Fragment>
);

export default connect(
  ({ counter }) => ({ counter }),
  dispatch => ({
    onIncrement: () => dispatch(incrementAction()),
    onDecrement: () => dispatch(decrementAction()),
  }),
)(StoreDemo);
