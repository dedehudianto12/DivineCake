import React, { useEffect, useState } from "react";
import { View, Text, Button, Image, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { deleteProductAsync } from "../src/productSlice";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createCartsAsync } from "../src/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const [isUser, setIsUser] = useState(false);

  useEffect(()=>{
    const checkUser = async () => {
      const curUser = await AsyncStorage.getItem("userType");
      setIsUser(curUser === "user");
    };

    checkUser();
  }, [])

  const handleUpdate = () => {
    navigation.navigate("UpdateProduct", { product });
  };

  const addCart = async () => {
    try{
      const createdCart = await dispatch(createCartsAsync({product_id:product.id, quantity: 1}))
      if (createdCart.payload){
        Alert.alert('Success', 'Product added to the cart successfully');
      }else{
        Alert.alert('Error', 'Failed to add product to the cart');
      }
    }
    catch(error){
      console.error('Error adding product to the cart:', error);
      // Display an alert for failure
      Alert.alert('Error', 'Failed to add product to the cart');
    }

  }

  const renderButtons = () => {
    if (isUser){
      return (
        <View className="flex-col">
          <Button
            title="Add to Cart"
            className="rounded-full"
            onPress={() => addCart()}
          />
        </View>
      )
    }else{
      return (
        <View className="flex-col">
          <Button
            title="Delete"
            onPress={() => dispatch(deleteProductAsync(product.id))}
          />
          <Button
            title="Update"
            onPress={() => handleUpdate()}
          />
        </View>
      )
    }
  }

  return (
    <View className="flex flex-row bg-white rounded-md shadow-md p-4">
      <Image
        source={{ uri: product.image }} 
        className="w-20 h-20 mr-4"
      />
      <View className="flex flex-col">
        <View>
          <Text className="font-bold text-lg mb-2">{product.name}</Text>
        </View>
        <View className="flex flex-row">
          <View className="basis-1/4">
            <Text className="text-sm font-medium">{product.description}</Text>
            <Text className="text-sm font-medium font-italic mt-2">
              Rp {product.price}
            </Text>
          </View>
          <View className="">
            <Text className="text-sm font-medium">Stock: {product.stock}</Text>
          </View>
          <View className="flex-col items-center justify-center">
            {renderButtons()}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
