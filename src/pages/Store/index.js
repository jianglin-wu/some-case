import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import stylesCommon from '@/components/styles';
import Header from '@/components/Header';
import { incrementAction, decrementAction } from '@/redux/counter';

class StoreDemo extends React.Component {
  render() {
    const { counter, onIncrement, onDecrement } = this.props;
    return (
      <Fragment>
        <Header title="Store Demo" />
        <div className={stylesCommon.container}>
          <button onClick={onIncrement}> + </button>
          <span> {counter} </span>
          <button onClick={onDecrement}> - </button>
        </div>
      </Fragment>
    );
  }
}

export default connect(
  ({ counter }) => ({ counter }),
  dispatch => ({
    onIncrement: () => dispatch(incrementAction()),
    onDecrement: () => dispatch(decrementAction()),
  }),
)(StoreDemo);
