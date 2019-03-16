import {createStore, applyMiddleware} from 'redux';

import thunkMiddleware from 'redux-thunk';

import {routerMiddleware} from 'react-router-redux';

import {createLogger} from 'redux-logger';

import rootReducer from '_reducers';

import {history} from '_helpers';

const loggerMiddleware = createLogger();
const pushMiddleware = routerMiddleware(history);

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, pushMiddleware, loggerMiddleware));
