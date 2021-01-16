/**
 * React Native App
 * https://github.com/HTaeha/beljaby
 */

import 'react-native-gesture-handler'
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './redux/store/store'
import Navigation from './src/navigation'

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        <Provider store={store}>
          <PersistGate
            loading={null}
            persistor={persistor}
          >
            <Navigation />
          </PersistGate>
        </Provider>
      </SafeAreaView>
    </>
  );
};


export default App;
