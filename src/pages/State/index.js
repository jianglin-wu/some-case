import React, { Fragment } from 'react';
import stylesCommon from '@/components/styles';
import Header from '@/components/Header';

export default class Home extends React.Component {
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
      <Fragment>
        <Header title="State Demo" />
        <div className={stylesCommon.container}>
          <button onClick={this.onIncrement}> + </button>
          <span> {count} </span>
          <button onClick={this.onDecrement}> - </button>
        </div>
      </Fragment>
    );
  }
}
