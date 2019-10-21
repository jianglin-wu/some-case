import React from 'react';
import '@/components/styles/index.less';
import Counter from '@/components/Counter';

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
        styleName="container"
        count={count}
        onIncrement={this.onIncrement}
        onDecrement={this.onDecrement}
      />
    );
  }
}

export default StateDemo;
