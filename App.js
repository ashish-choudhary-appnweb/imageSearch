import 'react-native-gesture-handler';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Provider as StoreProvider} from 'react-redux';
import {store} from './src/store/configureStore';

import AppNavigator from './src/routing/AppNavigator';

const App = () => {
  return (
    <StoreProvider store={store}>
      <View style={style.container}>
        <AppNavigator />
      </View>
    </StoreProvider>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;
