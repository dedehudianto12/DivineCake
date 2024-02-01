
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync, setError, registerUserAsync } from '../src/authSlice';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const RegisterComponent = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const error = useSelector((state) => state.auth.error)
  const { signIn } = useAuth();

  const [nickname, setNickname] = useState("")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")

  const handleRegister = () =>{
    if (!nickname || !fullName || !email || !password || !phoneNumber || !address){
        dispatch(setError("Please fill in all fields"))
        return
    }

    const body = {
        nickname,
        full_name: fullName,
        email,
        password,
        phone_number: phoneNumber,
        address
    }

    dispatch(registerUserAsync(body))
        .then(async (result) => {
            if (result.payload) {
                Alert.alert('Success', 'Success Login!');
                handleLogin()
            }
        })
        .catch((error)=>{
            console.log(error.message)
        })
  }

  const handleLogin = () => {
  
    navigation.navigate('Login');
  };

  return (
    <View className="flex-1 items-center justify-center">
      <View>
        <Image source={require("../assets/cae.jpg")} style={styles.logo}></Image>
      </View>
      <Text className="text-4xl font-bold mb-4">CupCake</Text>
      <TextInput className="border rounded p-2 w-5/6 mb-4" placeholder='Nickname' value={nickname} onChangeText={(text)=> setNickname(text)} />
      <TextInput className="border rounded p-2 w-5/6 mb-4" placeholder='Full name' value={fullName} onChangeText={(text)=> setFullName(text)} />
      <TextInput className="border rounded p-2 w-5/6 mb-4" placeholder='Email' value={email} onChangeText={(text)=> setEmail(text)} />
      <TextInput className="border rounded p-2 w-5/6 mb-4" placeholder='Password' value={password} onChangeText={(text)=> setPassword(text)} secureTextEntry />
      <TextInput keyboardType='numeric' className="border rounded p-2 w-5/6 mb-4" placeholder='Phone Number' value={phoneNumber} onChangeText={(text)=> setPhoneNumber(text.replace(/[^0-9]/g, ''))} />
      <TextInput className="border rounded p-2 w-5/6 mb-4" placeholder='Address' value={address} onChangeText={(text)=> setAddress(text)} />
      <Button title="Register" onPress={handleRegister} />
      <TouchableOpacity onPress={handleLogin}>
        <Text className="mt-4">Already have an account? Login here</Text>
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

export default RegisterComponent;
