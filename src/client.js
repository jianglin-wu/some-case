import React from 'react';
import ReactDOM from 'react-dom';
import './app.css';
import Home from './pages/index.js';

ReactDOM.hydrate(<Home />, document.querySelector('#root'));
