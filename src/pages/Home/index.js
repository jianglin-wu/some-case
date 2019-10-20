import React from 'react';
import { Link } from 'react-router-dom';
import stylesCommon from '@/components/styles';

class Home extends React.Component {
  render() {
    return (
      <div className={stylesCommon.container}>
        hello world
      </div>
    );
  }
}

export default Home;
