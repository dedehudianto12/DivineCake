// AuthNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import LoginComponent from '../components/LoginComponents';
// import RegisterComponent from '../Components/RegisterComponent';
import MenuPage from "../page/MenuPage"
import AdminPage from '../page/AdminPage';
import AddProductScreen from '../components/AddProductComponent';
import UpdateProductScreen from "../components/UpdateProductComponent"
import RegisterComponent from '../components/RegisterCompenent';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  const {isAdmin, isSignIn} = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignIn ? (
          <>
            {isAdmin ? (
              <>
                <Stack.Screen name="Admin" component={AdminPage} options={{ headerShown: false }}/>
                <Stack.Screen name="AddProduct" component={AddProductScreen} />
                <Stack.Screen name="UpdateProduct" component={UpdateProductScreen}/>
              </>
            ) : (
              <>
                <Stack.Screen name="Menu" component={MenuPage} options={{ headerShown: false }} />
              </>
            )
          }
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginComponent} options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={RegisterComponent} options={{ headerShown: false }}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
