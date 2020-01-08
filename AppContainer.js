import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import combineAppReducers from './stores/combineAppReducers';
import App from './App';

const store = createStore(combineAppReducers());

export default class AppContainer extends Component {

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
