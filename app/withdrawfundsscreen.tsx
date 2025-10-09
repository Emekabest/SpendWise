import { Ionicons } from '@expo/vector-icons';
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


const WithDrawFundsScreen = ()=>{
  const router = useRouter();
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleWithdraw = () => {
    // Basic validation
    if (!accountNumber || !bankName || !amount) {
      setError('All fields are required.');
      return;
    }
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    setError('');
    // Proceed with withdrawal logic here
    console.log({ accountNumber, bankName, amount });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="default" />
      <View className="flex-row items-center p-6 pb-3 bg-gray-50">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={28} color="#1A1A1A" />
        </TouchableOpacity>
        <View>
          <Text className="text-2xl font-monasans-bold text-gray-900">Withdraw Funds</Text>
        </View>
      </View>
      <View className="px-6 pb-4 bg-gray-50 border-b border-gray-200">
        <Text className="text-base font-monasans-light text-gray-500">Enter your bank details and amount</Text>
      </View>
      <View className="flex-1 p-6">
        <Text className="text-gray-600 mb-2 ml-1 font-medium">Account Number</Text>
        <TextInput
          className="border border-gray-300 p-4 rounded-lg w-full bg-white mb-4"
          placeholder="Enter your account number"
          keyboardType="number-pad"
          value={accountNumber}
          onChangeText={setAccountNumber}
        />

        <Text className="text-gray-600 mb-2 ml-1 font-medium">Bank Name</Text>
        <TextInput
          className="border border-gray-300 p-4 rounded-lg w-full bg-white mb-4"
          placeholder="Enter your bank name"
          value={bankName}
          onChangeText={setBankName}
        />

        <Text className="text-gray-600 mb-2 ml-1 font-medium">Amount</Text>
        <TextInput
          className="border border-gray-300 p-4 rounded-lg w-full bg-white"
          placeholder="Enter amount to withdraw"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        {error ? <Text className="text-red-500 mt-2 ml-1">{error}</Text> : null}

        <TouchableOpacity
          style={{ backgroundColor: AppDetails.color.iconColors }}
          className="p-4 rounded-full items-center mt-8"
          onPress={handleWithdraw}
          activeOpacity={0.8}>
          <Text className='text-white text-lg font-monasans-bold'>Withdraw</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default WithDrawFundsScreen;