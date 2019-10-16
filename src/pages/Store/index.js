import React from 'react';
import { connect } from 'dva';
import BasicLayout from '@/layouts/BasicLayout';
import stylesCommon from '@/components/styles';
import Counter from '@/components/Counter';
import { bindActionCreators } from '@/components/utils';
import { actionCreators } from '@/models/counter';

@BasicLayout({ title: 'Store' })
@connect(
  ({ counter }) => ({ counter }),
  dispatch => ({ actions: bindActionCreators(actionCreators, dispatch) }),
)
class StoreDemo extends React.Component {
  render() {
    const { counter, actions } = this.props;
    return (
      <Counter
        className={stylesCommon.container}
        count={counter}
        onIncrement={actions.increment}
        onDecrement={actions.decrement}
      />
    );
  }
}

export default StoreDemo;
