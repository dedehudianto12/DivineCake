import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TextInput, Button } from 'react-native';
import { fetchProductsAsync } from '../src/productSlice';
import ProductCard from '../components/ProductCard';


const UserProductPage = () =>{
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

    return (
      <View>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </View>
    );
}

export default UserProductPage

