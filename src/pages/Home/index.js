import React, { Fragment } from 'react';
import Header from '@/components/Header/index.js';

export default class Home extends React.Component {
  state = {
    count: 0,
  };

  handleClick = () => {
    this.setState(state => {
      return {
        count: state.count + 1,
      };
    });
  };

  render() {
    const { count } = this.state;
    return (
      <Fragment>
        <Header />
        <button onClick={this.handleClick}>btn</button>
        <span>{count}</span>
      </Fragment>
    );
  }
}
