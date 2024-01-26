
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync, setError } from '../src/authSlice';
import { useAuth } from '../context/AuthContext';

const LoginComponent = () => {
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
                    signIn()
                }
            })
            .catch((error)=>{
                console.log(error.message)
            })
    }

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-x1 font-bold mb-4">Login</Text>
      <TextInput className="border rounded p-2 w-5/6 mb-4" placeholder='Email' value={email} onChangeText={(text)=> setEmail(text)} />
      <TextInput className="border rounded p-2 w-5/6 mb-4" placeholder='Password' value={password} onChangeText={(text)=> setPassword(text)} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      {error && <Text className="text-red-500 mt-2">{error}</Text>}
    </View>
  );
};

export default LoginComponent;
