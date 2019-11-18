import React from 'react';
// eslint-disable-next-line no-unused-vars
import { h } from 'preact';
import { Route, Switch, Redirect } from 'react-router-dom';

import { PovPage } from './pages';

export default () => (
  <Switch>
    <Route path="/fuckts/:pov" component={PovPage} />
    <Redirect from="/" to="/fuckts/new" />
    <Redirect from="*" to="/" />
  </Switch>
);
