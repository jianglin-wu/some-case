import React from 'react';
import { connect } from 'dva';
import BasicLayout from '@/layouts/BasicLayout';
import stylesCommon from '@/components/styles';
import Counter from '@/components/Counter';
import { bindActionCreators, bindEffects } from '@/components/utils';
import { actionCreators } from '@/models/counter';

const findLoadings = bindEffects(actionCreators);

@BasicLayout({ title: 'Saga' })
@connect(
  ({ counter, loading }) => ({
    counter,
    effectLoadings: findLoadings(loading),
  }),
  dispatch => ({ actions: bindActionCreators(actionCreators, dispatch) }),
)
class StoreDemo extends React.Component {
  render() {
    const { counter, actions = {}, effectLoadings = {} } = this.props;
    console.log(666881);
    return (
      <Counter
        className={stylesCommon.container}
        count={counter}
        onIncrement={actions.incrementAsync}
        onDecrement={actions.decrementAsync}
        loadingIncrement={effectLoadings.incrementAsync}
        loadingDecrement={effectLoadings.decrementAsync}
      />
    );
  }
}

export default StoreDemo;
