import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {StyleProvider} from 'native-base';

import AppNavigator from './AppNavigator';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
import reducer from './reducers';

const store = createStore(reducer, applyMiddleware(thunk));

function setup(): React.Component {
  class Root extends Component {
    render() {
      return (
        <StyleProvider style={getTheme(platform)}>
          <Provider store={store}>
            <AppNavigator />
          </Provider>
        </StyleProvider>
      );
    }
  }

  return Root;
}

export default setup;
