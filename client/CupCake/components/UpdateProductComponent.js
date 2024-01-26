import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import { updateProductAsync } from "../src/productSlice";
import { useNavigation } from '@react-navigation/native';

const UpdateProductScreen = ({route}) => {
    const product = route.params.product;
    const navigation = useNavigation()
    const [
        productName,
        setProductName,
      ] = useState(product.name);
      const [
        productDescription,
        setProductDescription,
      ] = useState(product.description);
      const [productPrice, setProductPrice] = useState(String(product.price));
      const [productImage, setProductImage] = useState(product.image);
      const [productStock, setProductStock] = useState(String(product.stock));
      const [productCategory, setProductCategory] = useState(String(product.category_id));
    
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState(null);


    const dispatch = useDispatch();
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
        const formData = new FormData();
        formData.append('name', productName);
        formData.append('description', productDescription);
        formData.append('price', productPrice);
        formData.append('stock', productStock);
        formData.append('category_id', productCategory);
    
        if (productImage) {
            formData.append('image', {
                uri: productImage, 
                type: "image/png", 
                name: productName}); 
        }
        
        dispatch(updateProductAsync({productId: product.id, formData}))
            .then(async(result)=>{
                if (result.payload){
                    navigation.navigate("Admin")
                }
            })
            .catch((error)=>{
                console.log("error nich")
            })
      
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
          <TextInput
            className="border rounded p-2 w-5/6 mb-4"
            placeholder="Category"
            value={productCategory}
            onChangeText={(text) => setProductCategory(text)}
          />
          <Button title="Choose Image" onPress={openImagePicker} />
          {productImage && <Image source={{ uri: productImage }} style={{ width: 200, height: 200, marginTop: 10 }} />}
          <Button title="Update Product" onPress={() => onSubmit(productName, productDescription, productPrice, productImage)} />
        </View>
      </ScrollView>
    </SafeAreaView>
    )
}

export default UpdateProductScreen