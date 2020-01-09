import React, { Component } from 'react';

import { Scene, Router, Stack } from 'react-native-router-flux';
import CurrencyList from './components/CurrencyList';
import { dark_grey, black_grey } from './constants/colors';
import TradeDetail from './components/TradeDetail';

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
          <Scene key="tradeDetail" component={TradeDetail} hideNavBar />
        </Stack>
      </Router>
    );
  }
}

export default (App);