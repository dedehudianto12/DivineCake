// UserCheckout.js
import React, { useEffect } from "react";
import { View, Text, ScrollView, Button } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { fetchCartsAsync, createCheckoutAsync } from "../src/cartSlice";
import CartCard from "../components/CartCard";

const UserCheckout = () => {
    const dispatch = useDispatch();
    const carts = useSelector((state) => state.carts.carts);
    const loading = useSelector((state) => state.carts.loading);
    const error = useSelector((state) => state.carts.error);

    useEffect(() => {
        dispatch(fetchCartsAsync());
    }, []);

    const handleCheckout = async () => {
        try {
            const result = await dispatch(createCheckoutAsync());
            console.log('Checkout completed:', result);
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };


    if (loading) {
        return <Text>Loading carts...</Text>;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <ScrollView>
            <View>
                {carts.length === 0 ? (
                    <Text>You don't have anything in your cart</Text>
                ) : (
                    carts.map((cart) => (
                        <CartCard key={cart.id} cart={cart} />
                    ))
                )}
                {carts.length > 0 && (
                    <Button title="CheckOut" onPress={handleCheckout} />
                )}
            </View>
        </ScrollView>
    );
};

export default UserCheckout;
