import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import rootReducer from './reducers';
const store = createStore(rootReducer);

import MainComponent from './components/main';

export default function App() {
  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
}
