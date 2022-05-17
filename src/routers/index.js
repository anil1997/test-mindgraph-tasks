import React, { useMemo } from 'react';
import { HomeScreen, PokedexScreen } from '../screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const Context = React.createContext();

const AppContainer = () => {

  const apiContext = useMemo(() => {

  })

  return (
    <Context.Provider value={apiContext}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'PokedexScreen'} headerMode={'none'} >
          <Stack.Screen
            name={'HomeScreen'}
            component={HomeScreen}
          />
          <Stack.Screen
            name={'PokedexScreen'}
            component={PokedexScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
}

export default AppContainer;
