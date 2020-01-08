import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';

import { Scene, Router, Stack } from 'react-native-router-flux';
import CurrencyList from './components/CurrencyList';
import { dark_grey, black_grey } from './constants/colors';
import CurrencyTrade from './components/CurrencyTrade';

class App extends Component {

  render() {
    return (
      <Router
        navigationBarStyle={{ backgroundColor: dark_grey }}
        titleStyle={{ color: black_grey }}
        backButtonTextStyle={{ color: black_grey }}
        backButtonTintColor={black_grey} >
        <Stack key="root">
          <Scene key="currencyList" component={CurrencyList} title="Crypto Trader" initial />
          <Scene key="currencyTrade" component={CurrencyTrade} hideNavBar />
        </Stack>
      </Router>
    );
  }
}


const mapStateToProps = (state) => {
  const { config } = state;
  return { config };
};

export default connect(mapStateToProps)(App);