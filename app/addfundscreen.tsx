import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AppDetails from './service/AppService';

const AddFundScreen = () => {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleProceedToPayment = async () => {
    const numericAmount = parseFloat(amount);
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    setError('');

    const userEmail = await AsyncStorage.getItem('user-email');
    router.push({
      pathname: '/paymentscreen',
      params: { amount, email: userEmail },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="default" />
      <View className="flex-row items-center p-6 pb-3 bg-gray-50">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={28} color="#1A1A1A" />
        </TouchableOpacity>
        <View>
          <Text className="text-2xl font-monasans-bold text-gray-900">Add Funds</Text>
        </View>
      </View>
      <View className="px-6 pb-4 bg-gray-50 border-b border-gray-200">
        <Text className="text-base font-monasans-light text-gray-500">Enter the amount you want to add</Text>
      </View>
      <View className="flex-1 p-6">
        <View className="flex-row items-center bg-white border border-gray-200 rounded-lg px-4">
          <Text className="text-2xl font-bold text-gray-800 mr-2">₦</Text>
          <TextInput
            className="flex-1 text-2xl py-4 text-gray-800 font-monasans-regular"
            placeholder="0.00"
            keyboardType="numeric"
            value={amount}
            onChangeText={text => {
              setAmount(text);
              if (error) setError('');
            }}
          />
        </View>
        {error ? <Text className="text-red-500 mt-2 ml-1">{error}</Text> : null}
        <TouchableOpacity
          style={{backgroundColor:AppDetails.color.iconColors}}
          className=" p-4 rounded-full items-center mt-8"
          onPress={handleProceedToPayment}
          activeOpacity={0.8}>
          <Text className='text-white text-lg font-monasans-bold'>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddFundScreen;