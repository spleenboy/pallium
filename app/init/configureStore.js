import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import filter from 'redux-storage-decorator-filter';

import rootReducer from './reducers';

import createLogger from 'redux-logger';

const isProduction = process.env.MODE_ENV === 'production';

const reducer = storage.reducer(combineReducers(rootReducer));

const engine = filter(
  createEngine('pallium'),
  ['projectList']
);
const remember = storage.createMiddleware(engine);

const router = routerMiddleware(hashHistory);

let enhancer;
if (isProduction) {
  enhancer = applyMiddleware(thunk, router, remember);
} else {
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  });

  enhancer = applyMiddleware(thunk, router, logger, remember);
}

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  const restore = storage.createLoader(engine);
  restore(store);

  if (!isProduction && module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers'))
    );
  }

  return store;
}
