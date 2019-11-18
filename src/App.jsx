import React, { Component } from 'react';
import { Router } from 'react-router-dom';

import './App.css';

import { history } from './helpers';
import Routes from './routes';

class App extends Component {
  constructor(props) {
    super(props);

    history.listen(location => {
      // eslint-disable-next-line no-console
      console.log(location);
    });
  }

  render() {
    return (
      <div className="app">
        <Router history={history}>
          <Routes />
        </Router>
      </div>
    );
  }
}

export default App;
