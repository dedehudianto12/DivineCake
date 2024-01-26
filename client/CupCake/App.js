import React, {useState} from 'react';
import { Provider } from 'react-redux';
import { AuthProvider } from './context/AuthContext';
import AuthNavigator from './router/AuthNavigator';
import store from './src/store'; // Import your Redux store


export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AuthNavigator />
      </AuthProvider>
    </Provider>
  )
}

