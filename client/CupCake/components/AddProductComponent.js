import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { createProductAsync } from '../src/productSlice';

const AddProductScreen = ({ navigation }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [productStock, setProductStock] = useState('')
  const dispatch = useDispatch()
  const formData = new FormData();

  const openImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProductImage(result.assets[0].uri);
    }
  };
  
  const onSubmit = async () => {
    formData.append('name', productName);
    formData.append('description', productDescription);
    formData.append('price', productPrice);
    formData.append('stock', productStock);

    if (productImage) {
        formData.append('image', {
            uri: productImage, 
            type: "image/png", 
            name: productName}); 
    }
    console.log(formData)
    try{
      const createdProduct = await dispatch(createProductAsync(formData))
      console.log(createdProduct)
      navigation.navigate("Admin")
    }catch(error){
      console.log("Error : ", error)
    }
  
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex-1 items-center justify-center">
          <TextInput
            className="border rounded p-2 w-5/6 mb-4"
            placeholder="Product Name"
            value={productName}
            onChangeText={(text) => setProductName(text)}
          />
          <TextInput
            className="border rounded p-2 w-5/6 mb-4"
            placeholder="Product Description"
            value={productDescription}
            onChangeText={(text) => setProductDescription(text)}
          />
          <TextInput
            className="border rounded p-2 w-5/6 mb-4"
            placeholder="Product Price"
            value={productPrice}
            onChangeText={(text) => setProductPrice(text)}
            keyboardType="decimal-pad"
          />
          <TextInput
            className="border rounded p-2 w-5/6 mb-4"
            placeholder="Stock"
            value={productStock}
            onChangeText={(text) => setProductStock(text)}
            keyboardType="decimal-pad"
          />
          <Button title="Choose Image" onPress={openImagePicker} />
          {productImage && <Image source={{ uri: productImage }} style={{ width: 200, height: 200, marginTop: 10 }} />}
          <Button title="Create Product" onPress={() => onSubmit(productName, productDescription, productPrice, productImage)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddProductScreen;
