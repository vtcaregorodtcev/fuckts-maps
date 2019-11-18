import React from 'react';
// eslint-disable-next-line no-unused-vars
import { h } from 'preact';
import { Router } from 'react-router-dom';

import './App.css';

import { history } from './helpers';
import Routes from './routes';

const App = () => (
  <div className="app">
    <Router history={history}>
      <Routes />
    </Router>
  </div>
);

export default App;
