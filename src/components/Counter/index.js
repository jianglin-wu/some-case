import React from 'react';

export default class Counter extends React.PureComponent {
  render() {
    const {
      className = '',
      count,
      onIncrement,
      onDecrement,
      loadingIncrement,
      loadingDecrement,
    } = this.props;
    return (
      <div className={className}>
        <p> {count} </p>
        <button type="button" onClick={loadingIncrement ? null : onIncrement}>
          {loadingIncrement ? '加载中' : '+'}
        </button>{' '}
        <button type="button" onClick={loadingDecrement ? null : onDecrement}>
          {loadingDecrement ? '加载中' : '-'}
        </button>
      </div>
    );
  }
}
