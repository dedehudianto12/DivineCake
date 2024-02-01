
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync, setError } from '../src/authSlice';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const LoginComponent = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const error = useSelector((state) => state.auth.error)
  const { signIn } = useAuth();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () =>{
    if (!email || !password){
        dispatch(setError("Please fill in all fields"))
        return
    }
    dispatch(loginUserAsync({email, password}))
        .then(async (result) => {
            if (result.payload) {
              Alert.alert('Success', 'Success Login!');
              signIn()
            }
        })
        .catch((error)=>{
            console.log(error.message)
        })
  }

  const handleRegister = () => {
  
    navigation.navigate('Register');
  };

  return (
    <View className="flex-1 items-center justify-center">
      <View>
        <Image source={require("../assets/cae.jpg")} style={styles.logo}></Image>
      </View>
      <Text className="text-4xl font-bold mb-4">CupCake</Text>
      <TextInput className="border rounded p-2 w-5/6 mb-4" placeholder='Email' value={email} onChangeText={(text)=> setEmail(text)} />
      <TextInput className="border rounded p-2 w-5/6 mb-4" placeholder='Password' value={password} onChangeText={(text)=> setPassword(text)} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={handleRegister}>
        <Text className="mt-4">Don't have an account? Register here</Text>
      </TouchableOpacity>
      {error && <Text className="text-red-500 mt-2">{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default LoginComponent;
