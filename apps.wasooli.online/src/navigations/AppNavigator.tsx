import { StyleSheet} from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DRAWER_NAVIGATOR, SCREEN_NAME } from '../enums/AppEnums';
import * as ui  from '../screens';
import { useAppSelector } from '../redux/hooks';
import DrawerNavigator from './DrawerNavigator';

const AppNavigator = () => {
  const Stack = createNativeStackNavigator();
  const user = useAppSelector((state: any) => state.appReducer.user);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {
          user ? (
            <Stack.Screen name={DRAWER_NAVIGATOR} component={DrawerNavigator} />
          ) : (
            <>
              <Stack.Screen name={SCREEN_NAME.SPLASH} component={ui.SplashScreen} />
              <Stack.Screen name={SCREEN_NAME.LOGIN} component={ui.LoginScreen} />
            </>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})