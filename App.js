import React from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, SafeAreaView } from 'react-native';

/*screens */
import Navigation from './containers/Navigation/Navigation'
/* redux */
import { Provider } from 'react-redux'
import store from './store'
/* colors */
import colors from './colors'
/* fonts */
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
/* fonts */
const fetchFonts = () => {
  return Font.loadAsync({
    'Cairo-Bold': require('./assets/fonts/Cairo-Bold.ttf'),
    'Cairo-Regular': require('./assets/fonts/Cairo-Regular.ttf'),
    'Cairo-Black': require('./assets/fonts/Cairo-Black.ttf'),
    'Cairo-ExtraLight': require('./assets/fonts/Cairo-ExtraLight.ttf'),
    'Cairo-Light': require('./assets/fonts/Cairo-Light.ttf'),
    'Cairo-SemiBold': require('./assets/fonts/Cairo-SemiBold.ttf'),

  });
};


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false
    };
  }
  componentDidMount() {
    // store.dispatch(getProducts())
  }
  render() {
    if (!this.state.dataLoaded) {
      return (

        <AppLoading
          startAsync={fetchFonts}
          onFinish={() => { this.setState({ dataLoaded: true }) }}
        />

      )
    }
    return (
      <View style={styles.container}>
        <StatusBar
          // hidden={true}
          backgroundColor={colors.primary}
          barStyle="dark-content"
          drawBehind={true}
          visible={false}

        />
        <Provider store={store}>
          <Navigation />
        </Provider>

      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height,
    backgroundColor: '#ccc',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
