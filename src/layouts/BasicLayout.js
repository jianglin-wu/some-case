import React, { Fragment } from 'react';
import Header from '@/components/Header';

export default function BasicLayoutDecorator(options = {}) {
  const { title = 'Hello' } = options;
  return function Decorator(Target) {
    const BasicLayout = () => {
      return (
        <Fragment>
          <Header title={title} />
          <Target />
        </Fragment>
      );
    };
    return BasicLayout;
  };
}
