import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { fetchTransactionAsync, updateTransactionSuccess } from '../src/transactionSlice';
import TransactionCard from '../components/TransactionCard';

const AdminTransactionPage = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.transactions);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    dispatch(fetchTransactionAsync());
  }, []);

  if (loading) {
    return <Text>Loading products...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleTransactionUpdate = (updatedTransaction) => {
    console.log("kiki", updatedTransaction)
    dispatch(updateTransactionSuccess(updatedTransaction));
  };

  let filteredTransactions = filter === 'all' ? transactions : transactions.filter((transaction) => transaction.status === filter);

  return (
    <ScrollView>
      <View>
        <Text className="text-center text-lg font-bold">Transaction Page</Text>
        <Picker selectedValue={filter} onValueChange={(itemValue) => handleFilterChange(itemValue)}>
          <Picker.Item label="All" value="all" />
          <Picker.Item label="Pending" value="pending" />
          <Picker.Item label="Processing" value="processing" />
          <Picker.Item label="Completed" value="completed" />
          <Picker.Item label="Canceled" value="canceled" />
        </Picker>
        {filteredTransactions.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} onUpdate={handleTransactionUpdate} />
        ))}
      </View>
    </ScrollView>
  );
};

export default AdminTransactionPage;
