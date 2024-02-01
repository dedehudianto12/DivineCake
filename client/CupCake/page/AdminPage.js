import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdminProductPage from './AdminProducts';
import AdminTransactionPage from './AdminTransaction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import { View, Button } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';


const AdminTab = () => {
  const Tab = createBottomTabNavigator()

  const {signOut} = useAuth()

  const LogOut = () =>{
    AsyncStorage.multiRemove(["token", "userType"])
        .then(()=>{
            signOut()
        })
        .catch((err)=>console.log(err))
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true, 
        headerRight: () => (
          <View style={{ marginRight: 10 }}>
              <Button title="Logout" onPress={()=>LogOut()} />
          </View>
          ),
      }}
    >
      <Tab.Screen 
          name="Products" 
          component={AdminProductPage}
          options={{
              tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
              ),
          }}
      />
      <Tab.Screen 
          name="Transactions" 
          component={AdminTransactionPage}
          options={{
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="creditcard" size={24} color={color} />
              ),
          }}
      />
    </Tab.Navigator>
    );
  }
    

export default AdminTab;