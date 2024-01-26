import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdminProductPage from './AdminProducts';
import AdminTransactionPage from './AdminTransaction';
import AdminProfilePage from './AdminProfilePage';

const Tab = createBottomTabNavigator()

const AdminTab = () => (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Hide header for clean look
      }}
    >
      <Tab.Screen name="Products" component={AdminProductPage} />
      <Tab.Screen name="Transactions" component={AdminTransactionPage} />
      <Tab.Screen name="Profile" component={AdminProfilePage}/>
    </Tab.Navigator>
  );

export default AdminTab;