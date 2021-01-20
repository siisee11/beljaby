import React from 'react';
import { Provider } from 'react-native-paper';
import { theme } from './src/core/theme';
import App from './src/index';

import { applyMiddleware, createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구
import logger from 'redux-logger';
import rootReducer from './src/modules';

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(ReduxThunk, logger)
)); // 스토어를 만듭니다.


const Main = () => (
  <ReduxProvider store={store}>
    <Provider theme={theme}>
      <App />
    </Provider>
  </ReduxProvider>
);

export default Main;
