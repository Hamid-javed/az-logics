import { StyleSheet } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppNavigator from './src/navigations/AppNavigator'
import store from './src/redux/store/Store'
import { ToastProvider } from './src/components/reuseables/toast/ToastContext'

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ToastProvider>
        <AppNavigator />
        </ToastProvider>
      </SafeAreaProvider>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})