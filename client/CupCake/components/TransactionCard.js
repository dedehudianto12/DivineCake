import React from 'react';
import { View, Text, Button } from 'react-native';
import moment from 'moment';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { updateTransactionAsync } from '../src/transactionSlice';
import { updateProductStocks } from '../src/productSlice';

const TransactionCard = ({ transaction, onUpdate }) => {
  const dispatch = useDispatch()
  const { id, orderDate, status, totalAmount, User, items } = transaction;
  const products = useSelector((state) => state.products.products);
  const formattedOrderDate = moment(orderDate).format('MMMM Do YYYY, h:mm:ss a');

  const handleApprove = async (status) => {
    try {
      const updatedTransaction = await dispatch(updateTransactionAsync({ id, status}));
      onUpdate(updatedTransaction.payload.updatedTransaction);
      
      if (status === 'processing') {
        const productUpdates = items.map((item) => {
          const currentStock = products.find((product) => product.id === item.Product.id)?.stock;
          const newStock = currentStock - item.quantity;

          return {
            productId: item.Product.id,
            newStock,
          };
        });

        dispatch(updateProductStocks(productUpdates));
      }
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const handleReject = () => {
    // Logic for rejecting the transaction
    // Dispatch an action or call an API to update the status to 'rejected'
    // Example: dispatch(rejectTransaction(transaction.id));
  };

  return (
    <View className="p-4 bg-white rounded-md shadow-md mb-4">
      <Text className="font-bold text-lg mb-2 text-blue-600">Transaction #{id}</Text>
      <Text>Status: <Text className={classNames({ 'text-green-600': status === 'completed', 'text-yellow-600': status === 'processing', 'text-red-600': status === 'pending' })}>{status}</Text></Text>
      <Text>Order Date: {formattedOrderDate}</Text>
      <Text>Total Amount: Rp {totalAmount.toFixed(2)}</Text>
      <Text>User: {User.nickname}</Text>

      <View className="mt-4">
        <Text className="font-bold text-lg mb-2">Items:</Text>
        {items.map((item, index) => (
          <View key={index} className="ml-4 border-b pb-2">
            <Text>Product: {item.Product.name}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Unit Price: Rp {item.unitPrice.toFixed(2)}</Text>
            <Text>Subtotal: Rp {item.subtotal.toFixed(2)}</Text>
          </View>
        ))}
      </View>
      <View className="flex flex-row justify-around mt-4">
          {transaction.status === "pending" && (
            <>
              <Button title="Approve" onPress={()=> handleApprove("processing")} />
              <Button title="Reject" onPress={()=>handleReject("canceled")} />
            </>
          )}
          {(transaction.status === "processing") && (
            <>
              <Button title="Complete" onPress={()=>handleApprove("completed")} />
              <Button title="Reject" onPress={()=>handleReject("canceled")} />
            </>
          )}
      </View>
    </View>
  );
};

export default TransactionCard;
