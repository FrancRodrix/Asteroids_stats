import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Asteroid from './Class/Src/Asteroids'
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Asteroid"
          component={Asteroid}
          options={{headerShown: false}}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
