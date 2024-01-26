// AuthContext.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState } from 'react';
import { useSelector } from 'react-redux';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false)


  const signIn = async () => {
    setIsSignIn(true);
    const userType = await AsyncStorage.getItem("userType")
    if (userType == "user"){
        setIsAdmin(false)
    }else{
        setIsAdmin(true)
    }
  };

  const signOut = () => {
    setIsSignIn(false);
    setIsAdmin(false)
  };

  return (
    <AuthContext.Provider value={{ isAdmin, isSignIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
