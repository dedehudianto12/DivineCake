import React from 'react';
'react-native';
import { View, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserProductPage from './UserProduct';
import UserCart from './UserCart';
import UserTransactionPage from './UserTransaction';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, AntDesign } from '@expo/vector-icons';

const MenuPage = () =>{

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
                component={UserProductPage}
                options={{
                    tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Cart" 
                component={UserCart}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cart" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Transaction" 
                component={UserTransactionPage}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="creditcard" size={24} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default MenuPage