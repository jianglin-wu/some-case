import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import stylesCommon from '@/components/styles';
import Header from '@/components/Header';
import { actionCreators } from '@/store/counter';

const StoreDemo = ({ counter, actions: { increment, decrement } }) => (
  <Fragment>
    <Header title="Store Demo" />
    <div className={stylesCommon.container}>
      <button type="button" onClick={increment}>
        {' '}
        +{' '}
      </button>
      <span> {counter} </span>
      <button type="button" onClick={decrement}>
        {' '}
        -{' '}
      </button>
    </div>
  </Fragment>
);

export default connect(
  ({ counter }) => ({ counter }),
  dispatch => ({ actions: bindActionCreators(actionCreators, dispatch) }),
)(StoreDemo);
