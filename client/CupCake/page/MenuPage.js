import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 
'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserProductPage from './UserProduct';
import UserCheckout from './UserCheckout';

const MenuPage = () =>{

    const Tab = createBottomTabNavigator()


    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen name="Products" component={UserProductPage}/>
            <Tab.Screen name="Checkout" component={UserCheckout}/>
        </Tab.Navigator>
    )
}

export default MenuPage