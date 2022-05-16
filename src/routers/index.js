import React from 'react';
import { HomeScreen } from '../screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AppContainer = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'HomeScreen'} headerMode={'none'} >
        <Stack.Screen
          name={'HomeScreen'}
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;
