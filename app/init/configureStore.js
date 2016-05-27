import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';

import rootReducer from './reducers';
import * as memory from '../storage/memory';

const isProduction = process.env.MODE_ENV === 'production';
const reducer      = combineReducers(rootReducer);
const router       = routerMiddleware(hashHistory);

let enhancer;
if (isProduction) {
  enhancer = applyMiddleware(thunk, router, memory.remember);
} else {
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  });

  enhancer = applyMiddleware(thunk, router, logger, memory.remember);
}

export default function configureStore(initialState) {
  const recalledState = memory.recall(initialState);

  const store = createStore(rootReducer, recalledState, enhancer);

  if (!isProduction && module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers'))
    );
  }

  return store;
}
