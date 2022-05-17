import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import AppContainer from './src/routers';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { Colors } from "./src/theme";

const App = () => {

  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {

    NetInfo.addEventListener(status => {
      setIsConnected(status.isConnected);
    });
  })

  return (
    <Provider store={store}>
      {
        isConnected ?
          <AppContainer />
        :
          <View style={styles.offlineContainer}>
            <Text style={styles.offlineIcon}>🚣‍♂️</Text>
            <Text style={styles.offlineText} allowFontScaling={false}>No Internet Connection!</Text>
            <Text style={styles.offlineHint} allowFontScaling={false}>The app will automatically reload when you're connected again.</Text>
          </View>
      }
    </Provider>
  );

}

export default App;

const styles = StyleSheet.create({
  offlineContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    flexGrow: 1,
    backgroundColor: Colors.appColorDarkMain
  },
  offlineIcon: {
    fontSize: 80
  },  
  offlineText: {
    color: Colors.white,
    fontWeight: '400',
    textAlign: "center", 
    fontSize: 25,
  },
  offlineHint: {
    color: Colors.white,
    fontSize: 18,
    marginTop: 10,
    fontWeight: '200',
    textAlign: "center",
  },
});