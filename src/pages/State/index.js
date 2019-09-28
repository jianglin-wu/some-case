import React from 'react';
import BasicLayout from '@/layouts/BasicLayout';
import stylesCommon from '@/components/styles';
import Counter from '@/components/Counter';

@BasicLayout({ title: 'State' })
class StateDemo extends React.Component {
  state = {
    count: 0,
  };

  onIncrement = () => {
    this.setState(state => {
      return {
        count: state.count + 1,
      };
    });
  };

  onDecrement = () => {
    this.setState(state => {
      return {
        count: state.count - 1,
      };
    });
  };

  render() {
    const { count } = this.state;
    return (
      <Counter
        className={stylesCommon.container}
        count={count}
        onIncrement={this.onIncrement}
        onDecrement={this.onDecrement}
      />
    );
  }
}

export default StateDemo;
