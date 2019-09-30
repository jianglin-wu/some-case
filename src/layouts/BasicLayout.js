import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';

export default function BasicLayoutDecorator(options = {}) {
  const { title = 'Hello', HelmetComponent } = options;
  return function Decorator(Target) {
    const BasicLayout = () => {
      return (
        <Fragment>
          {HelmetComponent ? (
            <HelmetComponent />
          ) : (
            <Helmet>
              <title>{title}</title>
            </Helmet>
          )}
          <Header title={title} />
          <Target />
        </Fragment>
      );
    };
    if (Target.getInitialProps) {
      BasicLayout.getInitialProps = Target.getInitialProps;
    }
    return BasicLayout;
  };
}
