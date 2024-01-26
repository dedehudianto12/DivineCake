import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminProfilePage = () =>{

    const userType = useSelector((state)=> state.auth.userType)
    const user = useSelector((state)=> state.auth.user)
    console.log(userType, user)

    const {signOut} = useAuth()

    const LogOut = () =>{
        AsyncStorage.multiRemove(["token", "userType"])
            .then(()=>{
                console.log("Success")
                signOut()
            })
            .catch((err)=>console.log(err))
    }

    return (
        <View>
            <Text>{userType}</Text>
            <Button title='Log Out' onPress={()=>LogOut()}/>
            <Text>Menu</Text>
        </View>
    )
}

export default AdminProfilePage