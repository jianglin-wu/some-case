import React from 'react';

export default class Counter extends React.PureComponent {
  render() {
    const { className = '', count, onIncrement, onDecrement } = this.props;
    return (
      <div className={className}>
        <p> {count} </p>
        <button type="button" onClick={onIncrement}>
          +
        </button>{' '}
        <button type="button" onClick={onDecrement}>
          -
        </button>
      </div>
    );
  }
}
