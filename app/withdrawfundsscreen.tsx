import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import WithdrawController from "./controller/withdrawcontroller";
import Loader from './loader';
import useSharedStore from "./repository/store";
import AppDetails from './service/AppService';
import formatAmount from './service/formatamount';

const WithDrawFundsScreen = ()=>{
  
  const router = useRouter();

  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountName, setAccountName] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  


  

    //Store Options...
    const budgetStore = useSharedStore((state) => state.budget);
    const totalBalanceStore = useSharedStore((state) => state.totalBalance);


    const handleWithdraw = async() => {

      // Basic validation
      if (!accountNumber || !bankName || !accountName || !amount){

        setError('All fields are required.');

        return;
      }


      const withdrawAmount = parseFloat(amount);


      if (isNaN(withdrawAmount) || withdrawAmount <= 0){

        setError('Please enter a valid amount.');
        return;
      }

     setError('');


      if (!budgetStore){


        Alert.alert("Withdraw Feedback", "You don't have a budget, Please create a budget first.")


      }else if (withdrawAmount > budgetStore.accessAmount){

        Alert.alert("Withdraw Feedback", "Your amount has exceed your budget.")

      }
      else if (withdrawAmount > totalBalanceStore){


        console.log("Your amount has exceed your total balance.");
      }
      else{
        setIsLoading(true);


        const userEmail = await AsyncStorage.getItem('user-email');

        const response = await WithdrawController(userEmail, accountNumber, accountName, bankName , withdrawAmount, false);

        if (response.status === 200){

            Alert.alert(
            'Withdraw Successful',
            `Your account has been debited with ${formatAmount(withdrawAmount)}.
            Please check you bank account after few minutes for confirmation.`,
            [{ text: 'OK', onPress: () => router.replace("/homescreen")}]
          );
        }
        else{
        
          Alert.alert("Withdraw Feedback", "Something went wrong please try again!")

        }

        setIsLoading(false);

      }
    

    };



  return (
    <SafeAreaView className="flex-1 bg-gray-50">

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
          className="border border-gray-300 p-4 color-[#333] rounded-lg w-full bg-white mb-4"
          placeholder="Enter your account number"
          keyboardType="number-pad"
          value={accountNumber}
          onChangeText={setAccountNumber}
          placeholderTextColor="lightgray"
        />

        <Text className="text-gray-600 mb-2 ml-1 font-medium">Bank Name</Text>
        <TextInput
          className="border border-gray-300 p-4 color-[#333] rounded-lg w-full bg-white mb-4"
          placeholder="Enter your bank name"
          value={bankName}
          onChangeText={setBankName}
          placeholderTextColor="lightgray"
        />

        <Text className="text-gray-600 mb-2 ml-1 font-medium">Account Name</Text>
        <TextInput
          className="border border-gray-300 p-4 color-[#333] rounded-lg w-full bg-white mb-4"
          placeholder="Enter your account name"
          value={accountName}
          onChangeText={setAccountName}
          placeholderTextColor="lightgray"
        />


        <Text className="text-gray-600 mb-2 ml-1 font-medium">Amount</Text>
        <TextInput
          className="border border-gray-300 p-4 rounded-lg w-full bg-white"
          placeholder="Enter amount to withdraw"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholderTextColor="lightgray"
        />

        {error ? <Text className="text-red-500 mt-2 ml-1">{error}</Text> : null}

        <TouchableOpacity
          style={{ backgroundColor: AppDetails.color.iconColors }}
          className="p-4 rounded-full items-center mt-8"
          onPress={handleWithdraw}
          activeOpacity={0.8}>
          <Text className='text-white text-lg font-monasans-bold'>Withdraw</Text>
        </TouchableOpacity>

        <Text className="text-red-600 text-xs text-center mt-4 px-4 font-monasans-regular">
          Please double-check your account details before proceeding. Funds transferred to a wrong account due to incorrect details may not be recoverable.
        </Text>
      </View>
      {isLoading && <Loader />}
    </SafeAreaView>
  );
}

export default WithDrawFundsScreen;