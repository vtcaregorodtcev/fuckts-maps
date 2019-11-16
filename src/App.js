import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router-dom';

import './App.css';

import { history } from 'helpers';
import Routes from './routes';

class App extends Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      console.log(location);
    });
  }

  render() {
    return (<div className="app">
      <Router history={history}>
        <Routes></Routes>
      </Router>
    </div>);
  }
}

export default connect()(App);
