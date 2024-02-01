import React from "react";
import {View, Text, Button, Image} from "react-native"
import { useDispatch } from "react-redux";
import { deleteCartsAsync } from "../src/cartSlice";


const CartCard = ({cart}) => {
    const dispatch = useDispatch()
    const {id, Product, quantity} = cart

    return (
        <View className="p-4 bg-white rounded-md shadow-md mb-4">
            <Text className="font-bold text-lg mb-2 text-blue-600">Cart {id}</Text>
            <View className="flex flex-row bg-white rounded-md shadow-md p-4">
                <Image
                    source={{ uri: Product.image }} 
                    className="w-20 h-20 mr-4"
                />
                <View className="flex flex-col">
                    <View>
                        <Text className="font-bold text-lg mb-2">{Product.name}</Text>
                    </View>
                    <View className="flex flex-row">
                        <View className="basis-1/4">
                            <Text className="text-sm font-medium">{Product.description}</Text>
                            <Text className="text-sm font-medium font-italic mt-2">
                            Rp {Product.price}
                            </Text>
                        </View>
                        <View>
                            <Text className="text-sm font-medium">Quantity: {quantity}</Text>
                        </View>
                        <Button 
                            className="rounded-full"
                            title="Delete" 
                            onPress={()=>dispatch(deleteCartsAsync(id))}/>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CartCard