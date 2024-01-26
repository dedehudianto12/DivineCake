import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TextInput, Button } from 'react-native';
import { fetchProductsAsync } from '../src/productSlice';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';

const AdminProductPage = () =>{
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const products = useSelector((state) => state.products.products);
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error)

    useEffect(() => {
      dispatch(fetchProductsAsync())
    }, []);

    if (loading) {
      return <Text>Loading products...</Text>;
    }
  
    if (error) {
      return <Text>Error: {error}</Text>;
    }

    return (
      <View>
        <Text className="text-center text-lg font-bold">
          Product
        </Text>
        <Button  title="Create Product" onPress={() => navigation.navigate("AddProduct")} />
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </View>
    );
}

export default AdminProductPage

