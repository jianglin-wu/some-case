import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BasicLayout from '@/layouts/BasicLayout';
import stylesCommon from '@/components/styles';
import Counter from '@/components/Counter';
import { actionCreators } from '@/store/counter';

@BasicLayout({ title: 'Saga' })
@connect(
  ({ counter, loading: { INCREMENT_ASYNC, DECREMENT_ASYNC } }) => ({
    counter,
    loadingIncrement: INCREMENT_ASYNC,
    loadingDecrement: DECREMENT_ASYNC,
  }),
  dispatch => ({ actions: bindActionCreators(actionCreators, dispatch) }),
)
class StoreDemo extends React.Component {
  render() {
    const { counter, actions, loadingIncrement, loadingDecrement } = this.props;
    return (
      <Counter
        className={stylesCommon.container}
        count={counter}
        onIncrement={actions.incrementAsync}
        onDecrement={actions.decrementAsync}
        loadingIncrement={loadingIncrement}
        loadingDecrement={loadingDecrement}
      />
    );
  }
}

export default StoreDemo;
