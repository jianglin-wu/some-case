import React from 'react';
import BasicLayout from '@/layouts/BasicLayout';

@BasicLayout({ title: 'About' })
class About extends React.Component {
  render() {
    return <p>about</p>;
  }
}

export default About;
